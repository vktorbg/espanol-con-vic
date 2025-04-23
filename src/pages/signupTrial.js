// /src/pages/SignupTrial.js
import React, { useEffect, useState, useRef } from "react";
import { navigate } from "gatsby";
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


  return (
    <>
      <Helmet>
        <link rel="icon" href="/images/Logo-libro.png" type="image/png" />
        <title>Spanish Fluency School</title>
      </Helmet>
      <Navbar />
      {/* Adjusted padding: p-4 on smallest screens, p-6 from sm breakpoint up */}
      <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
        <h1 className="text-3xl md:text-4xl font-bold text-primary text-center mb-4 flex items-center justify-center"> {/* Smaller text on mobile */}
          <img
            src="/images/Logo-libro.png"
            alt="Logo de la Escuela"
            className="w-10 h-10 md:w-12 md:h-12 mr-3 md:mr-4" // Slightly smaller logo on mobile
          />
          Welcome to <b className="ml-1 md:ml-2">Spanish Fluency School</b> {/* Adjusted margin */}
        </h1>
        {/* Adjusted padding: p-4 on smallest screens, p-6 from sm breakpoint up */}
        <div className="max-w-4xl mx-auto bg-white p-4 sm:p-6 rounded-lg shadow">
          {/* Progress Bar */}
          {/* Increased bottom margin for better spacing on all screens */}
          <div className="flex items-center mb-8">
            <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-500 ease-out ${ // Added transition
                  currentStep === 1
                    ? "bg-primary w-1/3"
                    : currentStep === 2
                    ? "bg-primary w-2/3"
                    : "bg-primary w-full"
                }`}
              ></div>
            </div>
            <p className="ml-3 sm:ml-4 text-sm font-medium text-gray-600 flex-shrink-0"> {/* Adjusted margin, added flex-shrink-0 */}
              Step {currentStep} of 3
            </p>
          </div>

          {/* Step 1: Registration */}
          {currentStep === 1 && (
            // Reduced vertical spacing slightly on small screens (space-y-4), default (space-y-6) from sm up
            <form className="space-y-4 sm:space-y-6 max-w-md mx-auto" onSubmit={(e) => e.preventDefault()}>
              {/* Smaller text on mobile */}
              <h2 className="text-2xl md:text-3xl font-bold text-center">
                Sign Up and Book Your $5 Trial Session
              </h2>

              {/* Fields remain largely the same, w-full is good */}
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium mb-1">
                  First Name
                </label>
                <input
                  id="firstName"
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Your first name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>

              <div>
                <label htmlFor="lastName" className="block text-sm font-medium mb-1">
                  Last Name
                </label>
                <input
                  id="lastName"
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Your last name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>

              <div>
                <label htmlFor="city" className="block text-sm font-medium mb-1">
                  City
                </label>
                <input
                  id="city"
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Your city"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-1">
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              {/* Password - Adjusted top position for toggle button */}
              <div className="relative">
                <label htmlFor="password" className="block text-sm font-medium mb-1">
                  Password
                </label>
                <input
                  id="password"
                  type={showPwd ? "text" : "password"}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Create a password"
                  value={password}
                  onChange={handlePasswordChange}
                />
                {/* Adjusted top position slightly */}
                <button
                  type="button"
                  onClick={() => setShowPwd(!showPwd)}
                  className="absolute right-3 top-8 text-gray-500 focus:outline-none" // Adjusted top from 9 to 8
                  aria-label="Toggle password visibility"
                >
                  {showPwd ? "Hide" : "Show"}
                </button>
                {/* Strength bar */}
                <div className="mt-2 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-300 ${ // Added transition
                      pwdStrength === 1
                        ? "bg-red-400"
                        : pwdStrength === 2
                        ? "bg-yellow-400"
                        : pwdStrength === 3
                        ? "bg-green-400"
                        : "bg-transparent"
                    }`}
                    style={{ width: `${(pwdStrength / 3) * 100}%` }}
                  ></div>
                </div>
                <p className="mt-1 text-xs text-gray-500">
                  8+ chars, uppercase letter, number recommended
                </p>
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium mb-1">
                  Confirm Password
                </label>
                <input
                  id="confirmPassword"
                  type={showPwd ? "text" : "password"} // Reuse showPwd state
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Re‑enter your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>

              {/* Next Button */}
              <button
                type="button"
                onClick={handleRegistrationNext}
                disabled={isCheckingEmail}
                className={`w-full py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary-dark transition duration-200 ${ // Added duration
                  isCheckingEmail ? "opacity-50 cursor-wait" : ""
                }`}
              >
                {isCheckingEmail ? "Checking Email..." : "Next: Schedule Your Class"}
              </button>
            </form>
          )}

          {/* Step 2: Calendly Scheduling */}
          {currentStep === 2 && (
            <div className="space-y-4">
               {/* Smaller text on mobile */}
              <h2 className="text-xl md:text-2xl font-semibold mb-4 text-center">Choose Your Class Schedule</h2>
              {/* Adjusted text size slightly for better readability */}
              <p className="text-center text-gray-600 mb-4 text-sm sm:text-base">
                Please select a time slot for your $5 trial session. Once scheduled, you'll proceed to payment.
              </p>
              <CalendlyWidget
                firstName={firstName}
                lastName={lastName}
                email={email}
                onEventScheduled={(eventPayload) => {
                  console.log("Calendly Event Scheduled:", eventPayload); // Log the event data
                  setScheduledEvent(eventPayload); // Store event details
                  setCurrentStep(3); // Automatically advance to Step 3
                }}
              />
            </div>
          )}

          {/* Step 3: Confirm and Pay */}
          {currentStep === 3 && (
            // Reduced vertical spacing slightly on small screens
            <div className="space-y-3 sm:space-y-4 max-w-md mx-auto">
              {/* Smaller text on mobile */}
              <h2 className="text-xl md:text-2xl font-semibold mb-4 text-center">Confirm & Pay</h2>
               {/* Adjusted text size */}
              <p className="text-base md:text-lg font-semibold text-center">The trial class costs $5</p>
              {/* Adjusted padding inside details box */}
              <div className="p-3 sm:p-4 bg-gray-100 rounded">
                 {/* Adjusted text size */}
                <h3 className="text-lg md:text-xl font-semibold mb-2">Registration Details</h3>
                {/* Use smaller base text size for details */}
                <div className="space-y-1 text-sm sm:text-base">
                    <p><span className="font-medium">Name:</span> {firstName} {lastName}</p>
                    <p><span className="font-medium">City:</span> {city}</p>
                    <p><span className="font-medium">Email:</span> {email}</p>
                    {scheduledEvent?.event?.start_time && (
                    <p>
                        <span className="font-medium">Scheduled:</span>{" "}
                        {new Date(scheduledEvent.event.start_time).toLocaleString(undefined, {
                        weekday: "short", // Use short weekday for space
                        year: "numeric",
                        month: "short", // Use short month for space
                        day: "numeric",
                        hour: "numeric",
                        minute: "numeric",
                        // timeZoneName: "short", // Consider removing timezone name if too long
                        })}
                    </p>
                    )}
                </div>
              </div>
              {/* Added margin top */}
              <div className="mt-6 text-center">
                 {/* Ensure the ref is attached */}
                <div id="paypal-button-container" ref={paypalRef}>
                    {/* Loading/Error state for PayPal buttons could be added here */}
                    {!isPayPalLoaded && <p className="text-sm text-gray-500">Loading payment options...</p>}
                </div>
                {isProcessing && ( // Show processing indicator
                    <p className="mt-4 text-sm text-primary flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Processing Payment & Creating Account...
                    </p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default SignupTrial;