import React, { useState, useEffect } from "react";
import { Edit3, Trash2, Save, X, User, Calendar, Eye, Key } from "lucide-react";
import useSWR from "swr";
import { fetchData, postData, deleteData } from "../api/ClientFunction";
import Navbar from "../components/Navbar/Navbar";
import "../styles/Dashboard.css";
import Header from "../components/Landingpage/Header";
import PostCard from "../components/PostCard/PostCard";
import { useAuth } from "../context/AuthContext";
import Spinner from "../components/Loader/Spinner";

const Dashboard = () => {
  const { data, isLoading, error, mutate } = useSWR("/posts", fetchData);
  const [posts, setPosts] = useState([]);
  const [editingPost, setEditingPost] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { user } = useAuth();
  console.log(user);

  const userData = data?.posts?.filter(
    (item) => item?.author?._id === user?._id
  );

  console.log(userData);

  useEffect(() => {
    if (data?.posts) {
      if (user?.role === "superadmin" || user?.role === "admin") {
        setPosts(data?.posts);
      } else {
        setPosts(userData);
      }
    }
  }, [data]);

  console.log(posts);
  return (
    <>
      <Header />
      <div className="main-content container mx-auto px-4 py-8">
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Manage Blog Posts
          </h2>
          {isLoading ? (
            <div className="flex justify-center items-center min-h-screen">
              <Spinner />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <PostCard key={post._id} post={post} />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
