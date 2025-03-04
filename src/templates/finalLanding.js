import React, { useEffect, useState } from "react";
import { useLocation, navigate } from "@reach/router";
import Navbar from "../components/Navbar";
import { useAuth } from "../context/AuthContext"; // Import authentication

function FinalLanding() {
  const location = useLocation();
  const { currentUser } = useAuth(); // Check if the user is logged in
  const [orderID, setOrderID] = useState("");
  const [plan, setPlan] = useState("");
  const [slots, setSlots] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    setOrderID(params.get("orderID") || "");
    setPlan(params.get("plan") || "");
    const slotsParam = params.get("slots");
    if (slotsParam) {
      setSlots(slotsParam.split(",").map((s) => s.trim()));
    }
    setTimeout(() => setLoading(false), 200);
  }, [location.search]);

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 to-gray-200 p-8">
          <p className="text-2xl text-primary">Loading your session details...</p>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-200 flex flex-col items-center justify-center p-8">
        <h1 className="text-4xl font-bold text-primary mb-4">
          Thank You for Your Payment!
        </h1>
        <p className="text-xl text-gray-700 mb-6 text-center max-w-2xl">
          Your Order ID is: <span className="font-bold">{orderID}</span>
        </p>
        {plan && (
          <div className="mb-6 text-center">
            <h2 className="text-3xl font-bold text-primary">{plan}</h2>
            <p className="text-gray-700 mt-2">
              We are excited to start working with you!
            </p>
          </div>
        )}
        {currentUser ? (
          <>
            <p className="text-lg text-gray-700 text-center max-w-xl mb-4">
              Welcome back! Keep learning and improving every day.
            </p>
            <button
              onClick={() => navigate("/dashboard")}
              className="bg-primary text-white px-8 py-3 rounded-lg font-semibold shadow-lg hover:bg-primary-dark transition"
            >
              Go to Dashboard
            </button>
          </>
        ) : (
          <>
            <p className="text-lg text-gray-700 text-center max-w-xl mb-4">
              Create your account now and access your personalized dashboard.
            </p>
            <button
              onClick={() => navigate("/signup")}
              className="bg-primary text-white px-8 py-3 rounded-lg font-semibold shadow-lg hover:bg-primary-dark transition"
            >
              Create Account
            </button>
          </>
        )}
      </div>
    </>
  );
}

export default FinalLanding;
