import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link } from "gatsby";

const quizzes = [
  { id: 1, title: "Basic Grammar Quiz", image: "https://source.unsplash.com/random/400x300/?quiz", link: "https://quizizz.com" },
  { id: 2, title: "Vocabulary Challenge", image: "https://source.unsplash.com/random/400x300/?vocabulary", link: "https://quizizz.com" },
  // add more quizzes as needed
];

const QuizzesPage = () => {
  return (
    <>
      <Navbar />
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-4xl font-bold text-orange-500 mb-6 text-center">Quizzes</h1>
          <div className="grid gap-8 md:grid-cols-2">
            {quizzes.map((quiz) => (
              <div key={quiz.id} className="bg-gray-50 p-6 rounded-md shadow-md hover:shadow-xl transition">
                <img src={quiz.image} alt={quiz.title} className="w-full h-40 object-cover rounded-md mb-4" />
                <h2 className="text-2xl font-bold text-gray-800 mb-2">{quiz.title}</h2>
                <a href={quiz.link} target="_blank" rel="noopener noreferrer" className="text-orange-500 font-bold hover:underline">
                  Take Quiz &rarr;
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default QuizzesPage;
