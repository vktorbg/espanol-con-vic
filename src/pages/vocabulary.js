import React from "react";
import { graphql, Link } from "gatsby";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";

const VocabularyPage = ({ data }) => {
  const topics = data.allContentfulVocabularyTopic.nodes;
  const wordOfTheDay = data.allContentfulWordOfTheDay.nodes[0];

  return (
    <>
      <Navbar />
      <section className="py-16 bg-secondary">
        <div className="max-w-6xl mx-auto px-4">
          {/* Word of the Day */}
          <div className="bg-white p-6 rounded-md shadow-md mb-10 text-center">
            <h2 className="text-3xl font-bold text-orange-500">Word of the Day</h2>
            <p className="text-xl font-semibold text-gray-800 mt-2">{wordOfTheDay.word}</p>
            <div className="text-gray-600 mt-2">
              {documentToReactComponents(JSON.parse(wordOfTheDay.definition.raw))}
            </div>
            <p className="text-gray-500 mt-2 italic">
              Example: {wordOfTheDay.example.example}
            </p>
          </div>

          {/* Vocabulary Topics */}
          <h1 className="text-4xl font-bold text-orange-500 mb-6 text-center">Vocabulary Topics</h1>
          <div className="grid gap-8 md:grid-cols-3">
            {topics.map((topic) => (
              <Link key={topic.id} to={`/vocabulary/${topic.slug}`}>
                <div className="bg-white p-6 rounded-md shadow-md hover:shadow-xl transition">
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">{topic.topicTitle}</h2>
                  <p className="text-gray-600">{topic.description.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export const query = graphql`
  query {
    allContentfulVocabularyTopic(sort: { fields: createdAt, order: DESC }) {
      nodes {
        id
        topicTitle
        description {
          description
        }
        slug
        isVipOnly
      }
    }
    allContentfulWordOfTheDay(sort: { fields: date, order: DESC }, limit: 1) {
      nodes {
        id
        word
        definition { 
            raw
        }
        example {
          example
        }
        date(formatString: "YYYY-MM-DD")
      }
    }
  }
`;

export default VocabularyPage;
