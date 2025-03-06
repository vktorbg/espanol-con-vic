import React, { useEffect, useState, useRef } from "react";
import Navbar from "../components/Navbar";

const TrialPage = () => {
  const paypalRef = useRef(null);
  const [selectedSlots, setSelectedSlots] = useState([]);
  const allowedSlots = 1;
  const weekdays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
  const timeOptions = ["10:00 AM", "2:00 PM", "4:00 PM"];

  // Manejo de selección de horario
  const handleSlotClick = (day, time) => {
    const slot = `${day} ${time}`;
    setSelectedSlots((prev) => {
      if (prev.includes(slot)) {
        return prev.filter((s) => s !== slot);
      }
      if (prev.length < allowedSlots) {
        return [...prev, slot];
      } else {
        alert(`You can only select ${allowedSlots} time slot(s) for a trial class.`);
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

  // Se limpia el contenedor de PayPal si la selección cambia
  useEffect(() => {
    if (selectedSlots.length !== allowedSlots && paypalRef.current) {
      paypalRef.current.innerHTML = "";
    }
  }, [selectedSlots]);

  // Cargar el SDK y renderizar el botón cuando se haya seleccionado el horario.
  useEffect(() => {
    if (selectedSlots.length !== allowedSlots) return;
    if (paypalRef.current && paypalRef.current.innerHTML !== "") return;

    const script = document.createElement("script");
    // URL del SDK en modo live, con intent capture para pagos únicos.
    script.src =
      "https://www.paypal.com/sdk/js?client-id=ATImwCTPXzjxzlRWAo5keyG0D-6xE2WfOgQ6a8fSPXCng02Hq1ifA0o4fwV_o7ZO5NUtJrr5QrpuZ49p&currency=USD&intent=capture";
    script.async = true;
    script.onload = () => {
      setTimeout(() => {
        if (window.paypal && paypalRef.current) {
          window.paypal.Buttons({
            style: {
              shape: "pill",
              color: "blue",
              layout: "vertical",
              label: "pay",
            },
            createOrder: (data, actions) => {
              return actions.order.create({
                purchase_units: [{ amount: { value: "10.00" } }],
              });
            },
            onApprove: (data, actions) => {
              return actions.order.capture().then((details) => {
                window.location.href = `/final-landing/?orderID=${data.orderID}&plan=Trial&slots=${encodeURIComponent(selectedSlots.join(", "))}`;
              });
            },
            onError: (err) => {
              console.error("Payment error:", err);
              alert("There was an error processing your payment. Please try again.");
            },
          }).render(paypalRef.current);
        }
      }, 100);
    };
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, [selectedSlots]);

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-4xl font-bold text-primary text-center mb-8">
            Try It Out!
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            {/* Columna de imagen promocional */}
            <div>
              <img
                src="/images/trial-class.webp"
                alt="Trial Class"
                className="w-full rounded-lg shadow-lg"
              />
            </div>
            {/* Columna de información, horario y botón de PayPal */}
            <div>
              <div className="bg-white p-6 rounded-lg shadow mb-6">
                <p className="text-xl text-gray-700 mb-4">
                  Book a trial class for just $1 to experience personalized instruction.
                  (Regular class price: $20 per session)
                </p>
                <ul className="list-disc ml-6 mb-4 text-gray-600">
                  <li>Personalized lesson planning</li>
                  <li>Flexible scheduling</li>
                  <li>Ongoing support</li>
                  <li>Take the first step toward a plan that’s uniquely yours!</li>
                </ul>
                <p className="text-lg text-gray-700 mb-4 font-semibold">
                  Select your trial time slot:
                </p>
                {renderCalendar()}
                {selectedSlots.length > 0 && (
                  <div className="mt-4">
                    <h3 className="text-xl font-semibold text-primary">
                      Selected Slot:
                    </h3>
                    <p className="text-gray-700">{selectedSlots.join(", ")}</p>
                  </div>
                )}
              </div>
              {selectedSlots.length === allowedSlots ? (
                <div className="max-w-sm mx-auto">
                  <h2 className="text-2xl font-semibold mb-2 text-center">
                    Confirm &amp; Pay
                  </h2>
                  <div id="paypal-button-container" ref={paypalRef}></div>
                </div>
              ) : (
                <p className="text-center text-gray-600 mt-4">
                  Please select a time slot to continue.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TrialPage;
