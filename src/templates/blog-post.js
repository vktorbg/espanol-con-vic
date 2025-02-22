import React from "react";
import { graphql } from "gatsby";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";

const BlogPost = ({ data }) => {
  const post = data.contentfulBlogPost;
  return (
    <>
      <Navbar />
      <article className="max-w-4xl mx-auto p-6">
        <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
        <p className="text-gray-600 mb-4">By {post.author}</p>
        <div className="prose">
          {documentToReactComponents(JSON.parse(post.content.raw))}
        </div>
      </article>
      <Footer />
    </>
  );
};

export const query = graphql`
  query($slug: String!) {
    contentfulBlogPost(slug: { eq: $slug }) {
      title
      author
      content {
        raw
      }
    }
  }
`;

export default BlogPost;
