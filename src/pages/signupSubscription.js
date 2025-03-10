// /src/pages/SignupSubscription.js
import React, { useEffect, useState, useRef } from "react";
import { useLocation, navigate } from "gatsby";
import { useLocation as reachUseLocation } from "@reach/router";
import Navbar from "../components/Navbar";
import { db, setDoc, doc } from "../firebase";
import { useAuth } from "../context/AuthContext";

const SignupSubscription = () => {
  const location = reachUseLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialPlan = queryParams.get("plan") || "";
  
  // En este flujo se asume que el plan es de suscripción (no Trial)
  const [selectedPlan] = useState(initialPlan);

  // Campos del formulario
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [city, setCity] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Selección de horario
  const [selectedSlots, setSelectedSlots] = useState([]);
  const planSlotsMapping = {
    Confidence: 2,
    "Fluency Plan": 4,
  };
  const allowedSlots = planSlotsMapping[selectedPlan] || 1;

  // Referencia y estado para PayPal
  const paypalRef = useRef(null);
  const [isPayPalLoaded, setIsPayPalLoaded] = useState(false);

  // Bandera para evitar ejecuciones duplicadas
  const [isProcessing, setIsProcessing] = useState(false);

  // Opciones de horario
  const weekdays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
  const timeOptions = ["10:00 AM", "2:00 PM", "4:00 PM"];

  // Obtener las funciones signup y login de AuthContext
  const { signup, login } = useAuth();

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
    <table className="w-full table-fixed border-collapse">
      <thead>
        <tr>
          {weekdays.map((day) => (
            <th key={day} className="border px-2 py-1 text-primary text-lg">
              {day}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {timeOptions.map((time) => (
          <tr key={time}>
            {weekdays.map((day) => {
              const slot = `${day} ${time}`;
              const isSelected = selectedSlots.includes(slot);
              return (
                <td key={day + time} className="border px-2 py-1">
                  <button
                    onClick={() => handleSlotClick(day, time)}
                    className={`w-full px-2 py-1 rounded transition ${
                      isSelected
                        ? "bg-primary text-white"
                        : "bg-white text-primary border border-primary hover:bg-primary hover:text-white"
                    }`}
                  >
                    {time}
                  </button>
                </td>
              );
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );

  // Si se modifica la selección de horarios, se limpia el contenedor de PayPal
  useEffect(() => {
    if (selectedSlots.length !== allowedSlots) {
      setIsPayPalLoaded(false);
      if (paypalRef.current) {
        paypalRef.current.innerHTML = "";
      }
    }
  }, [selectedSlots, allowedSlots]);

  // Cargar el botón de PayPal cuando se cumplan las condiciones
  useEffect(() => {
    if (selectedSlots.length !== allowedSlots) return;
    if (!firstName || !lastName || !city || !email || !password || !confirmPassword) return;
    if (password !== confirmPassword) return;
    if (isPayPalLoaded) return;

    let script = document.createElement("script");
    let scriptUrl = "";
    let paymentConfig = {};

    if (selectedPlan === "Fluency Plan" || selectedPlan === "Confidence") {
      // Usar el SDK de suscripción
      scriptUrl =
        selectedPlan === "Fluency Plan"
          ? "https://www.paypal.com/sdk/js?client-id=YOUR_FLUENCY_CLIENT_ID&vault=true&intent=subscription"
          : "https://www.paypal.com/sdk/js?client-id=YOUR_CONFIDENCE_CLIENT_ID&vault=true&intent=subscription";
      paymentConfig = {
        style: { shape: "pill", color: "blue", layout: "vertical", label: "subscribe" },
        createSubscription: (data, actions) => {
          return actions.subscription.create({
            plan_id: selectedPlan === "Fluency Plan" ? "FLUENCY_PLAN_ID" : "CONFIDENCE_PLAN_ID",
          });
        },
        onApprove: async (data, actions) => {
          if (isProcessing) return;
          setIsProcessing(true);
          if (paypalRef.current) paypalRef.current.innerHTML = "";
          try {
            let user = await signup(email, password, firstName, lastName);
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
              orderID: data.subscriptionID,
              createdAt: new Date(),
            });
            navigate(`/finalLanding?studentId=${user.uid}`);
            return;
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
    } else {
      return;
    }

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
    login,
    isProcessing,
  ]);

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 p-6">
        <h1 className="text-4xl font-bold text-primary text-center mb-4">
          Sign Up & Book Your Session
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
              <p className="text-lg font-semibold">Selected Plan: {selectedPlan}</p>
            </div>
            <div className="mt-6">
              <h2 className="text-2xl font-semibold mb-2">Select Your Schedule</h2>
              <p className="mb-2 text-gray-600">
                Please select {allowedSlots} time slot{allowedSlots > 1 ? "s" : ""}.
              </p>
              {renderCalendar()}
              {selectedSlots.length > 0 && (
                <div className="mt-4">
                  <h3 className="text-xl font-semibold text-primary">
                    Selected Slot{allowedSlots > 1 ? "s" : ""}:
                  </h3>
                  <ul className="list-disc text-gray-700 mt-2 ml-6">
                    {selectedSlots.map((slot, idx) => (
                      <li key={idx}>{slot}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            <div className="mt-6">
              <h2 className="text-2xl font-semibold mb-2 text-center">Confirm &amp; Pay</h2>
              <div id="paypal-button-container" ref={paypalRef}></div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignupSubscription;
