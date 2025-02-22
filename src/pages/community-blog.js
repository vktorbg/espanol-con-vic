import React from "react";
import { graphql, Link } from "gatsby";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const CommunityBlog = ({ data }) => {
  const posts = data?.allContentfulBlogPost?.nodes || [];

  return (
    <>
      <Navbar />
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-4xl font-bold text-orange-500 mb-6 text-center">
            Community Blog
          </h1>
          <div className="grid gap-8 md:grid-cols-2">
            {posts.length > 0 ? (
              posts.map((post) => (
                <div
                  key={post.id}
                  className="bg-gray-50 p-6 rounded-md shadow-md hover:shadow-xl transition"
                >
                  <h2 className="text-2xl font-bold mb-2 text-orange-500">
                    {post.title}
                  </h2>
                  <p className="text-gray-600 mb-4">
                    {post.excerpt.excerpt}
                  </p>
                  <p className="text-sm text-gray-500">By {post.author}</p>
                  <Link
                    to={`/blog/${post.slug}`}
                    className="text-orange-500 font-bold hover:underline"
                  >
                    Read More &rarr;
                  </Link>
                </div>
              ))
            ) : (
              <p className="text-gray-600">No posts available.</p>
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
    allContentfulBlogPost(sort: { createdAt: DESC }) {
      nodes {
        id
        title
        slug
        author
        isVipOnly
        excerpt {
          excerpt
        }
        content {
          raw
        }
        featuredImage {
          file {
            url
          }
        }
      }
    }
  }
`;

export default CommunityBlog;
