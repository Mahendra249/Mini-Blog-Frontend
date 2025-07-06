import React from "react";
import { BookOpen } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <div className="flex items-center mb-4">
            <BookOpen className="w-8 h-8 text-blue-400 mr-2" />
            <span className="text-2xl font-bold">BlogHub</span>
          </div>
          <p className="text-gray-400">
            Your trusted source for insights and trends across technology,
            entertainment, and more.
          </p>
        </div>
        {["Categories", "Company", "Connect"].map((section, i) => (
          <div key={i}>
            <h3 className="text-lg font-semibold mb-4">{section}</h3>
            <ul className="space-y-2 text-gray-400">
              {section === "Categories" && [
                "Technology",
                "Entertainment",
                "Health",
                "Business",
              ]}
              {section === "Company" && [
                "About",
                "Contact",
                "Privacy Policy",
                "Terms of Service",
              ]}
              {section === "Connect" && [
                "Twitter",
                "LinkedIn",
                "Facebook",
                "Instagram",
              ]}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
        &copy; 2025 BlogHub. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
