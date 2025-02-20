import React from "react";
import { Link } from "gatsby";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

// Sample data for the Learning Hub categories
const categories = [
  {
    title: "Grammar",
    description: "Dive into lessons, examples, and exercises to master Spanish grammar.",
    icon: "https://img.icons8.com/external-flaticons-flat-flat-icons/64/external-resume-and-cv-recruitment-agency-flaticons-flat-flat-icons-3.png",  // Adjust icon URL if needed
    link: "/grammar",
  },
  {
    title: "Quizzes",
    description: "Test your knowledge with interactive quizzes (powered by Quizizz).",
    icon: "https://img.icons8.com/bubbles/100/checklist.png",
    link: "/quizzes",
  },
  {
    title: "Vocabulary",
    description: "Learn new words every day and explore topics by vocabulary themes.",
    icon: "https://img.icons8.com/dusk/64/mind-map--v1.png", // Adjust icon URL if needed
    link: "/vocabulary",
  },
  {
    title: "Memes",
    description: "Have fun with language-themed memes and share a laugh.",
    icon: "https://img.icons8.com/color/48/000000/happy.png", // Adjust icon URL if needed
    link: "/memes",
  },
  {
    title: "Community Blog",
    description: "Join the conversation and read inspiring posts from our community.",
    icon: "https://img.icons8.com/color/48/000000/blog.png", // Adjust icon URL if needed
    link: "/community-blog",
  },
];

const LearningHub = () => {
  return (
    <>
      <Navbar />
      <section className="py-16 bg-secondary">
        <div className="max-w-6xl mx-auto text-center px-4">
          <h1 className="text-4xl font-bold text-gray-800 mb-10">
            Learning Hub
          </h1>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {categories.map((category, index) => (
              <Link to={category.link} key={index}>
                <motion.div
                  className="bg-white p-6 rounded-md shadow-md hover:shadow-xl transition transform"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <img
                    src={category.icon}
                    alt={`${category.title} Icon`}
                    className="mx-auto mb-4 h-12 w-12"
                  />
                  <h2 className="text-xl font-bold text-orange-500 mb-2">
                    {category.title}
                  </h2>
                  <p className="text-gray-600 text-sm">
                    {category.description}
                  </p>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default LearningHub;
