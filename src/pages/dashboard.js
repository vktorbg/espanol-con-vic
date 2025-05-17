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

// --- NEW: Import icons from @heroicons/react ---
// You'll need to install it: npm install @heroicons/react OR yarn add @heroicons/react
import {
  VideoCameraIcon,
  FolderIcon,
  BookOpenIcon,
  Cog6ToothIcon,
  CreditCardIcon,
  XMarkIcon,
  ChevronDownIcon,
  UserCircleIcon, // For Personal Info
  CalendarDaysIcon,
  ArrowPathIcon, // For Reschedule
  LightBulbIcon, // For Learning Hub
} from '@heroicons/react/24/outline'; // Using outline for a lighter feel

// --- Payment Modal Component ---
const PaymentModal = ({ isOpen, onClose, type }) => {
  if (!isOpen) return null;

  // IMPORTANT: Ensure these URLs and details are correct and secure for production
  const paypalUrl = "https://www.paypal.com/ncp/payment/ETVB89UTNVAH6";
  const bankDetails = {
    bankName: "Regent Bank",
    accountNumber: "130129450461",
    // ABA / Route Number: Removed as per request
    beneficiaryName: "Victor Briceño",
    reference: "Your Full Name - Plan or Service",
  };
  const binanceDetails = {
    currency: "USDT (Tether)",
    network: "TRC20 (Tron Network)",
    walletAddress: "TKc72u6vCJ8jboJ4Kmz8whc3VJCtzuJXPe",
  };

  const modalContent = {
    paypal: {
      title: "Pay with PayPal",
      content: (
        <>
          <p className="text-gray-600 mb-6 text-sm">
            Click the button below to proceed to PayPal for secure payment.
          </p>
          <a
            href={paypalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center w-full px-6 py-3 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
          >
            Go to PayPal
          </a>
        </>
      ),
    },
    bank: {
      title: "Bank Transfer Details",
      content: (
        <div className="text-gray-700 space-y-2 text-sm">
          <p><strong>Bank Name:</strong> {bankDetails.bankName}</p>
          <p><strong>Account Number:</strong> {bankDetails.accountNumber}</p>
          <p><strong>Beneficiary Name:</strong> {bankDetails.beneficiaryName}</p>
          <p className="mt-1"><strong>Reference:</strong> {bankDetails.reference}</p>
        </div>
      ),
    },
    binance: {
      title: "Pay with Binance (USDT)",
      content: (
        <div className="text-gray-700 space-y-2 text-sm">
          <p><strong>Cryptocurrency:</strong> {binanceDetails.currency}</p>
          <p><strong>Network:</strong> {binanceDetails.network}</p>
          <p className="break-all"><strong>Wallet Address:</strong> {binanceDetails.walletAddress}</p>
          <p className="mt-3 text-xs text-red-600 font-medium">
            <strong>Important:</strong> Ensure you select the correct network. Sending to the wrong network may result in loss of funds.
          </p>
          {/* <img src="/images/binance-qr.png" alt="USDT TRC20 QR Code" className="mx-auto mt-3 w-32 h-32 border rounded-md" /> */}
          <p className="text-center mt-2 text-xs text-gray-500">(QR Code placeholder)</p>
        </div>
      ),
    },
  };

  const currentModal = modalContent[type];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 transition-opacity duration-300 ease-in-out">
      <div className="bg-white rounded-xl shadow-2xl p-6 sm:p-8 w-full max-w-md relative transform transition-all duration-300 ease-in-out scale-95 opacity-0 animate-modalFadeInScaleUp">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 transition-colors"
          aria-label="Close modal"
        >
          <XMarkIcon className="w-6 h-6" />
        </button>
        <h3 className="text-xl font-semibold text-gray-800 mb-5 text-center">{currentModal?.title || "Payment Information"}</h3>
        <div>{currentModal?.content}</div>
      </div>
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
  // IMPORTANT: Replace these with your actual Tailwind CSS color class names.
  const primaryColorClass = "primary"; // e.g., 'blue-600'
  const primaryColorHoverClass = "orange-700"; // e.g., 'blue-700'
  const primaryTextColorClass = "text-orange-600"; // e.g., 'text-blue-600'
  const primaryBorderColorClass = "border-orange-600"; // e.g., 'border-blue-500'
  const primaryBgAccentClass = "bg-orange-60"; // For light backgrounds

  const heroGradient = `linear-gradient(to right, rgba(234,179,8,0.7), rgba(249,115,22,0.8))`; // Adjusted to example orange shades
  const rescheduleLink = "https://scheduler.zoom.us/espanolconvic/class-booking";

  useEffect(() => {
    if (currentUser) {
      const fetchStudentData = async () => {
        setLoading(true);
        try {
          const studentRef = doc(db, "students", currentUser.uid);
          const docSnap = await getDoc(studentRef);
          if (docSnap.exists()) {
            // Ensure lastName and city are part of your Firestore student document
            setStudentData({
              firstName: "Loading...", // Placeholder while data loads or if not present
              lastName: "",
              city: "",
              ...docSnap.data()
            });
          } else {
            console.log("No student data found for UID:", currentUser.uid);
            setStudentData(null); // Explicitly set to null if not found
          }
        } catch (error) {
          console.error("Error fetching student data:", error);
          setStudentData(null);
        } finally {
          setLoading(false);
        }
      };
      fetchStudentData();
    } else {
       setLoading(false); // Not logged in, stop loading
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

  const ActionButton = ({ href, onClick, icon: Icon, children, target, rel, additionalClassName = "", isDisabled = false }) => (
    <a
      href={isDisabled ? "#" : href}
      onClick={isDisabled ? (e) => e.preventDefault() : onClick}
      target={isDisabled ? undefined : target}
      rel={isDisabled ? undefined : rel}
      className={`bg-${primaryColorClass} text-white px-4 py-3 rounded-xl font-medium shadow-md hover:bg-${primaryColorHoverClass} 
                  transition-all duration-200 ease-in-out flex items-center space-x-2.5 justify-center text-sm 
                  hover:shadow-lg transform hover:-translate-y-px
                  ${isDisabled ? '!bg-slate-300 !text-slate-500 cursor-not-allowed hover:!bg-slate-300 !shadow-none hover:transform-none' : ''}
                  ${additionalClassName}`}
    >
      {Icon && <Icon className="w-5 h-5" />}
      <span>{children}</span>
    </a>
  );

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="flex flex-col justify-center items-center min-h-screen bg-slate-50">
          <div className={`animate-spin rounded-full h-14 w-14 border-t-4 border-b-4 ${primaryBorderColorClass} mb-4`}></div>
          <p className="text-lg text-slate-600 font-medium">Loading your student panel...</p>
        </div>
      </>
    );
  }

  return (
    <ProtectedRoute>
      <Helmet>
        <link rel="icon" href="/images/favicon.png" type="image/png" />
        <title>Student Panel | Spanish Fluency School</title>
      </Helmet>
      <Navbar />
      
      <div
        className="w-full h-52 md:h-64"
        style={{
          backgroundImage: `${heroGradient}, url('/images/dashboard-image.png')`, // Ensure dashboard-image.png is inspiring
          backgroundBlendMode: "multiply",
          backgroundSize: "cover",
          backgroundPosition: "center 70%", // Adjust as needed
        }}
      ></div>

      <main className="bg-slate-50 min-h-screen pb-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-24 md:-mt-32">
          {/* Welcome Header Card */}
          <div className={`bg-white ${primaryBgAccentClass} p-6 sm:p-8 rounded-2xl shadow-lg mb-8 text-center relative overflow-hidden`}>
            {/* Optional: decorative elements inspired by image */}
            {/* <div className="absolute -top-10 -right-10 w-32 h-32 bg-orange-100 rounded-full opacity-50"></div> */}
            {studentData ? (
              <>
                <h1 className="text-2xl sm:text-3xl font-bold text-slate-800">
                  ¡Hola, {studentData.firstName}!
                </h1>
                <p className="text-md text-slate-600 mt-1.5">Welcome to your student panel.</p>
              </>
            ) : (
              <p className="text-lg text-red-500 font-semibold">Could not load your information. Please refresh or contact support.</p>
            )}
          </div>

          {/* Student Info & Schedule Cards */}
          {studentData && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              {/* Personal Info Card */}
              <div className="lg:col-span-1 bg-white p-6 rounded-2xl shadow-lg">
                <div className="flex items-center mb-3">
                  <UserCircleIcon className={`w-7 h-7 ${primaryTextColorClass} mr-3`} />
                  <h2 className="text-lg font-semibold text-slate-700">Personal Info</h2>
                </div>
                <div className="space-y-1.5 text-sm text-slate-600">
                  <p><strong>Name:</strong> {studentData.firstName} {studentData.lastName || ""}</p>
                  <p><strong>City:</strong> {studentData.city || "Not Set"}</p>
                  <p><strong>Plan:</strong> {studentData.plan || "Not Set"}</p>
                </div>
              </div>

              {/* Weekly Schedule Card */}
              <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-lg">
                <div className="flex items-center mb-3">
                  <CalendarDaysIcon className={`w-7 h-7 ${primaryTextColorClass} mr-3`} />
                  <h2 className="text-lg font-semibold text-slate-700">Weekly Schedule</h2>
                </div>
                <p className="text-sm text-slate-600 leading-relaxed mb-3">
                  {studentData.schedule && studentData.schedule.length > 0
                    ? studentData.schedule.join(" • ")
                    : "Your schedule is not set yet."}
                </p>
                {studentData.schedule && studentData.schedule.length > 0 && (
                  <div className="mt-3 pt-3 border-t border-slate-200 text-right">
                    <a
                      href={rescheduleLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`inline-flex items-center space-x-1.5 px-3.5 py-2 border border-transparent text-xs font-medium rounded-lg shadow-sm text-white bg-sky-500 hover:bg-sky-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-400 transition-colors`}
                    >
                      <ArrowPathIcon className="w-4 h-4" />
                      <span>Reschedule Class</span>
                    </a>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Action Buttons Grid */}
          {studentData && (
             <div className="bg-white p-5 rounded-2xl shadow-lg mb-8">
               <h3 className="text-lg font-semibold text-slate-700 mb-4 px-1">Quick Actions</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                    <ActionButton 
                        icon={VideoCameraIcon}
                        href={studentData.zoomLink}
                        target="_blank" rel="noopener noreferrer"
                        isDisabled={!studentData.zoomLink}
                    >
                        Join Zoom
                    </ActionButton>
                    <ActionButton 
                        icon={FolderIcon}
                        href={studentData.folderLink}
                        target="_blank" rel="noopener noreferrer"
                        isDisabled={!studentData.folderLink}
                    >
                        Drive Folder
                    </ActionButton>
                    <ActionButton 
                        icon={BookOpenIcon}
                        href={studentData.readingExercisesLink}
                        target="_blank" rel="noopener noreferrer"
                        isDisabled={!studentData.readingExercisesLink}
                    >
                        Reading
                    </ActionButton>
                    <ActionButton 
                        icon={LightBulbIcon}
                        isDisabled={true}
                    >
                        Learning Hub <span className="text-xs opacity-80">(Soon)</span>
                    </ActionButton>
                    <ActionButton 
                        icon={Cog6ToothIcon}
                        onClick={() => navigate("/account")}
                    >
                        Settings
                    </ActionButton>
                </div>
            </div>
          )}
          
          {/* Payment Section Card */}
          <div className="flex justify-center">
            <div className="bg-white p-6 sm:p-7 rounded-2xl shadow-lg w-full max-w-lg text-center">
              <h2 className="text-lg font-semibold text-slate-700 mb-3">Manage Subscription</h2>
              <div ref={paymentDropdownRef} className="relative inline-block text-left w-full sm:w-auto">
                <button
                  type="button"
                  className={`inline-flex items-center justify-center w-full sm:w-auto rounded-lg shadow-md px-5 py-2.5 bg-green-500 text-white text-sm font-medium hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-400 transition-all duration-150 ease-in-out transform hover:scale-105`}
                  onClick={() => setIsPaymentDropdownOpen(!isPaymentDropdownOpen)}
                >
                  <CreditCardIcon className="w-5 h-5 mr-2" />
                  Make a Payment
                  <ChevronDownIcon className={`ml-2 h-4 w-4 transition-transform duration-200 ${isPaymentDropdownOpen ? "rotate-180" : ""}`} />
                </button>
                {isPaymentDropdownOpen && (
                  <div className="absolute left-1/2 -translate-x-1/2 sm:left-0 sm:translate-x-0 mt-2 w-56 origin-top rounded-md shadow-xl bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-20 animate-dropdownFadeIn">
                    <div className="py-1">
                      {['paypal', 'bank', 'binance'].map((type) => (
                        <button
                          key={type}
                          onClick={() => handlePaymentOptionClick(type)}
                          className="block w-full text-left px-4 py-2.5 text-xs text-slate-700 hover:bg-slate-100 hover:text-slate-900 transition-colors"
                        >
                          {type.charAt(0).toUpperCase() + type.slice(1).replace('bank', 'Bank Transfer').replace('binance', 'Binance (USDT)')}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      <PaymentModal 
        isOpen={!!activeModal} 
        onClose={() => setActiveModal(null)} 
        type={activeModal} 
      />
      <style jsx global>{`
        @keyframes dropdownFadeIn {
          from { opacity: 0; transform: translateY(-10px) scale(0.95); }
          to { opacity: 1; transform: translateY(0) scale(1); }
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