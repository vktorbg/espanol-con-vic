// /src/data/plansData.js
const allPlans = [
  {
    title: "Confidence",
    newPrice: 120,
    frequency: "Every month",
    icon: "https://img.icons8.com/fluency/96/000000/teamwork.png",
    features: ["Save 25% off", "2 hours per week", "Monthly progress report (beta)"],
  },
  {
    title: "Fluency Plan",
    newPrice: 220,
    frequency: "Every month",
    icon: "https://img.icons8.com/fluency/96/000000/graduation-cap.png",
    features: ["Save 30% off", "4 hours per week", "Monthly progress report (beta)"],
  },
  {
    title: "Customizable Plan", // Updated title here
    icon: "https://img.icons8.com/fluency/96/000000/handshake.png",
    description: "Tailor-made for your needs. Contact me for a custom plan.",
    features: ["Personalized classes", "Flexible scheduling", "Tailored content"],
    custom: true,
  },
];

module.exports = allPlans;

