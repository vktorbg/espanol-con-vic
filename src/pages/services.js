// services.js
import React from "react";
import { Link } from "gatsby";
import Navbar from "../components/Navbar";

const services = [
  {
    title: "Speak Spanish Naturally",
    description: "Build your confidence with real-life conversations. Together, we'll practice the Spanish you need to travel, work, or connect with others — in a fun and relaxed environment.",
    icon: "🗣️",
  },
  {
    title: "Master the Grammar",
    description: "Unlock the structure behind the language. I’ll guide you through Spanish grammar in a simple, clear way, always linked to real communication.",
    icon: "📖",
  },
  {
    title: "Personalized Feedback",
    description: "Every lesson includes personalized tips and corrections. You'll receive progress reports designed to help you move forward quickly and confidently.",
    icon: "✍️",
  },
  {
    title: "Learn on Your Schedule",
    description: "Whether you want a relaxed pace or intensive practice, we'll design a learning plan that fits your lifestyle.",
    icon: "📅",
  },
];

const testimonials = [
  {
    quote: "Vic's lessons gave me the confidence to finally speak Spanish naturally. Highly recommend!",
    name: "— Emma T., Canada",
  },
  {
    quote: "I love how the classes combine conversation and grammar. It feels so easy to learn!",
    name: "— Lucas M., Australia",
  },
  {
    quote: "Thanks to Vic, I finally feel comfortable speaking Spanish at work.",
    name: "— Sarah P., USA",
  },
];

const ServicesPage = () => {
  return (
    <>
      <Navbar />
      {/* Hero Section */}
      <div className="bg-primary text-white py-20 px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold mb-6">
            Learn Spanish with Confidence and Joy
          </h1>
          <p className="text-lg mb-8">
            Personalized online Spanish lessons to help you speak naturally and connect deeply.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link to="/plans">
              <button className="bg-white text-primary px-8 py-4 rounded-full font-semibold text-lg shadow-lg hover:bg-gray-200 transition">
                View Plans
              </button>
            </Link>
            <Link to="/trial">
              <button className="bg-accent-800 text-white px-8 py-4 rounded-full font-semibold text-lg shadow-lg hover:bg-orange-600 transition">
                Book a Free Trial
              </button>
            </Link>
          </div>
          {/* Optional illustration or image */}
          {/* <img src="/your-image.png" alt="Learning Spanish" className="mx-auto mt-12 max-w-md" /> */}
        </div>
      </div>

      {/* Services Section */}
      <div className="bg-secondary py-20">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-primary mb-12">
            What I Offer
          </h2>
          <div className="grid gap-8 md:grid-cols-2">
            {services.map((service, index) => (
              <div key={index} className="bg-white shadow-md rounded-xl p-8 flex flex-col items-center text-center hover:shadow-xl transition">
                <div className="text-6xl mb-4">{service.icon}</div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="bg-primary text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-12">
            What My Students Say
          </h2>
          <div className="space-y-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="italic text-lg">
                “{testimonial.quote}”
                <p className="mt-2 font-semibold">{testimonial.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Final Call to Action */}
      <div className="bg-secondary py-20 px-4 text-center">
        <h2 className="text-3xl font-bold text-primary mb-6">
          Ready to Start Your Journey?
        </h2>
        <p className="text-lg text-gray-700 mb-8">
          Let’s make your Spanish dreams a reality. Book a free trial today!
        </p>
        <Link to="/plans">
          <button className="bg-secondary text-primary px-10 py-4 rounded-full font-semibold text-lg shadow-lg hover:bg-orange-600 transition">
            Start Now
          </button>
        </Link>
      </div>
    </>
  );
};

export default ServicesPage;
