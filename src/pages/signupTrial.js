// /src/pages/SignupTrial.js
import React, { useEffect, useState, useRef } from "react";
import { navigate } from "gatsby"; // Correct import for navigation
import Navbar from "../components/Navbar";
import { db, setDoc, doc } from "../firebase";
import { useAuth } from "../context/AuthContext";

const SignupTrial = () => {
  const [selectedPlan] = useState("Trial");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [city, setCity] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [selectedSlots, setSelectedSlots] = useState([]);
  const allowedSlots = 1;

  const weekdays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
  const timeOptions = {
    Monday: ["2:00 PM - 4:00 PM"],
    Tuesday: ["9:00 AM - 10:00 AM", "4:00 PM - 5:00 PM", "6:00 PM - 7:00 PM"],
    Wednesday: ["9:00 AM - 10:00 AM", "2:00 PM - 7:00 PM"],
    Thursday: ["9:00 AM - 10:00 AM"],
    Friday: ["9:00 AM - 11:00 AM", "2:00 PM - 6:00 PM"],
  };

  const { signup } = useAuth();

  const handleSlotClick = (day, time) => {
    const slot = `${day} ${time}`;
    setSelectedSlots((prev) => {
      if (prev.includes(slot)) {
        return prev.filter((s) => s !== slot);
      }
      if (prev.length < allowedSlots) {
        return [...prev, slot];
      } else {
        alert(`You can only select ${allowedSlots} time slot(s) for the ${selectedPlan} plan.`);
        return prev;
      }
    });
  };

  const renderCalendar = () => (
    <div className="grid grid-cols-5 gap-4">
      {weekdays.map((day) => (
        <div key={day} className="text-center font-semibold bg-gray-100 rounded-md py-2">
          {day}
        </div>
      ))}
      {weekdays.map((day) => (
        <div key={day} className="space-y-2">
          {timeOptions[day]?.map((timeSlot, index) => (
            <button
              key={`${day}-${index}`}
              onClick={() => handleSlotClick(day, timeSlot)}
              className={`w-full px-4 py-2 rounded-lg transition-colors ${
                selectedSlots.includes(`${day} ${timeSlot}`)
                  ? "bg-primary text-white"
                  : "bg-white text-primary border border-primary hover:bg-primary hover:text-white"
              }`}
            >
              {timeSlot}
            </button>
          ))}
        </div>
      ))}
    </div>
  );

  const paypalRef = useRef(null);
  const [isPayPalLoaded, setIsPayPalLoaded] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    if (selectedSlots.length !== allowedSlots) {
      setIsPayPalLoaded(false);
      if (paypalRef.current) {
        paypalRef.current.innerHTML = "";
      }
    }
  }, [selectedSlots, allowedSlots]);

  useEffect(() => {
    if (selectedSlots.length !== allowedSlots) return;
    if (!firstName || !lastName || !city || !email || !password || !confirmPassword) return;
    if (password !== confirmPassword) return;
    if (isPayPalLoaded) return;

    const script = document.createElement("script");
    script.src =
      "https://www.paypal.com/sdk/js?client-id=ATImwCTPXzjxzlRWAo5keyG0D-6xE2WfOgQ6a8fSPXCng02Hq1ifA0o4fwV_o7ZO5NUtJrr5QrpuZ49p&currency=USD&intent=capture";
    script.async = true;
    script.onload = () => {
      setTimeout(() => {
        if (window.paypal && paypalRef.current) {
          window.paypal.Buttons({
            createOrder: (data, actions) => actions.order.create({ purchase_units: [{ amount: { value: "5.00" } }] }),
            onApprove: async (data, actions) => {
              if (isProcessing) return;
              setIsProcessing(true);
              try {
                const details = await actions.order.capture();
                const user = await signup(email, password, firstName, lastName);
                if (!user || !user.uid) throw new Error("Signup did not return a valid user.");
                await setDoc(doc(db, "students", user.uid), {
                  firstName,
                  lastName,
                  city,
                  email,
                  plan: selectedPlan,
                  schedule: selectedSlots,
                  orderID: data.orderID,
                  createdAt: new Date(),
                });
                navigate(`/finalLanding?studentId=${user.uid}`);
              } catch (err) {
                console.error("Error creating student:", err);
                alert(err.code === "auth/email-already-in-use"
                  ? "The email address is already in use."
                  : err.code === "auth/weak-password"
                  ? "The password is too weak."
                  : "There was an error saving your information.");
                setIsProcessing(false);
              }
            },
            onError: (err) => {
              console.error("Payment error:", err);
              alert("There was an error processing your payment.");
            },
          }).render(paypalRef.current);
          setIsPayPalLoaded(true);
        }
      }, 100);
    };
    document.body.appendChild(script);
    return () => document.body.removeChild(script);
  }, [
    selectedSlots,
    allowedSlots,
    firstName,
    lastName,
    city,
    email,
    password,
    confirmPassword,
    isPayPalLoaded,
    selectedPlan,
    signup,
    isProcessing,
  ]);

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center py-10">
        <div className="max-w-4xl w-full bg-white p-8 rounded-lg shadow-lg">
          <h1 className="text-3xl font-bold text-primary text-center mb-6">
            Sign Up & Book Your Trial Session
          </h1>
          <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
            {/* Personal Information */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Personal Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="First Name"
                  className="p-3 border rounded-md w-full"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
                <input
                  type="text"
                  placeholder="Last Name"
                  className="p-3 border rounded-md w-full"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />
                <input
                  type="text"
                  placeholder="City"
                  className="p-3 border rounded-md w-full"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  required
                />
                <input
                  type="email"
                  placeholder="Email"
                  className="p-3 border rounded-md w-full"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Password Section */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Password</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="password"
                  placeholder="Password"
                  className="p-3 border rounded-md w-full"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <input
                  type="password"
                  placeholder="Confirm Password"
                  className="p-3 border rounded-md w-full"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Schedule Selection */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Select Your Schedule</h2>
              <p className="text-gray-600">Please select {allowedSlots} time slot.</p>
              {renderCalendar()}
              {selectedSlots.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold text-primary">Selected Slot:</h3>
                  <ul className="list-disc text-gray-700 mt-2 ml-6">
                    {selectedSlots.map((slot, idx) => (
                      <li key={idx}>{slot}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Payment Section */}
            <div className="mt-8 space-y-4">
              <h2 className="text-xl font-semibold">Confirm & Pay</h2>
              <p className="text-gray-600">Trial Class: 30 minutes (normally 50 minutes)</p>
              <div id="paypal-button-container" ref={paypalRef}></div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignupTrial;