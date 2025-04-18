// /src/pages/SignupTrial.js
import React, { useEffect, useState, useRef } from "react";
import { navigate } from "gatsby";
import Navbar from "../components/Navbar";
import { Helmet } from "react-helmet";
import { db, setDoc, doc } from "../firebase";
import { getAuth, fetchSignInMethodsForEmail } from "firebase/auth";
import { useAuth } from "../context/AuthContext";

// Placeholder icons for Google and Facebook
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
        return; // Stop the process
      }

      // Email does NOT exist - Proceed to the next step
      console.log(`Email ${tEmail} is available. Proceeding to step 2.`);
      setCurrentStep(2); // Move to the next step
    } catch (error) {
      console.error("Error checking email existence:", error);
      alert("Could not verify email address. Please try again.");
    } finally {
      // Always reset the email checking state
      setIsCheckingEmail(false);
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

      return () => {
        window.removeEventListener("message", handleMessage);
        document.body.removeChild(script);
      };
    }, [onEventScheduled]);

    const prefillName = encodeURIComponent(`${firstName} ${lastName}`);
    const prefillEmail = encodeURIComponent(email);
    const calendlyUrl = `https://calendly.com/spanishfluencyschool/trial-class?hide_gdpr_banner=1&name=${prefillName}&email=${prefillEmail}`;

    return (
      <div
        className="calendly-inline-widget"
        data-url={calendlyUrl}
        style={{ minWidth: "320px", height: "700px" }}
      ></div>
    );
  };

  // PayPal integration
  useEffect(() => {
    if (currentStep !== 3 || isPayPalLoaded) return;

    const script = document.createElement("script");
    script.src =
      "https://www.paypal.com/sdk/js?client-id=ATImwCTPXzjxzlRWAo5keyG0D-6xE2WfOgQ6a8fSPXCng02Hq1ifA0o4fwV_o7ZO5NUtJrr5QrpuZ49p&currency=USD&intent=capture";
    script.async = true;
    script.onload = () => {
      setTimeout(() => {
        if (window.paypal && paypalRef.current) {
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

                  // --- MODIFICACIÓN AQUÍ ---
                  // Define los datos a guardar
                  const studentDataToSave = {
                    firstName,
                    lastName,
                    city,
                    email,
                    plan: selectedPlan,
                    orderID: data.orderID, // Considera renombrar a paypalOrderID para claridad
                    createdAt: new Date(), // Firestore convertirá esto a Timestamp
                    // Guarda URIs de Calendly como antes
                    calendlyEventUri: scheduledEvent?.event?.uri || null,
                    calendlyInviteeUri: scheduledEvent?.invitee?.uri || null,
                    // *** AÑADE LA HORA DE INICIO ***
                    calendlyStartTime: scheduledEvent?.event?.start_time || null, // Guarda la hora de inicio como string ISO
                    // *** AÑADE EL NOMBRE DEL EVENTO ***
                    calendlyEventName: scheduledEvent?.event?.name || null,
                  };
                  // --- FIN MODIFICACIÓN ---

                  // Save user details in Firestore
                  await setDoc(doc(db, "students", user.uid), studentDataToSave);

                  // Navigate to the final landing page
                  navigate(`/finalLanding?studentId=${user.uid}`);
                } catch (err) {
                  console.error("Error during final signup/DB write:", err);

                  // Handle specific Firebase Auth error
                  if (err.code === 'auth/email-already-in-use') {
                    alert("This email address is already registered. Please try logging in or use a different email.");
                  } else {
                    alert("An error occurred during the final step. Please contact support if payment was processed.");
                  }

                  // Reset processing state on error
                  setIsProcessing(false);
                }
              },
              onError: (err) => {
                console.error("PayPal Payment error:", err);
                alert("Payment error occurred. Please try again.");
                setIsProcessing(false); // Reset processing state on payment error too
              },
            })
            .render(paypalRef.current);
          setIsPayPalLoaded(true);
        }
      }, 100);
    };
    document.body.appendChild(script);
    return () => document.body.removeChild(script);
  }, [
    currentStep,
    isPayPalLoaded,
    signup,
    email,
    password,
    firstName,
    lastName,
    city,
    isProcessing,
    scheduledEvent,
  ]);

  return (
    <>
      <Helmet>
        <link rel="icon" href="/images/Logo-libro.png" type="image/png" />
        <title>Spanish Fluency School</title>
      </Helmet>
      <Navbar />
      <div className="min-h-screen bg-gray-50 p-6">
        <h1 className="text-4xl font-bold text-primary text-center mb-4 flex items-center justify-center">
          <img
            src="/images/Logo-libro.png"
            alt="Logo de la Escuela"
            className="w-12 h-12 mr-4" // Ajusta el tamaño y el espaciado del logo
          />
          Welcome to <b className="ml-2">Spanish Fluency School</b>
        </h1>
        <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow">
          {/* Progress Bar */}
          <div className="flex items-center mb-6">
            <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full ${
                  currentStep === 1
                    ? "bg-primary w-1/3"
                    : currentStep === 2
                    ? "bg-primary w-2/3"
                    : "bg-primary w-full"
                }`}
              ></div>
            </div>
            <p className="ml-4 text-sm font-medium text-gray-600">
              Step {currentStep} of 3
            </p>
          </div>

          {/* Step 1: Registration */}
          {currentStep === 1 && (
            <form className="space-y-6 max-w-md mx-auto" onSubmit={(e) => e.preventDefault()}>
              <h2 className="text-3xl font-bold text-center">
                Sign Up and Book Your $5 Trial Session
              </h2>

              {/* First Name */}
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

              {/* Last Name */}
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

              {/* City */}
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

              {/* Email */}
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

              {/* Password */}
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
                <button
                  type="button"
                  onClick={() => setShowPwd(!showPwd)}
                  className="absolute right-3 top-9 text-gray-500 focus:outline-none"
                  aria-label="Toggle password visibility"
                >
                  {showPwd ? "Hide" : "Show"}
                </button>
                {/* Strength bar */}
                <div className="mt-2 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${
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
                  8+ characters, mix of letters and numbers
                </p>
              </div>

              {/* Confirm Password */}
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium mb-1">
                  Confirm Password
                </label>
                <input
                  id="confirmPassword"
                  type={showPwd ? "text" : "password"}
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
                className={`w-full py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary-dark transition ${
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
              <h2 className="text-2xl font-semibold mb-4 text-center">Choose Your Class Schedule</h2>
              <p className="text-center text-gray-600 mb-4">
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
            <div className="space-y-4 max-w-md mx-auto">
              <h2 className="text-2xl font-semibold mb-4 text-center">Confirm & Pay</h2>
              <p className="text-lg font-semibold text-center">The trial class costs $5</p>
              <div className="p-4 bg-gray-100 rounded">
                <h3 className="text-xl font-semibold">Registration Details</h3>
                <p>Name: {firstName} {lastName}</p>
                <p>City: {city}</p>
                <p>Email: {email}</p>
                {scheduledEvent?.event?.start_time && (
                  <p>
                    Scheduled Time:{" "}
                    {new Date(scheduledEvent.event.start_time).toLocaleString(undefined, {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      hour: "numeric",
                      minute: "numeric",
                      timeZoneName: "short",
                    })}
                  </p>
                )}
              </div>
              <div className="mt-6 text-center">
                <div id="paypal-button-container" ref={paypalRef}></div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default SignupTrial;
