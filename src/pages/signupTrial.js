// /src/pages/SignupTrial.js
import React, { useEffect, useState, useRef } from "react";
import { navigate } from "gatsby";
import Navbar from "../components/Navbar";
import { Helmet } from "react-helmet";
import { db, setDoc, doc } from "../firebase";
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

  const paypalRef = useRef(null);
  const [isPayPalLoaded, setIsPayPalLoaded] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const { signup } = useAuth();
  const selectedPlan = "Trial";

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
  const handleRegistrationNext = () => {
    const tFirst = firstName.trim();
    const tLast = lastName.trim();
    const tCity = city.trim();
    const tEmail = email.trim();
    const tPwd = password.trim();
    const tConfirm = confirmPassword.trim();

    if (!tFirst || !tLast || !tCity || !tEmail || !tPwd || !tConfirm) {
      alert("Please fill in all fields.");
      return;
    }
    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(tEmail)) {
      alert("Please enter a valid email address.");
      return;
    }
    if (tPwd !== tConfirm) {
      alert("Passwords do not match.");
      return;
    }

    setCurrentStep(2);
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
    const calendlyUrl = `https://calendly.com/prof-victorbriceno/espanol-con-vic?name=${prefillName}&email=${prefillEmail}`;

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
                  await actions.order.capture();
                  const user = await signup(email, password, firstName, lastName);
                  await setDoc(doc(db, "students", user.uid), {
                    firstName,
                    lastName,
                    city,
                    email,
                    plan: selectedPlan,
                    orderID: data.orderID,
                    createdAt: new Date(),
                  });
                  navigate(`/finalLanding?studentId=${user.uid}`);
                } catch (err) {
                  console.error("Error creating student:", err);
                  alert("An error occurred. Please try again.");
                  setIsProcessing(false);
                }
              },
              onError: (err) => {
                console.error("Payment error:", err);
                alert("Payment error. Please try again.");
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
  ]);

  return (
    <>
      <Helmet>
        <link rel="icon" href="/images/favicon.png" type="image/png" />
        <title>Spanish Fluency School</title>
      </Helmet>
      <Navbar />
      <div className="min-h-screen bg-gray-50 p-6">
        <h1 className="text-4xl font-bold text-primary text-center mb-4">
          Welcome to <b>Español con Vic</b>
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
            <form className="space-y-6 max-w-md mx-auto">
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
                className="w-full py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary-dark transition"
              >
                Next: Schedule Your Class
              </button>
            </form>
          )}

          {/* Step 2: Calendly Scheduling */}
          {currentStep === 2 && (
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold mb-4">Choose Your Class Schedule</h2>
              <CalendlyWidget
                firstName={firstName}
                lastName={lastName}
                email={email}
                onEventScheduled={(eventData) => setScheduledEvent(eventData)}
              />
              {scheduledEvent && (
                <div className="mt-4 p-4 bg-green-100 border border-green-400 rounded text-center">
                  <p className="text-lg font-semibold text-green-700">
                    🎉 Class scheduled successfully!
                  </p>
                </div>
              )}
              <div className="mt-6 text-center">
                <button
                  type="button"
                  disabled={!scheduledEvent}
                  onClick={() => setCurrentStep(3)}
                  className={`px-6 py-3 rounded-lg font-semibold transition ${
                    scheduledEvent
                      ? "bg-primary text-white hover:bg-primary-dark"
                      : "bg-gray-300 text-gray-700 cursor-not-allowed"
                  }`}
                >
                  Next: Confirm & Pay
                </button>
              </div>
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
