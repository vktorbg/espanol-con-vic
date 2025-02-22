import React from "react";
import { graphql } from "gatsby";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Quiz = ({ data }) => {
  const quiz = data.contentfulQuiz;
  return (
    <>
      <Navbar />
      <article className="max-w-4xl mx-auto p-6">
        <h1 className="text-4xl font-bold mb-4">{quiz.title}</h1>
        <div className="prose">
          <p>{quiz.description}</p>
        </div>
        {quiz.link && (
          <a
            href={quiz.link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-orange-500 font-bold hover:underline"
          >
            Take the Quiz &rarr;
          </a>
        )}
      </article>
      <Footer />
    </>
  );
};

export const query = graphql`
  query($id: String!) {
    contentfulQuiz(id: { eq: $id }) {
      title
      description
      link
    }
  }
`;

export default Quiz;
