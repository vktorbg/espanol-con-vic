import React from "react";
import { Link } from "gatsby";
import Navbar from "../components/Navbar";

const allPlans = [
  {
    title: "Basic",
    price: "$5",
    description: "Support without classes. Access to exclusive content only.",
    icon: "https://img.icons8.com/fluency/96/000000/guest-male.png",
    features: ["Exclusive content access"],
  },
  {
    title: "Keep in Touch",
    newPrice: 60,
    frequency: "Every month",
    icon: "https://img.icons8.com/color/96/000000/communication.png",
    features: [
      "Save 25% off",
      "1 conversation per week",
      "Weekly progress report (beta)",
      "Access to exclusive content",
    ],
  },
  {
    title: "Confidence",
    newPrice: 120,
    frequency: "Every month",
    // New icon for Confidence
    icon: "https://img.icons8.com/keek/100/cool.png",
    features: [
      "Save 25% off",
      "2 sessions per week",
      "Weekly progress report (beta)",
      "Access to exclusive content",
    ],
  },
  {
    title: "Fluency Plan",
    newPrice: 220,
    frequency: "Every month",
    icon: "https://img.icons8.com/color/96/000000/graduation-cap.png",
    features: [
      "Save 20% off",
      "4 sessions per week",
      "Weekly progress report (beta)",
      "Access to exclusive content",
    ],
  },
  {
    title: "Custom Plan",
    description: "Tailor-made for your needs. Contact me for a custom plan.",
    icon: "https://img.icons8.com/color/96/000000/handshake.png",
    features: ["Personalized classes", "Flexible scheduling", "Tailored content"],
    custom: true,
  },
];

const PlansPage = () => {
  // Separate standard plans (with newPrice) from extras (Basic and Custom)
  const standardPlans = allPlans.filter(plan => plan.newPrice !== undefined);
  const otherPlans = allPlans.filter(plan => plan.newPrice === undefined);

  return (
    <>
      <Navbar />

      {/* Top CTA Section */}
      <section
        className="py-10 text-white text-center relative"
        style={{
          backgroundImage: "url('/images/hero-background.jpeg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="relative z-10 px-4">
          <h2 className="text-3xl font-bold">Spanish Lesson with Vic</h2>
          <p className="mt-4 text-lg">
            Improve your confidence and achieve fluency.
          </p>
          <Link to="/contact">
            <button className="mt-6 bg-white text-primary px-6 py-3 rounded-md font-semibold shadow-md hover:bg-gray-100 transition">
              Book a Class
            </button>
          </Link>
        </div>
      </section>

      <div className="bg-secondary min-h-screen py-10">
        <div className="max-w-6xl mx-auto text-center px-4">
          <h1 className="text-4xl font-bold text-primary">Choose Your Plan</h1>
          <p className="mt-4 text-gray-700">
            Select the plan that works best for you and start learning today!
          </p>

          {/* Standard Plans */}
          <div className="mt-10 grid gap-6 sm:grid-cols-1 md:grid-cols-3 justify-items-center">
            {standardPlans.map((plan, index) => (
              <div
                key={index}
                className="bg-white shadow-lg rounded-lg p-6 text-center hover:shadow-xl transition w-full max-w-sm"
              >
                {plan.icon && (
                  <img
                    src={plan.icon}
                    alt={`${plan.title} icon`}
                    className="mx-auto mb-4 h-16 w-16"
                  />
                )}
                <h2 className="text-2xl font-semibold text-gray-800">
                  {plan.title}
                </h2>
                {/* Price Section */}
                <div className="mt-4">
                  <p className="text-3xl text-primary font-extrabold">
                    ${plan.newPrice}
                  </p>
                  {plan.frequency && (
                    <p className="text-sm text-gray-600">{plan.frequency}</p>
                  )}
                </div>
                {/* Features */}
                {plan.features && (
                  <ul className="mt-4 space-y-2 text-gray-600">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-center justify-center">
                        ✅ {feature}
                      </li>
                    ))}
                  </ul>
                )}
                <div className="mt-6">
                  <button className="bg-primary text-white px-5 py-2 rounded-lg shadow-md hover:bg-orange-500 transition">
                    Select Plan
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Other Plans (Basic and Custom) */}
          <div className="mt-16 grid gap-6 sm:grid-cols-1 md:grid-cols-2 justify-items-center">
            {otherPlans.map((plan, index) => (
              <div
                key={index}
                className="bg-white border-2 border-dashed border-primary shadow-lg rounded-lg p-6 text-center hover:shadow-xl transition w-full max-w-sm"
              >
                {plan.icon && (
                  <img
                    src={plan.icon}
                    alt={`${plan.title} icon`}
                    className="mx-auto mb-4 h-16 w-16"
                  />
                )}
                <h2 className="text-2xl font-semibold text-gray-800">
                  {plan.title}
                </h2>
                {plan.price && (
                  <div className="mt-4">
                    <p className="text-3xl text-primary font-extrabold">
                      {plan.price}
                    </p>
                  </div>
                )}
                {plan.description && (
                  <p className="text-gray-600 mt-4">{plan.description}</p>
                )}
                {plan.features && (
                  <ul className="mt-4 space-y-2 text-gray-600">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-center justify-center">
                        ✅ {feature}
                      </li>
                    ))}
                  </ul>
                )}
                <div className="mt-6">
                  {plan.custom ? (
                    <button className="bg-primary text-white px-5 py-2 rounded-lg shadow-md hover:bg-orange-500 transition">
                      Contact Me
                    </button>
                  ) : (
                    <button className="bg-primary text-white px-5 py-2 rounded-lg shadow-md hover:bg-orange-500 transition">
                      Select Plan
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          <p className="mt-10 text-gray-600">
            Need a custom plan?{" "}
            <Link to="/contact" className="text-primary font-bold">
              Contact me
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default PlansPage;
