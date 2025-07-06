import React, { useState } from "react";
import Header from "../components/Landingpage/Header";
import HeroSection from "../components/Landingpage/HeroSection";
import StatsSection from "../components/Landingpage/StatsSection";
import SearchFilterSection from "../components/Landingpage/SearchFilterSection";
import PostsSection from "../components/Landingpage/PostsSection";
import NewsletterSection from "../components/Landingpage/NewsletterSection";
import Footer from "../components/Landingpage/Footer";
import BlogPostsPage from "./BlogPostsPage";

const blogPostData = [
  {
    _id: "64e7fabc0c96e2c5e153aaa1",
    title: "React Insights and Trends",
    excerpt:
      "Discover the latest React patterns, hooks, and best practices that are shaping modern web development.",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    author: "Sarah Johnson",
    date: "2025-07-05T09:31:00.000Z",
    category: "React",
    readTime: "5 min read",
    image:
      "https://www.tatvasoft.com/blog/wp-content/uploads/2022/07/Why-Use-React-1280x720.jpg",
  },
  {
    _id: "64e7fabc0c96e2c5e153aaa2",
    title: "Tech Insights and Trends",
    excerpt:
      "Stay ahead of the curve with cutting-edge technology trends and industry insights.",
    content:
      "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
    author: "Michael Chen",
    date: "2025-07-05T09:31:00.000Z",
    category: "Tech",
    readTime: "7 min read",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNZc2qhPEexG-Pg9op2n9lsRVfyyJ2PBVdDQ&s",
  },
  {
    _id: "64e7fabc0c96e2c5e153aaa3",
    title: "Entertainment Insights and Trends",
    excerpt:
      "Explore the evolving landscape of entertainment and media in the digital age.",
    content:
      "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore.",
    author: "Emma Davis",
    date: "2025-07-05T09:31:00.000Z",
    category: "Entertainment",
    readTime: "4 min read",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZbS5Jaf5nJ-F9NVbKGkJwb-OM59DdzPgCyQ&s",
  },
  {
    _id: "64e7fabc0c96e2c5e153aaa4",
    title: "Movies Insights and Trends",
    excerpt:
      "Dive into the world of cinema with reviews, analysis, and industry trends.",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    author: "David Wilson",
    date: "2025-07-05T09:31:00.000Z",
    category: "Movies",
    readTime: "6 min read",
    image:
      "https://www.wondermind.com/wp-content/uploads/2024/09/20-Feel-Good-Movies-People-Swear-By-For-Your-Next-Bad-Day.jpg?w=960",
  },
  {
    _id: "64e7fabc0c96e2c5e153aaa5",
    title: "Knowledge Insights and Trends",
    excerpt:
      "Expand your horizons with curated knowledge and educational content.",
    content:
      "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    author: "Lisa Anderson",
    date: "2025-07-05T09:31:00.000Z",
    category: "Knowledge",
    readTime: "8 min read",
    image:
      "https://www.ispringsolutions.com/blog/wp-content/uploads/2023/04/Cover.jpg",
  },
  {
    _id: "64e7fabc0c96e2c5e153aaa6",
    title: "Health Insights and Trends",
    excerpt:
      "Your guide to wellness, fitness, and healthy living in the modern world.",
    content: "Nisi ut aliquip ex ea commodo consequat.",
    author: "Dr. James Miller",
    date: "2025-07-05T09:31:00.000Z",
    category: "Health",
    readTime: "5 min read",
    image:
      "https://www.theunconventionaldietitian.com/wp-content/uploads/health-word-cloud-123rf.jpg",
  },
];

const LandingPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const token = localStorage.getItem("token");
  const isLogin = !!token; // cleaner boolean check
  const categories = [
    "All",
    "React",
    "Tech",
    "Entertainment",
    "Movies",
    "Knowledge",
    "Health",
  ];

  const filteredPosts =
    selectedCategory === "All"
      ? blogPostData
      : blogPostData.filter((post) => post.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100">
      <Header />

      {isLogin ? (
        <BlogPostsPage />
      ) : (
        <>
          <HeroSection />
          <SearchFilterSection
            categories={categories}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />
          <PostsSection posts={filteredPosts} />
          <StatsSection />
          <NewsletterSection />
        </>
      )}
      <Footer />
    </div>
  );
};

export default LandingPage;
