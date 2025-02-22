import React from "react";
import { graphql } from "gatsby";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const VocabularyTopic = ({ data }) => {
  const topic = data.contentfulVocabularyTopic;
  return (
    <>
      <Navbar />
      <article className="max-w-4xl mx-auto p-6">
        <h1 className="text-4xl font-bold mb-4">{topic.topicTitle}</h1>
        <p className="text-gray-600 mb-4">{topic.description.description}</p>
      </article>
      <Footer />
    </>
  );
};

export const query = graphql`
  query($slug: String!) {
    contentfulVocabularyTopic(slug: { eq: $slug }) {
      topicTitle
      description { 
        description 
      }
    }
  }
`;

export default VocabularyTopic;
