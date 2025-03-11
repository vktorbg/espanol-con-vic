// /src/pages/SignupTrial.js
import React, { useEffect, useState, useRef } from "react";
import { navigate } from "gatsby"; // Correct import for navigation
import Navbar from "../components/Navbar";
import { db, setDoc, doc } from "../firebase";
import { useAuth } from "../context/AuthContext";
import moment from "moment-timezone";

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
  const [timeZone, setTimeZone] = useState(moment.tz.guess());
  const [expandedDays, setExpandedDays] = useState({});
  const paypalRef = useRef(null);
  const [isPayPalLoaded, setIsPayPalLoaded] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const weekdays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
  const timeOptions = {
    Monday: ["2:00 PM", "2:30 PM", "3:00 PM", "3:30 PM"],
    Tuesday: ["9:00 AM", "9:30 AM", "4:00 PM", "4:30 PM", "6:00 PM", "6:30 PM"],
    Wednesday: ["9:00 AM", "9:30 AM", "2:00 PM", "2:30 PM", "3:00 PM", "3:30 PM", "4:00 PM", "4:30 PM", "5:00 PM", "5:30 PM", "6:00 PM", "6:30 PM"],
    Thursday: ["9:00 AM", "9:30 AM"],
    Friday: ["9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM", "2:00 PM", "2:30 PM", "3:00 PM", "3:30 PM", "4:00 PM", "4:30 PM", "5:00 PM", "5:30 PM"],
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

  const handleExpandClick = (day) => {
    setExpandedDays((prev) => ({
      ...prev,
      [day]: !prev[day],
    }));
  };

  const renderCalendar = () => (
    <table className="min-w-full border-collapse border border-gray-300">
      <thead>
        <tr className="bg-gray-100">
          {weekdays.map((day) => (
            <th key={day} className="border p-2 text-center">{day}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        <tr>
          {weekdays.map((day) => (
            <td key={day} className="border p-2 text-center">
              {timeOptions[day]?.slice(0, 6).map((timeSlot, index) => (
                <button
                  key={`${day}-${index}`}
                  onClick={() => handleSlotClick(day, timeSlot)}
                  className={`w-full px-2 py-1 rounded transition ${
                    selectedSlots.includes(`${day} ${timeSlot}`)
                      ? "bg-primary text-white"
                      : "bg-white text-primary border border-primary hover:bg-primary hover:text-white"
                  }`}
                >
                  {timeSlot}
                </button>
              ))}
              {timeOptions[day]?.length > 6 && (
                <>
                  {expandedDays[day] && timeOptions[day]?.slice(6).map((timeSlot, index) => (
                    <button
                      key={`${day}-extra-${index}`}
                      onClick={() => handleSlotClick(day, timeSlot)}
                      className={`w-full px-2 py-1 rounded transition ${
                        selectedSlots.includes(`${day} ${timeSlot}`)
                          ? "bg-primary text-white"
                          : "bg-white text-primary border border-primary hover:bg-primary hover:text-white"
                      }`}
                    >
                      {timeSlot}
                    </button>
                  ))}
                  <button
                    onClick={() => handleExpandClick(day)}
                    className="w-full px-2 py-1 mt-2 rounded bg-gray-200 text-gray-700 hover:bg-gray-300 transition"
                  >
                    {expandedDays[day] ? "Show Less" : "Show More"}
                  </button>
                </>
              )}
            </td>
          ))}
        </tr>
      </tbody>
    </table>
  );

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

    let script = document.createElement("script");
    let scriptUrl =
      "https://www.paypal.com/sdk/js?client-id=ATImwCTPXzjxzlRWAo5keyG0D-6xE2WfOgQ6a8fSPXCng02Hq1ifA0o4fwV_o7ZO5NUtJrr5QrpuZ49p&currency=USD&intent=capture";

    let paymentConfig = {
      createOrder: (data, actions) => {
        return actions.order.create({
          purchase_units: [{ amount: { value: "5.00" } }],
        });
      },
      onApprove: async (data, actions) => {
        if (isProcessing) return;
        setIsProcessing(true);

        try {
          const details = await actions.order.capture();
          const user = await signup(email, password, firstName, lastName);

          if (!user || !user.uid) {
            throw new Error("Signup did not return a valid user.");
          }

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
          if (err.code === "auth/email-already-in-use") {
            alert("The email address is already in use. Please log in or use a different email.");
          } else if (err.code === "auth/weak-password") {
            alert("The password is too weak. Please choose a stronger password (at least 6 characters).");
          } else {
            alert("There was an error saving your information. Please try again.");
          }
          setIsProcessing(false);
        }
      },
      onError: (err) => {
        console.error("Payment error:", err);
        alert("There was an error processing your payment. Please try again.");
      },
    };

    script.src = scriptUrl;
    script.async = true;
    script.onload = () => {
      setTimeout(() => {
        if (window.paypal && paypalRef.current) {
          window.paypal.Buttons(paymentConfig).render(paypalRef.current);
          setIsPayPalLoaded(true);
        }
      }, 100);
    };

    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
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
      <div className="min-h-screen bg-gray-50 p-6">
        <h1 className="text-4xl font-bold text-primary text-center mb-4">
          Sign Up & Book Your Trial Session
        </h1>
        <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow">
          <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="First Name"
                className="p-2 border rounded-md"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
              <input
                type="text"
                placeholder="Last Name"
                className="p-2 border rounded-md"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
              <input
                type="text"
                placeholder="City"
                className="p-2 border rounded-md"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                required
              />
              <input
                type="email"
                placeholder="Email"
                className="p-2 border rounded-md"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="password"
                placeholder="Password"
                className="p-2 border rounded-md"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <input
                type="password"
                placeholder="Confirm Password"
                className="p-2 border rounded-md"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            <div className="mt-4">
              <p className="text-lg font-semibold">Trial Class: 30 minutes (normally 50 minutes)</p>
              <p className="text-gray-600 mt-2">
                In this trial class, you will:
                <ul className="list-disc ml-6 mt-2">
                  <li>Get to know me</li>
                  <li>Discuss your learning goals</li>
                  <li>Create a personalized learning plan</li>
                  <li>Experience a sample lesson</li>
                </ul>
              </p>
              <p className="text-gray-600 mt-2">
                Note: All times are in Bogotá's time zone.
              </p>
            </div>
            <div className="mt-6">
              <h2 className="text-2xl font-semibold mb-2">Select Your Schedule</h2>
              <p className="mb-2 text-gray-600">
                Please select {allowedSlots} time slot.
              </p>
              {renderCalendar()}
              {selectedSlots.length > 0 && (
                <div className="mt-4">
                  <h3 className="text-xl font-semibold text-primary">
                    Selected Slot:
                  </h3>
                  <ul className="list-disc text-gray-700 mt-2 ml-6">
                    {selectedSlots.map((slot, idx) => (
                      <li key={idx}>{slot}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            <div className="mt-6 text-center">
              <h2 className="text-2xl font-semibold mb-2">
                Confirm & Pay
              </h2>
              <p className="text-lg font-semibold mb-4">The trial class costs $5</p>
              <div id="paypal-button-container" ref={paypalRef}></div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignupTrial;