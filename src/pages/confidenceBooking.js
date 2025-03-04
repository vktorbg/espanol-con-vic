import React, { useEffect, useState, useRef } from "react";
import Navbar from "../components/Navbar";

const ConfidenceBookingPage = () => {
  const paypalRef = useRef(null);
  const [selectedSlots, setSelectedSlots] = useState([]);
  const [isPayPalLoaded, setIsPayPalLoaded] = useState(false);

  // Fijamos el plan a Confidence
  const selectedPlan = "Confidence";
  const planHoursMapping = {
    "Confidence": 2,
    "Fluency Plan": 4,
    "Customizable Plan": 1,
  };
  const allowedSlots = planHoursMapping[selectedPlan];

  const weekdays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
  const timeOptions = ["10:00 AM", "2:00 PM", "4:00 PM"];

  const handleSlotClick = (day, time) => {
    const slot = `${day} ${time}`;
    setSelectedSlots((prevSlots) => {
      if (prevSlots.includes(slot)) {
        return prevSlots.filter((s) => s !== slot);
      }
      if (prevSlots.length < allowedSlots) {
        return [...prevSlots, slot];
      } else {
        alert(`You can only select ${allowedSlots} time slot(s) for the ${selectedPlan} plan.`);
        return prevSlots;
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

  // Si la selección cambia, se limpia el contenedor de PayPal
  useEffect(() => {
    if (selectedSlots.length !== allowedSlots) {
      setIsPayPalLoaded(false);
      if (paypalRef.current) {
        paypalRef.current.innerHTML = "";
      }
    }
  }, [selectedSlots, allowedSlots]);

  // Cargar la SDK de PayPal cuando se hayan seleccionado los 2 slots
  useEffect(() => {
    if (selectedSlots.length !== allowedSlots) return;
    if (isPayPalLoaded) return;

    const script = document.createElement("script");
    // Configuración para el plan Confidence (suscripción)
    script.src =
      "https://www.paypal.com/sdk/js?client-id=ATImwCTPXzjxzlRWAo5keyG0D-6xE2WfOgQ6a8fSPXCng02Hq1ifA0o4fwV_o7ZO5NUtJrr5QrpuZ49p&vault=true&intent=subscription";
    script.async = true;
    script.onload = () => {
      setTimeout(() => {
        if (window.paypal && paypalRef.current) {
          window.paypal.Buttons({
            style: {
              shape: "pill",
              color: "blue",
              layout: "vertical",
              label: "subscribe",
            },
            createSubscription: (data, actions) => {
              return actions.subscription.create({
                plan_id: "P-0F9643859R0403530M7DEC7Q", // Confidence plan ID
              });
            },
            onApprove: (data, actions) => {
              alert(`Subscription ID: ${data.subscriptionID}`);
              window.location.href = `/final-landing/?orderID=${data.subscriptionID}&plan=${encodeURIComponent(
                selectedPlan
              )}&slots=${encodeURIComponent(selectedSlots.join(", "))}`;
            },
            onError: (err) => {
              console.error("Payment error:", err);
              alert("There was an error processing your payment. Please try again.");
            },
          }).render(paypalRef.current);
          setIsPayPalLoaded(true);
        }
      }, 100);
    };
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, [selectedSlots, isPayPalLoaded, allowedSlots, selectedPlan]);

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 p-6">
        <h1 className="text-4xl font-bold text-primary text-center mb-4">
          Book Your Session - Confidence Plan
        </h1>
        <div className="max-w-md mx-auto bg-white p-4 rounded-lg shadow mb-6 text-center">
          <p className="text-xl font-bold">Selected Plan: {selectedPlan}</p>
          <p className="text-gray-600 mt-2">
            Please select {allowedSlots} time slot{allowedSlots > 1 ? "s" : ""}.
          </p>
        </div>
        <div className="max-w-4xl mx-auto mb-6">{renderCalendar()}</div>
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

export default ConfidenceBookingPage;
