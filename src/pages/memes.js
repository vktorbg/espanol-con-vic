import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const memes = [
  { id: 1, image: "https://source.unsplash.com/random/400x300/?meme", link: "https://www.tiktok.com" },
  { id: 2, image: "https://source.unsplash.com/random/400x300/?funny", link: "https://www.instagram.com" },
  // add more meme items as needed
];

const MemesPage = () => {
  return (
    <>
      <Navbar />
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-4xl font-bold text-orange-500 mb-6 text-center">Memes</h1>
          <div className="grid gap-8 md:grid-cols-2">
            {memes.map((meme) => (
              <a key={meme.id} href={meme.link} target="_blank" rel="noopener noreferrer">
                <div className="bg-gray-50 p-4 rounded-md shadow-md hover:shadow-xl transition">
                  <img src={meme.image} alt={`Meme ${meme.id}`} className="w-full h-60 object-cover rounded-md" />
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default MemesPage;
