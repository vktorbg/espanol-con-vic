import React, { useState } from "react";
import { graphql, Link } from "gatsby";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const GrammarPage = ({ data }) => {
  const lessons = data?.allContentfulGrammarLesson?.nodes || [];
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", "Subjuntivo", "Pronouns", "Tenses"];

  const filteredLessons =
    selectedCategory === "All"
      ? lessons
      : lessons.filter((lesson) => lesson.category === selectedCategory);

  return (
    <>
      <Navbar />
      <section className="py-16 bg-secondary">
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-4xl font-bold text-gray-800 mb-6 text-center">
            Grammar Lessons
          </h1>

          {/* Filter Bar */}
          <div className="flex justify-center space-x-4 mb-8">
            {categories.map((cat, index) => (
              <button
                key={index}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-md font-semibold transition ${
                  selectedCategory === cat
                    ? "bg-orange-500 text-white"
                    : "bg-white text-gray-700 hover:bg-orange-100"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Lessons Feed */}
          <div className="grid gap-6 md:grid-cols-2">
            {filteredLessons.length > 0 ? (
              filteredLessons.map((lesson) => (
                <div
                  key={lesson.id}
                  className="bg-white p-6 rounded-md shadow-md hover:shadow-xl transition"
                >
                  <h2 className="text-2xl font-bold text-orange-500 mb-2">
                    {lesson.title}
                  </h2>
                  <p className="text-gray-600 mb-4">
                    {lesson.excerpt.excerpt}
                  </p>
                  <Link
                    to={`/grammar/${lesson.slug}`}
                    className="text-primary font-bold hover:underline"
                  >
                    Read More &rarr;
                  </Link>
                </div>
              ))
            ) : (
              <p className="text-gray-600 text-center">
                No lessons available.
              </p>
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
    allContentfulGrammarLesson(sort: { createdAt: DESC }) {
      nodes {
        id
        title
        excerpt {
          excerpt
        }
        category
        slug
        isVipOnly
        content {
          raw
        }
        image {
          file {
            url
          }
        }
      }
    }
  }
`;

export default GrammarPage;
