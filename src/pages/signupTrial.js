// /src/pages/SignupTrial.js
import React, { useEffect, useState, useRef } from "react";
import { navigate, graphql } from "gatsby"; // Import GraphQL
import Navbar from "../components/Navbar";
import { Helmet } from "react-helmet";
import { db, setDoc, doc } from "../firebase";
import { getAuth, fetchSignInMethodsForEmail } from "firebase/auth";
import { useAuth } from "../context/AuthContext";

// Placeholder icons (assuming they are fine)
const GoogleIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className="h-6 w-6">
    {/* ... paths omitted for brevity ... */}
  </svg>
);
const FacebookIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className="h-6 w-6">
    {/* ... paths omitted for brevity ... */}
  </svg>
);

const SignupTrial = () => {
  const [currentStep, setCurrentStep] = useState(1);

  // Registration state
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [city, setCity] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const [pwdStrength, setPwdStrength] = useState(0);

  const [scheduledEvent, setScheduledEvent] = useState(null);
  const [isCheckingEmail, setIsCheckingEmail] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isPayPalLoaded, setIsPayPalLoaded] = useState(false);

  const paypalRef = useRef(null);
  const { signup } = useAuth();
  const selectedPlan = "Trial";

  const auth = getAuth(); // Get the auth instance

  // Calculate password strength
  const handlePasswordChange = (e) => {
    const val = e.target.value;
    let strength = 0;
    if (val.length >= 8) strength += 1;
    if (/[A-Z]/.test(val)) strength += 1;
    if (/[0-9]/.test(val)) strength += 1;
    setPwdStrength(strength);
    setPassword(val);
  };

  // Step 1: Validate registration and move to scheduling step
  const handleRegistrationNext = async () => {
    const tFirst = firstName.trim();
    const tLast = lastName.trim();
    const tCity = city.trim();
    const tEmail = email.trim();
    const tPwd = password.trim();
    const tConfirm = confirmPassword.trim();

    // --- Basic Validations ---
    if (!tFirst || !tLast || !tCity || !tEmail || !tPwd || !tConfirm) {
      alert("Please fill in all fields.");
      return;
    }

    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(tEmail)) {
      alert("Please enter a valid email address.");
      return;
    }

    if (pwdStrength < 3) {
      alert("Please create a stronger password (8+ chars, uppercase, number).");
      return;
    }

    if (tPwd !== tConfirm) {
      alert("Passwords do not match.");
      return;
    }
    // --- End Basic Validations ---

    // --- Check if email already exists ---
    setIsCheckingEmail(true); // Indicate checking has started
    try {
      console.log(`Checking email: ${tEmail}`); // Debugging log
      const methods = await fetchSignInMethodsForEmail(auth, tEmail);
      console.log(`Methods found for ${tEmail}:`, methods); // Debugging log

      if (methods.length > 0) {
        // Email already exists
        alert(`The email address ${tEmail} is already in use. Please use a different email or log in.`);
        setIsCheckingEmail(false); // Reset state before returning
        return; // Stop the process
      }

      // Email does NOT exist - Proceed to the next step
      console.log(`Email ${tEmail} is available. Proceeding to step 2.`);
      setCurrentStep(2); // Move to the next step
    } catch (error) {
      console.error("Error checking email existence:", error);
      alert("Could not verify email address. Please try again.");
    } finally {
      // Always reset the email checking state IF NOT already reset in the error case above
       if (isCheckingEmail) { // Check if it hasn't been set to false already
           setIsCheckingEmail(false);
       }
    }
    // --- End Email Check ---
  };

  // Calendly widget
  const CalendlyWidget = ({ firstName, lastName, email, onEventScheduled }) => {
    useEffect(() => {
      const script = document.createElement("script");
      script.src = "https://assets.calendly.com/assets/external/widget.js";
      script.async = true;
      document.body.appendChild(script);

      const handleMessage = (e) => {
        if (e.data && e.data.event === "calendly.event_scheduled") {
          onEventScheduled(e.data.payload);
        }
      };
      window.addEventListener("message", handleMessage);

      // Cleanup function
      return () => {
          // Check if the script is still in the body before attempting removal
          const existingScript = document.querySelector(`script[src="${script.src}"]`);
          if (existingScript && document.body.contains(existingScript)) {
              document.body.removeChild(existingScript);
          }
          window.removeEventListener("message", handleMessage);
      };
    }, [onEventScheduled]); // Dependency array remains the same

    const prefillName = encodeURIComponent(`${firstName} ${lastName}`);
    const prefillEmail = encodeURIComponent(email);
    const calendlyUrl = `https://calendly.com/spanishfluencyschool/trial-class?hide_gdpr_banner=1&name=${prefillName}&email=${prefillEmail}`;

    return (
      <div
        className="calendly-inline-widget w-full" // Use w-full for better container fitting
        data-url={calendlyUrl}
        style={{ minWidth: "300px", height: "700px" }} // Slightly reduced minWidth, ensure it fits padding
      ></div>
    );
  };


  // PayPal integration
  useEffect(() => {
    // Check if already loaded or not the right step OR if paypalRef.current is null/undefined
    if (currentStep !== 3 || isPayPalLoaded || !paypalRef.current) return;

    // Prevent adding multiple scripts if effect re-runs unexpectedly
    if (document.querySelector('script[src*="paypal.com/sdk/js"]')) {
        console.log("PayPal SDK script already exists.");
        // Potentially re-render buttons if needed, but avoid adding the script again
        // This might require more complex logic if the button container was removed/re-added
        return;
    }


    const script = document.createElement("script");
    script.src =
      "https://www.paypal.com/sdk/js?client-id=ATImwCTPXzjxzlRWAo5keyG0D-6xE2WfOgQ6a8fSPXCng02Hq1ifA0o4fwV_o7ZO5NUtJrr5QrpuZ49p¤cy=USD&intent=capture";
    script.async = true;
    script.onload = () => {
      // Added a check for window.paypal and the ref again inside onload
      if (window.paypal && paypalRef.current) {
        // Clear previous buttons if any existed (important if the component re-renders)
        paypalRef.current.innerHTML = '';

        window.paypal
          .Buttons({
            createOrder: (data, actions) =>
              actions.order.create({
                purchase_units: [{ amount: { value: "5.00" } }],
              }),
            onApprove: async (data, actions) => {
              if (isProcessing) return;
              setIsProcessing(true);
              try {
                // Capture the PayPal order
                await actions.order.capture();

                // Create the user in Firebase Auth
                const user = await signup(email, password, firstName, lastName);

                const studentDataToSave = {
                  firstName,
                  lastName,
                  city,
                  email,
                  plan: selectedPlan,
                  orderID: data.orderID,
                  createdAt: new Date(),
                  calendlyEventUri: scheduledEvent?.event?.uri || null,
                  calendlyInviteeUri: scheduledEvent?.invitee?.uri || null,
                  calendlyStartTime: scheduledEvent?.event?.start_time || null,
                  calendlyEventName: scheduledEvent?.event?.name || null,
                };

                // Save user details in Firestore
                await setDoc(doc(db, "students", user.uid), studentDataToSave);

                // Navigate to the final landing page
                navigate(`/finalLanding?studentId=${user.uid}`);
              } catch (err) {
                console.error("Error during final signup/DB write:", err);
                if (err.code === 'auth/email-already-in-use') {
                  alert("This email address is already registered. Please try logging in or use a different email.");
                } else {
                  alert("An error occurred during the final step. Please contact support if payment was processed.");
                }
                setIsProcessing(false); // Reset processing state on error
              }
              // No finally block needed here for setIsProcessing(false) as it's handled in catch/onError
            },
            onError: (err) => {
              console.error("PayPal Payment error:", err);
              alert("Payment error occurred. Please try again.");
              setIsProcessing(false); // Reset processing state on payment error too
            },
          })
          .render(paypalRef.current)
          .catch(err => {
              // Catch potential errors during render
              console.error("Error rendering PayPal buttons:", err);
              // Maybe show a message to the user that payment options couldn't load
          });
        setIsPayPalLoaded(true); // Set loaded state *after* attempting render
      } else {
        console.error("PayPal SDK loaded but window.paypal or paypalRef not available.");
        // Handle case where SDK loads but something is wrong
      }
    };
    script.onerror = () => {
        // Handle script loading errors
        console.error("Failed to load PayPal SDK script.");
        alert("Could not load payment options. Please check your connection and try again.");
        // Optionally, set an error state here to display a message in the UI
    };

    document.body.appendChild(script);

    // Cleanup function
    return () => {
        // Attempt to remove the script when the component unmounts or dependencies change
        const existingScript = document.querySelector(`script[src="${script.src}"]`);
        if (existingScript && document.body.contains(existingScript)) {
            document.body.removeChild(existingScript);
        }
        // It might also be good practice to reset the PayPal loaded state if the step changes
        // This depends on whether you want the SDK to reload if the user goes back and forth
        // setIsPayPalLoaded(false); // Consider if needed based on flow
    };
  }, [ // Ensure all dependencies that *could* affect the PayPal setup are listed
    currentStep,
    isPayPalLoaded,
    signup, // Assuming signup doesn't change often, but include if necessary
    email,
    password,
    firstName,
    lastName,
    city, // Added city as it's part of data saved
    isProcessing, // Include isProcessing to prevent issues if it changes rapidly? Maybe not needed.
    scheduledEvent, // Include scheduledEvent as it's part of data saved
    selectedPlan, // Include selectedPlan
    // Don't include paypalRef directly as it's a ref object
  ]);

  useEffect(() => {
    navigate("/signup");
  }, []);

  return null;
};

export default SignupTrial;

export const query = graphql`
  query($language: String!) {
    locales: allLocale(filter: { language: { eq: $language }, ns: { eq: "translation" } }) {
      edges {
        node {
          ns
          data
          language
        }
      }
    }
  }
`;