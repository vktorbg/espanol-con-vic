// /src/pages/dashboard.js
import React, { useEffect, useState, useRef } from "react";
import { navigate } from "@reach/router";
import { graphql } from 'gatsby';
import { useAuth } from "../context/AuthContext";
import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import ProtectedRoute from "../components/ProtectedRoute";
import Navbar from "../components/Navbar";
import { Helmet } from "react-helmet";

// --- Icon Components (Heroicons) ---
const VideoCameraIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="m15.75 10.5 4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25h-9A2.25 2.25 0 0 0 2.25 7.5v9A2.25 2.25 0 0 0 4.5 18.75Z" />
  </svg>
);

const FolderIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.75V12A2.25 2.25 0 0 1 4.5 9.75h15A2.25 2.25 0 0 1 21.75 12v.75m-8.69-6.44-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z" />
  </svg>
);

const BookOpenIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6-2.292m0 0V21M12 6.042A8.967 8.967 0 0 1 18 3.75m-6 2.292A8.967 8.967 0 0 0 6 3.75" />
  </svg>
);

const Cog6ToothIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.646.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.24-.438.613-.43.992a6.759 6.759 0 0 1 0 1.255c-.008.378.137.75.43.991l1.004.827c.427.352.574.904.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 0 1-.22.128c-.333.183-.582.495-.646.869l-.213 1.28c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.646-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.759 6.759 0 0 1 0-1.255c.008-.378-.137-.75-.43-.991l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.646-.869l.213-1.28Z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
  </svg>
);

const CreditCardIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h6m3-5.25H21m-9 5.25h9m-9 2.25h9M2.25 9V7.5A2.25 2.25 0 0 1 4.5 5.25h15A2.25 2.25 0 0 1 21.75 7.5V9m0 0v2.25A2.25 2.25 0 0 1 19.5 13.5H4.5A2.25 2.25 0 0 1 2.25 11.25V9" />
  </svg>
);

const XMarkIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
  </svg>
);

const ChevronDownIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
  </svg>
);

const ClipboardDocumentListIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 5.25 6h.008a2.25 2.25 0 0 1 2.242 2.135 48.424 48.424 0 0 0 1.123.08M5.25 9h6.489M5.25 12h6.489M5.25 15h6.489M5.25 18h6.489M5.25 21h6.489M12 21a2.25 2.25 0 0 0 2.25-2.25V6.108M15.75 9H18M15.75 12H18M15.75 15H18M15.75 18H18m-3-12.75h3l-3 3-3-3h3Z" />
  </svg>
);

const CalendarDaysIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5v-.008ZM9.75 18h.008v.008H9.75v-.008ZM7.5 18h.008v.008H7.5v-.008ZM14.25 15h.008v.008H14.25v-.008ZM14.25 18h.008v.008H14.25v-.008ZM16.5 15h.008v.008H16.5v-.008ZM16.5 18h.008v.008H16.5v-.008Z" />
  </svg>
);


// --- Payment Modal Component ---
const PaymentModal = ({ isOpen, onClose, type }) => {
  if (!isOpen) return null;

  const paypalUrl = "https://www.paypal.me/vktorbg"; // Your actual PayPal.me link

  const modalContent = {
    paypal: {
      title: "Pay with PayPal",
      content: (
        <>
          <p className="text-gray-600 mb-6">
            Click the button below to proceed to PayPal for secure payment.
          </p>
          <a
            href={paypalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center w-full px-6 py-3 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Go to PayPal
          </a>
        </>
      ),
    },
    bank: {
      title: "Bank Transfer Details",
      content: (
        <div className="text-gray-700 space-y-3">
          <p><strong>Bank Name:</strong> Global Standard Bank</p>
          <p><strong>Account Number:</strong> 9876543210</p>
          <p><strong>SWIFT/BIC:</strong> GSBIGLOBXXX</p>
          <p><strong>Beneficiary Name:</strong> Spanish Fluency Academy</p>
          <p className="mt-2"><strong>Reference:</strong> Your Full Name - Course Payment</p>
        </div>
      ),
    },
    binance: {
      title: "Pay with Binance (USDT)",
      content: (
        <div className="text-gray-700 space-y-3">
          <p><strong>Cryptocurrency:</strong> USDT (Tether)</p>
          <p><strong>Network:</strong> TRC20 (Tron Network)</p>
          <p className="break-all"><strong>Wallet Address:</strong> TEXAMPLE123AddressForUSDTTRC20XYZ</p>
          <p className="mt-4 text-sm text-red-600 font-medium">
            <strong>Important:</strong> Please ensure you select the TRC20 network when sending USDT. Using the wrong network may result in permanent loss of funds.
          </p>
          {/* <img src="/images/binance-qr.png" alt="USDT TRC20 QR Code" className="mx-auto mt-4 w-36 h-36 border rounded-md" /> */}
          <p className="text-center mt-3 text-xs text-gray-500">(QR Code placeholder - generate and add your own)</p>
        </div>
      ),
    },
  };

  const currentModal = modalContent[type];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 p-4 transition-opacity duration-300 ease-in-out">
      <div className="bg-white rounded-xl shadow-2xl p-6 sm:p-8 w-full max-w-lg relative transform transition-all duration-300 ease-in-out scale-95 opacity-0 animate-modalFadeInScaleUp">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
          aria-label="Close modal"
        >
          <XMarkIcon className="w-7 h-7" />
        </button>
        <h3 className="text-2xl font-semibold text-gray-800 mb-6 text-center">{currentModal?.title || "Payment Information"}</h3>
        <div>{currentModal?.content}</div>
      </div>
      {/* Add CSS for animation if not using Tailwind's animation utilities directly */}
      <style jsx global>{`
        @keyframes modalFadeInScaleUp {
          0% { opacity: 0; transform: scale(0.95); }
          100% { opacity: 1; transform: scale(1); }
        }
        .animate-modalFadeInScaleUp {
          animation: modalFadeInScaleUp 0.3s forwards;
        }
      `}</style>
    </div>
  );
};


const Dashboard = () => {
  const { currentUser } = useAuth();
  const [studentData, setStudentData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isPaymentDropdownOpen, setIsPaymentDropdownOpen] = useState(false);
  const [activeModal, setActiveModal] = useState(null);
  const paymentDropdownRef = useRef(null);

  // --- Color Configuration ---
  // IMPORTANT: Replace these with your actual Tailwind CSS color class names defined in tailwind.config.js
  // Example: If your primary color is 'brandBlue', use 'brandBlue-600', 'brandBlue-700' etc.
  const primaryColor = "primary"; // e.g., 'blue-600', 'primary-600'
  const primaryColorHover = "primary_hover"; // e.g., 'blue-700', 'primary-700'
  const primaryTextColor = "primary"; // e.g., 'text-blue-600', 'text-primary-600'
  // Gradient for Hero - using hardcoded orange to match example. Adjust if your primary color is different.
  const heroGradient = "linear-gradient(to right, rgba(217,121,6,0.8), rgba(234,88,12,0.8))";


  useEffect(() => {
    if (currentUser) {
      const fetchStudentData = async () => {
        setLoading(true);
        try {
          const studentRef = doc(db, "students", currentUser.uid);
          const docSnap = await getDoc(studentRef);
          if (docSnap.exists()) {
            setStudentData(docSnap.data());
          } else {
            console.log("No student data found for UID:", currentUser.uid);
          }
        } catch (error) {
          console.error("Error fetching student data:", error);
        } finally {
          setLoading(false);
        }
      };
      fetchStudentData();
    } else {
      // If no currentUser after initial auth check, maybe redirect to login
      // setLoading(false); // Or handle this based on your auth flow
    }
  }, [currentUser]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (paymentDropdownRef.current && !paymentDropdownRef.current.contains(event.target)) {
        setIsPaymentDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handlePaymentOptionClick = (type) => {
    setActiveModal(type);
    setIsPaymentDropdownOpen(false);
  };

  const ActionButton = ({ href, onClick, icon, children, target, rel, additionalClassName = "" }) => (
    <a
      href={href}
      onClick={onClick}
      target={target}
      rel={rel}
      className={`bg-${primaryColor} text-white px-5 py-3.5 rounded-xl font-semibold shadow-lg hover:bg-${primaryColorHover} transition-all duration-200 ease-in-out flex items-center space-x-3 justify-center text-sm sm:text-base hover:shadow-xl transform hover:-translate-y-0.5 ${additionalClassName}`}
    >
      {icon}
      <span>{children}</span>
    </a>
  );

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-orange-500 mb-4"></div>
          <p className="text-xl text-gray-700 font-medium">Loading your dashboard...</p>
        </div>
      </>
    );
  }

  return (
    <ProtectedRoute>
      <Helmet>
        <link rel="icon" href="/images/favicon.png" type="image/png" />
        <title>My Dashboard | Spanish Fluency School</title>
      </Helmet>
      <Navbar />
      
      <div
        className="w-full h-56 md:h-72" // Slightly reduced height
        style={{
          backgroundImage: `${heroGradient}, url('/images/dashboard-image.png')`,
          backgroundBlendMode: "multiply",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      ></div>

      <div className="bg-gray-100 min-h-screen pb-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 md:-mt-24">
          {/* Welcome Header */}
          <div className="bg-white p-6 sm:p-8 rounded-xl shadow-xl mb-10 text-center">
            {studentData ? (
              <>
                <h1 className="text-3xl sm:text-4xl font-bold text-gray-800">
                  ¡Hola, {studentData.firstName}!
                </h1>
                <p className="text-lg text-gray-600 mt-2">Welcome to your learning hub.</p>
              </>
            ) : (
              <p className="text-xl text-red-500 font-semibold">Could not load student data. Please try again later.</p>
            )}
          </div>

          {/* Student Info Cards */}
          {studentData && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
              <div className="bg-white p-6 rounded-xl shadow-lg flex items-start space-x-4">
                <div className={`p-3 rounded-full bg-${primaryColor} bg-opacity-10`}>
                  <ClipboardDocumentListIcon className={`w-7 h-7 text-${primaryTextColor}`} />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-800 mb-1">Your Plan</h2>
                  <p className="text-2xl font-bold text-gray-700">
                    {studentData.plan || "Not Set"}
                  </p>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-lg flex items-start space-x-4">
                 <div className={`p-3 rounded-full bg-${primaryColor} bg-opacity-10`}>
                  <CalendarDaysIcon className={`w-7 h-7 text-${primaryTextColor}`} />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-800 mb-1">Weekly Schedule</h2>
                  <p className="text-lg font-medium text-gray-600 leading-relaxed">
                    {studentData.schedule && studentData.schedule.length > 0
                      ? studentData.schedule.join(" • ")
                      : "Not Set"}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          {studentData && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
              <ActionButton 
                href={studentData.zoomLink || "#"}
                target={studentData.zoomLink ? "_blank" : undefined}
                rel={studentData.zoomLink ? "noopener noreferrer" : undefined}
                icon={<VideoCameraIcon className="w-6 h-6" />}
                additionalClassName={!studentData.zoomLink ? "opacity-50 cursor-not-allowed !bg-gray-400 hover:!bg-gray-400" : ""}
                onClick={!studentData.zoomLink ? (e) => e.preventDefault() : undefined}
              >
                Join Zoom Class
              </ActionButton>
              <ActionButton 
                href={studentData.folderLink || "#"}
                target={studentData.folderLink ? "_blank" : undefined}
                rel={studentData.folderLink ? "noopener noreferrer" : undefined}
                icon={<FolderIcon className="w-6 h-6" />}
                additionalClassName={!studentData.folderLink ? "opacity-50 cursor-not-allowed !bg-gray-400 hover:!bg-gray-400" : ""}
                 onClick={!studentData.folderLink ? (e) => e.preventDefault() : undefined}
              >
                Your Drive Folder
              </ActionButton>
              <ActionButton 
                href={studentData.readingExercisesLink || "#"}
                target={studentData.readingExercisesLink ? "_blank" : undefined}
                rel={studentData.readingExercisesLink ? "noopener noreferrer" : undefined}
                icon={<BookOpenIcon className="w-6 h-6" />}
                additionalClassName={!studentData.readingExercisesLink ? "opacity-50 cursor-not-allowed !bg-gray-400 hover:!bg-gray-400" : ""}
                onClick={!studentData.readingExercisesLink ? (e) => e.preventDefault() : undefined}
              >
                Reading Exercises
              </ActionButton>
              <ActionButton 
                onClick={() => navigate("/account")}
                icon={<Cog6ToothIcon className="w-6 h-6" />}
              >
                Account Settings
              </ActionButton>
            </div>
          )}
          
          {/* Payment Section */}
          <div className="flex justify-center" ref={paymentDropdownRef}>
            <div className="bg-white p-6 sm:p-8 rounded-xl shadow-lg w-full max-w-md text-center">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Manage Your Subscription</h2>
              <button
                type="button"
                className="inline-flex items-center justify-center w-full rounded-lg shadow-md px-6 py-3 bg-green-600 text-white text-base sm:text-lg font-medium hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all duration-150 ease-in-out transform hover:scale-105"
                onClick={() => setIsPaymentDropdownOpen(!isPaymentDropdownOpen)}
              >
                <CreditCardIcon className="w-6 h-6 mr-2.5" />
                Make a Payment
                <ChevronDownIcon className={`ml-2.5 h-5 w-5 transition-transform duration-200 ${isPaymentDropdownOpen ? "rotate-180" : ""}`} />
              </button>
              {isPaymentDropdownOpen && (
                <div className="mt-4 rounded-md shadow-lg bg-gray-50 ring-1 ring-black ring-opacity-5 focus:outline-none z-20 origin-top animate-dropdownFadeIn">
                  <div className="py-1">
                    <button
                      onClick={() => handlePaymentOptionClick("paypal")}
                      className="block w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-gray-200 hover:text-gray-900 transition-colors"
                    >
                      PayPal
                    </button>
                    <button
                      onClick={() => handlePaymentOptionClick("bank")}
                      className="block w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-gray-200 hover:text-gray-900 transition-colors"
                    >
                      Bank Transfer
                    </button>
                    <button
                      onClick={() => handlePaymentOptionClick("binance")}
                      className="block w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-gray-200 hover:text-gray-900 transition-colors"
                    >
                      Binance (USDT)
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <PaymentModal 
        isOpen={!!activeModal} 
        onClose={() => setActiveModal(null)} 
        type={activeModal} 
      />
      {/* Add CSS for dropdown animation */}
      <style jsx global>{`
        @keyframes dropdownFadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-dropdownFadeIn {
          animation: dropdownFadeIn 0.2s ease-out forwards;
        }
      `}</style>
    </ProtectedRoute>
  );
};

export default Dashboard;

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