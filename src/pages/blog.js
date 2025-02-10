import React from "react";
import { Link } from "gatsby";
import Navbar from "../components/Navbar";

const posts = [
  {
    title: "Mastering the Spanish Subjunctive",
    date: "January 15, 2024",
    description: "A deep dive into the complexities of the Spanish subjunctive mood.",
    image: "https://source.unsplash.com/400x250/?spanish,book",
  },
  {
    title: "5 Common Mistakes English Speakers Make in Spanish",
    date: "February 2, 2024",
    description: "Avoid these common pitfalls when learning Spanish as an English speaker.",
    image: "https://source.unsplash.com/400x250/?language,learning",
  },
  {
    title: "How to Improve Your Spanish Listening Skills",
    date: "March 10, 2024",
    description: "Practical techniques to understand native Spanish speakers better.",
    image: "https://source.unsplash.com/400x250/?podcast,headphones",
  },
];

const BlogPage = () => {
  return (
    <>
      <Navbar />
      <div className="bg-secondary min-h-screen py-10">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl font-bold text-primary">Blog</h1>
          <p className="mt-4 text-gray-700">Tips, lessons, and insights to help you master Spanish.</p>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {posts.map((post, index) => (
              <div key={index} className="bg-white shadow-lg rounded-lg p-4">
                <img src={post.image} alt={post.title} className="rounded-lg w-full h-40 object-cover" />
                <h2 className="text-xl font-semibold text-gray-800 mt-3">{post.title}</h2>
                <p className="text-gray-500 text-sm">{post.date}</p>
                <p className="text-gray-600 mt-2">{post.description}</p>
                <Link to={`/blog/${index}`}>
                  <button className="mt-4 bg-primary text-white px-4 py-2 rounded-lg shadow-md hover:bg-orange-500 transition">
                    Read More
                  </button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogPage;
