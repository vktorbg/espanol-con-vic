// /src/pages/zoom-scheduler.js
import React, { useEffect, useState } from "react";
import { useLocation, navigate } from "@reach/router";
import Navbar from "../components/Navbar";

const ZoomSchedulerPage = () => {
  const location = useLocation();
  const [orderID, setOrderID] = useState("");
  const [plan, setPlan] = useState("");
  const [slots, setSlots] = useState([]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    setOrderID(params.get("orderID") || "");
    setPlan(params.get("plan") || "");
    const slotsParam = params.get("slots");
    if (slotsParam) {
      setSlots(slotsParam.split(",").map(s => s.trim()));
    }
  }, [location.search]);

  // Function to handle when the student is ready to proceed (for example, after scheduling)
  const handleProceed = () => {
    // Navigate to dashboard or further instructions
    navigate("/dashboard");
  };

  // Example benefits messaging – you can adjust this based on the plan
  const getBenefitsMessage = () => {
    if (plan.toLowerCase().includes("customizable")) {
      return "Your $1 trial has unlocked a personalized consultation! In this free 30-minute meeting, we’ll get to know each other, set your goals, and discuss a custom plan just for you.";
    }
    // Standard plans message
    return `Thank you for choosing the ${plan} plan! You now have access to personalized lessons, progress tracking, and exclusive discounts on supplementary classes.`;
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-200 flex flex-col items-center justify-center p-6">
        <div className="bg-white rounded-lg shadow-2xl p-8 max-w-3xl w-full text-center">
          <h1 className="text-4xl font-bold text-primary mb-4">
            Thank You for Your Payment!
          </h1>
          <p className="text-xl text-gray-700 mb-6">
            Your Order ID is: <span className="font-bold">{orderID}</span>
          </p>
          {plan && (
            <div className="mb-6">
              <h2 className="text-3xl font-bold text-primary">{plan}</h2>
              <p className="text-gray-700 mt-2">{getBenefitsMessage()}</p>
              {slots.length > 0 && (
                <p className="text-gray-600 mt-2">
                  Selected Time Slot{slots.length > 1 ? "s" : ""}:{" "}
                  <span className="font-semibold">{slots.join(" | ")}</span>
                </p>
              )}
            </div>
          )}
          <div className="mb-6">
            <h3 className="text-2xl font-semibold text-primary mb-4">
              Schedule Your First Session
            </h3>
            {/* Embedded Zoom Scheduler */}
            <div className="w-full bg-gray-100 rounded-lg shadow overflow-hidden">
              <iframe
                src="https://scheduler.zoom.us/espanolconvic/availability-espanol-con-vic?embed=true"
                width="100%"
                height="500"
                frameBorder="0"
                title="Zoom Scheduler"
                className="rounded-md"
              ></iframe>
            </div>
          </div>
          <button
            onClick={handleProceed}
            className="mt-6 bg-primary text-white px-8 py-3 rounded-lg font-semibold shadow-lg hover:bg-primary-dark transition"
          >
            Proceed to Dashboard
          </button>
        </div>
      </div>
    </>
  );
};

export default ZoomSchedulerPage;
