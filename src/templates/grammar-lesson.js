import React from "react";
import { graphql } from "gatsby";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const GrammarLesson = ({ data }) => {
  const lesson = data.contentfulGrammarLesson;
  return (
    <>
      <Navbar />
      <article className="max-w-4xl mx-auto p-6">
        <h1 className="text-4xl font-bold mb-4">{lesson.title}</h1>
        <div
          className="prose"
          dangerouslySetInnerHTML={{
            __html: lesson.content.childMarkdownRemark.html,
          }}
        />
      </article>
      <Footer />
    </>
  );
};

export const query = graphql`
  query($slug: String!) {
    contentfulGrammarLesson(slug: { eq: $slug }) {
      title
      content {
        raw
      }
    }
  }
`;

export default GrammarLesson;
