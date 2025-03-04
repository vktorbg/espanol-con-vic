import React, { useEffect, useState, useRef } from "react";
import { useLocation } from "@reach/router";
import Navbar from "../components/Navbar";

const BookingPage = () => {
  const location = useLocation();
  const paypalRef = useRef(null);

  // State for plan and slot selection
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [selectedSlots, setSelectedSlots] = useState([]);
  const [isPayPalLoaded, setIsPayPalLoaded] = useState(false);

  // Define weekdays (Monday to Friday) and time options
  const weekdays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
  const timeOptions = ["10:00 AM", "2:00 PM", "4:00 PM"];

  // Allowed time slots per plan
  const planHoursMapping = {
    "Confidence": 2,
    "Fluency Plan": 4,
    "Customizable Plan": 1,
  };

  // Extract the "plan" query parameter from the URL
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const plan = params.get("plan");
    setSelectedPlan(plan);
  }, [location.search]);

  // Handler for selecting/deselecting a time slot
  const handleSlotClick = (day, time) => {
    const slot = `${day} ${time}`;
    setSelectedSlots((prevSlots) => {
      if (prevSlots.includes(slot)) {
        return prevSlots.filter((s) => s !== slot);
      }
      const allowed = planHoursMapping[selectedPlan] || 0;
      if (prevSlots.length < allowed) {
        return [...prevSlots, slot];
      } else {
        alert(`You can only select ${allowed} time slot(s) for the ${selectedPlan} plan.`);
        return prevSlots;
      }
    });
  };

  // Clear PayPal button if slot selection changes
  useEffect(() => {
    const allowed = planHoursMapping[selectedPlan] || 0;
    if (selectedSlots.length !== allowed) {
      setIsPayPalLoaded(false);
      if (paypalRef.current) {
        paypalRef.current.innerHTML = "";
      }
    }
  }, [selectedSlots, selectedPlan, planHoursMapping]);

  // Load PayPal SDK when the exact allowed number of slots is selected
  useEffect(() => {
    const allowed = planHoursMapping[selectedPlan] || 0;
    if (selectedSlots.length !== allowed) return;
    if (isPayPalLoaded) return;

    let scriptUrl = "";
    let paymentConfig = {};

    if (selectedPlan === "Fluency Plan") {
      // Use PayPal subscription for Fluency Plan
      scriptUrl =
        "https://www.paypal.com/sdk/js?client-id=ATImwCTPXzjxzlRWAo5keyG0D-6xE2WfOgQ6a8fSPXCng02Hq1ifA0o4fwV_o7ZO5NUtJrr5QrpuZ49p&vault=true&intent=subscription";
      paymentConfig = {
        style: {
          shape: "pill",
          color: "blue",
          layout: "vertical",
          label: "subscribe",
        },
        createSubscription: function (data, actions) {
          return actions.subscription.create({
            plan_id: "P-0VR89665Y0486153PM7DEGVY",
          });
        },
        onApprove: function (data, actions) {
          alert(data.subscriptionID);
        },
      };
    } else if (selectedPlan === "Confidence") {
      // Use PayPal subscription for Confidence plan
      scriptUrl =
        "https://www.paypal.com/sdk/js?client-id=ATImwCTPXzjxzlRWAo5keyG0D-6xE2WfOgQ6a8fSPXCng02Hq1ifA0o4fwV_o7ZO5NUtJrr5QrpuZ49p&vault=true&intent=subscription";
      paymentConfig = {
        style: {
          shape: "pill",
          color: "blue",
          layout: "vertical",
          label: "subscribe",
        },
        createSubscription: function (data, actions) {
          return actions.subscription.create({
            plan_id: "P-0F9643859R0403530M7DEC7Q",
          });
        },
        onApprove: function (data, actions) {
          alert(data.subscriptionID);
        },
      };
    } else if (selectedPlan === "Customizable Plan") {
      // Use one-time payment for the $1 trial using your original SDK info
      scriptUrl =
        "https://www.paypal.com/sdk/js?client-id=AWDoEeOwk3S58HTojYQezKAg7tPGbXIWJX4nkyA1zoW3uS5XBEbyGPbROlIX7KcEQ19DHkGftDaAgoYx&currency=USD";
      paymentConfig = {
        createOrder: function (data, actions) {
          return actions.order.create({
            purchase_units: [{ amount: { value: "1.00" } }],
          });
        },
        onApprove: function (data, actions) {
          return actions.order.capture().then((details) => {
            window.location.href = `/final-landing/?orderID=${data.orderID}&plan=${encodeURIComponent(
              selectedPlan
            )}&slots=${encodeURIComponent(selectedSlots.join(", "))}`;
          });
        },
        onError: function (err) {
          console.error("Payment error:", err);
          alert("There was an error processing your payment. Please try again.");
        },
      };
    } else {
      return;
    }

    const script = document.createElement("script");
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
  }, [selectedSlots, selectedPlan, isPayPalLoaded, planHoursMapping]);

  const allowedSlots = planHoursMapping[selectedPlan] || 0;

  // Render the calendar grid as a table for weekdays
  const renderCalendar = () => {
    return (
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
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 p-6">
        <h1 className="text-4xl font-bold text-primary text-center mb-4">
          Book Your Session
        </h1>

        {/* Selected Plan Summary */}
        {selectedPlan && (
          <div className="max-w-md mx-auto bg-white p-4 rounded-lg shadow mb-6 text-center">
            <p className="text-xl font-bold">Selected Plan: {selectedPlan}</p>
            {allowedSlots > 0 && (
              <p className="text-gray-600 mt-2">
                Please select {allowedSlots} time slot{allowedSlots > 1 ? "s" : ""}.
              </p>
            )}
          </div>
        )}

        {/* Calendar Grid */}
        <div className="max-w-4xl mx-auto mb-6">{renderCalendar()}</div>

        {/* Display Selected Slots */}
        {selectedSlots.length > 0 && (
          <div className="max-w-md mx-auto mb-6">
            <h2 className="text-2xl font-semibold text-center text-primary">
              Selected Slots:
            </h2>
            <ul className="list-disc text-gray-700 mt-2 ml-6">
              {selectedSlots.map((slot, idx) => (
                <li key={idx}>{slot}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Payment Section */}
        {selectedSlots.length === allowedSlots ? (
          <div className="max-w-sm mx-auto">
            <h2 className="text-2xl font-semibold mb-2 text-center">
              Confirm &amp; Pay
            </h2>
            <div id="paypal-button-container" ref={paypalRef}></div>
          </div>
        ) : (
          <p className="text-center text-gray-600 mt-4">
            Please select exactly {allowedSlots} time slot{allowedSlots > 1 ? "s" : ""} to continue.
          </p>
        )}
      </div>
    </>
  );
};

export default BookingPage;
