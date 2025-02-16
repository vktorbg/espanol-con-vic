import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { db, doc, getDoc } from "../firebase";
import { graphql, useStaticQuery } from "gatsby";
import Navbar from "../components/Navbar";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"; // ✅ Renders rich text content

const BlogPage = () => {
  const { currentUser } = useAuth();
  const [membership, setMembership] = useState("Basic");

  // ✅ Fetch membership level from Firestore
  useEffect(() => {
    if (currentUser && db) {
      const fetchMembership = async () => {
        try {
          const userRef = doc(db, "users", currentUser.uid);
          const userSnap = await getDoc(userRef);
          if (userSnap.exists()) {
            setMembership(userSnap.data().membership || "Basic");
          }
        } catch (error) {
          console.error("❌ Firebase error fetching membership:", error);
        }
      };
      fetchMembership();
    }
  }, [currentUser]);

  // ✅ Fetch blog posts from Contentful
  const data = useStaticQuery(graphql`
    query {
      allContentfulBlogPost {
        nodes {
          title
          slug
          content {
            raw
          }
          featuredImage {
            file {
              url
            }
          }
          isVipOnly
        }
      }
    }
  `);

  return (
    <>
      <Navbar />
      <div className="max-w-4xl mx-auto py-10">
        <h1 className="text-3xl font-bold">Blog</h1>
        <ul className="mt-6 space-y-4">
          {data.allContentfulBlogPost.nodes.map((post, index) => {
            if (post.isVipOnly && membership !== "VIP") {
              return null; // ✅ Hide VIP posts from Basic users
            }

            return (
              <li key={index} className="p-4 border-b">
                {post.featuredImage && (
                  <img 
                    src={post.featuredImage.file.url} 
                    alt={post.title} 
                    className="w-full h-48 object-cover rounded-lg mb-4"
                  />
                )}
                <h2 className="text-xl font-semibold">{post.title}</h2>
                <div className="text-gray-600 mt-2">
                  {documentToReactComponents(JSON.parse(post.content.raw))} {/* ✅ Render Rich Text */}
                </div>
              </li>
            );
          })}
        </ul>

        {membership !== "VIP" && (
          <p className="mt-6 text-gray-600">
            Some content is restricted to VIP members. <strong>Upgrade to VIP to access all posts.</strong>
          </p>
        )}
      </div>
    </>
  );
};

export default BlogPage;
