import React from "react";
import { useNavigate } from "react-router-dom";

const HeroSection=()=> {
    const navigate = useNavigate()
  return (
    <section className="relative py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto text-center">
        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
          Welcome to <span className="text-blue-600">BlogHub</span>
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8 leading-relaxed">
          Discover insights, trends, and knowledge across technology,
          entertainment, health, and more.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <button
            className="bg-blue-600 text-white px-8 py-4 rounded-xl hover:bg-blue-700 text-lg shadow-lg"
            onClick={() => navigate("/register")}
          >
            Join Now
          </button>
          <button
            className="border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-xl hover:bg-blue-600 hover:text-white text-lg"
            onClick={() => navigate("/login")}
          >
            Explore More
          </button>
        </div>
      </div>
    </section>
  );
}
export default HeroSection;
