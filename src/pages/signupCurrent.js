// /src/pages/signup.js
import React, { useState } from "react";
import { navigate, graphql } from "gatsby";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer"; // Added Footer for consistency
import { db, setDoc, doc } from "../firebase";
import { useAuth } from "../context/AuthContext";

const SignupPage = () => {
  // Registration state
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [city, setCity] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const [pwdStrength, setPwdStrength] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const { signup } = useAuth();

  // Calculate password strength (same as before)
  const handlePasswordChange = (e) => {
    const val = e.target.value;
    let strength = 0;
    if (val.length >= 8) strength += 1;
    if (/[A-Z]/.test(val)) strength += 1;
    if (/[0-9]/.test(val)) strength += 1;
    setPwdStrength(strength);
    setPassword(val);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors
    setIsLoading(true);

    // --- Validation ---
    const tFirst = firstName.trim();
    const tLast = lastName.trim();
    const tCity = city.trim();
    const tEmail = email.trim();
    const tPwd = password.trim();
    const tConfirm = confirmPassword.trim();

    if (!tFirst || !tLast || !tCity || !tEmail || !tPwd || !tConfirm) {
      setError("Please fill in all fields.");
      setIsLoading(false);
      return;
    }
    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(tEmail)) {
      setError("Please enter a valid email address.");
      setIsLoading(false);
      return;
    }
    if (tPwd.length < 8) {
      setError("Password must be at least 8 characters long.");
      setIsLoading(false);
      return;
    }
    if (tPwd !== tConfirm) {
      setError("Passwords do not match.");
      setIsLoading(false);
      return;
    }
    // --- End Validation ---

    try {
      // Attempt to sign up the user via Firebase Auth
      const user = await signup(tEmail, tPwd, tFirst, tLast); // Assuming signup might take name

      // Save student details to Firestore
      await setDoc(doc(db, "students", user.uid), {
        firstName: tFirst,
        lastName: tLast,
        city: tCity,
        email: tEmail,
        plan: "Registered", // Placeholder plan status for direct signups
        createdAt: new Date(),
        // Add any other default fields needed for a student record
      });

      // Enviar email de bienvenida (Netlify Function)
      await fetch('/.netlify/functions/sendWelcomeEmailCurrent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: tEmail,
          firstName: tFirst
        })
      });

      // Redirect to dashboard on success
      navigate(`/dashboard`);

    } catch (err) {
      console.error("Signup Error:", err);
      // Provide more specific error messages if possible
      if (err.code === 'auth/email-already-in-use') {
        setError("This email address is already registered. Please log in or use a different email.");
      } else {
        setError("Failed to create account. Please try again.");
      }
      setIsLoading(false); // Ensure loading stops on error
    }
    // No need to set isLoading to false on success because of navigation
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 p-6 flex flex-col">
        <div className="flex-grow flex items-center justify-center">
          <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg my-12">
            <h1 className="text-3xl font-bold text-primary text-center mb-6">
              Create Your Account
            </h1>
            <p className="text-center text-gray-600 mb-6">
                Join the <b>Spanish Fluency School</b> community.
            </p>

            {error && (
              <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded text-center">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">

              {/* First Name */}
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                  First Name
                </label>
                <input
                  id="firstName"
                  type="text"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Your first name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  disabled={isLoading}
                />
              </div>

              {/* Last Name */}
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                  Last Name
                </label>
                <input
                  id="lastName"
                  type="text"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Your last name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  disabled={isLoading}
                />
              </div>

              {/* City */}
              <div>
                <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                  City
                </label>
                <input
                  id="city"
                  type="text"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Your city"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  disabled={isLoading}
                />
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isLoading}
                />
              </div>

              {/* Password */}
              <div className="relative">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <input
                  id="password"
                  type={showPwd ? "text" : "password"}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Create a password"
                  value={password}
                  onChange={handlePasswordChange}
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPwd(!showPwd)}
                  className="absolute right-3 top-[2.3rem] text-gray-500 hover:text-gray-700 focus:outline-none text-sm"
                  aria-label="Toggle password visibility"
                >
                  {showPwd ? "Hide" : "Show"}
                </button>
                {/* Strength bar */}
                <div className="mt-2 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-300 ${
                      pwdStrength === 0 ? "bg-transparent" :
                      pwdStrength === 1 ? "bg-red-400" :
                      pwdStrength === 2 ? "bg-yellow-400" :
                      "bg-green-400" // Strength 3
                    }`}
                    style={{ width: `${(pwdStrength / 3) * 100}%` }}
                  ></div>
                </div>
                <p className="mt-1 text-xs text-gray-500">
                  Min. 8 characters, uppercase & number recommended.
                </p>
              </div>

              {/* Confirm Password */}
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                  Confirm Password
                </label>
                <input
                  id="confirmPassword"
                  type={showPwd ? "text" : "password"}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Re‑enter your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  disabled={isLoading}
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full py-3 mt-4 font-semibold rounded-lg transition duration-300 ease-in-out ${
                  isLoading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-primary text-white hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                }`}
              >
                {isLoading ? "Creating Account..." : "Create Account"}
              </button>
            </form>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default SignupPage;

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