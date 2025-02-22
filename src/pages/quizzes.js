import React from "react";
import { graphql } from "gatsby";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const QuizzesPage = ({ data }) => {
  const quizzes = data.allContentfulQuiz.nodes;
  return (
    <>
      <Navbar />
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-4xl font-bold text-orange-500 mb-6 text-center">Quizzes</h1>
          <div className="grid gap-8 md:grid-cols-2">
            {quizzes.length > 0 ? (
              quizzes.map((quiz) => (
                <div key={quiz.id} className="bg-gray-50 p-6 rounded-md shadow-md hover:shadow-xl transition">
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">{quiz.title}</h2>
                  {quiz.link && (
                    <a
                      href={quiz.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-orange-500 font-bold hover:underline"
                    >
                      Take Quiz &rarr;
                    </a>
                  )}
                </div>
              ))
            ) : (
              <p className="text-gray-600 text-center">No quizzes available.</p>
            )}
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export const query = graphql`
  query {
    allContentfulQuiz(sort: { fields: createdAt, order: DESC }) {
      nodes {
        id
        title
        link
      }
    }
  }
`;

export default QuizzesPage;
