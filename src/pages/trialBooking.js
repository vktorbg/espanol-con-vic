import React, { useState } from "react";

export default function SignupForm() {
  const [showPwd, setShowPwd] = useState(false);
  const [pwdStrength, setPwdStrength] = useState(0);
  const [errors, setErrors] = useState({});

  const handlePasswordChange = (e) => {
    const val = e.target.value;
    // Ejemplo simple de cálculo de fuerza
    let strength = 0;
    if (val.length >= 8) strength += 1;
    if (/[A-Z]/.test(val)) strength += 1;
    if (/[0-9]/.test(val)) strength += 1;
    setPwdStrength(strength);
  };

  return (
    <form className="w-full max-w-md mx-auto p-6 bg-white rounded-xl shadow-lg space-y-6">
      <h2 className="text-3xl font-bold text-center">Create Your Free Account</h2>
      <p className="text-center text-sm text-gray-600">Join 10,000+ happy students</p>

      {/* First Name */}
      <div>
        <label htmlFor="firstName" className="block text-sm font-medium mb-1">
          First Name
        </label>
        <input
          id="firstName"
          type="text"
          className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${
            errors.firstName ? "border-red-500" : "border-gray-300"
          }`}
          placeholder="Your first name"
          onBlur={(e) =>
            !e.target.value && setErrors((prev) => ({ ...prev, firstName: "First name is required" }))
          }
        />
        {errors.firstName && (
          <p className="mt-1 text-xs text-red-600">{errors.firstName}</p>
        )}
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium mb-1">
          Email Address
        </label>
        <input
          id="email"
          type="email"
          className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${
            errors.email ? "border-red-500" : "border-gray-300"
          }`}
          placeholder="you@example.com"
          onBlur={(e) =>
            !/^\S+@\S+\.\S+$/.test(e.target.value) &&
            setErrors((prev) => ({ ...prev, email: "Invalid email address" }))
          }
        />
        {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email}</p>}
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

      {/* Submit */}
      <button
        type="submit"
        className="w-full py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary-dark transition"
      >
        Sign Up
      </button>

      {/* Social Login */}
      <div className="text-center text-sm text-gray-600">
        Or sign up with
        <div className="flex justify-center space-x-4 mt-3">
          <button
            type="button"
            className="p-2 border rounded-full hover:bg-gray-100 transition"
            aria-label="Sign up with Google"
          >
            
          </button>
          <button
            type="button"
            className="p-2 border rounded-full hover:bg-gray-100 transition"
            aria-label="Sign up with Facebook"
          >
            
          </button>
        </div>
      </div>
    </form>
  );
}
