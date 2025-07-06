import React, { useState, useEffect } from "react";
import ProfileCompletion from "../components/Profilepage/ProfileCompletion";
import QuickActions from "../components/Profilepage/QuickActions";
import ProfileStats from "../components/Profilepage/ProfileStats";
import ProfileCard from "../components/Profilepage/ProfileCard";

import { LucideArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import ProfileHeader from "../components/Profilepage/ProfileHeader";
import { useAuth } from "../context/AuthContext";

const ProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const {user} = useAuth();
  console.log(user);
  const [profileData, setProfileData] = useState({
    username: user.name,
    email: user.email,
    fullName: user.name,
    bio: "Full-stack developer passionate about creating amazing web experiences. Love coding, coffee, and continuous learning.",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    website: "https://johndoe.dev",
    joinDate: "2023-01-15",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
  });
  const [editData, setEditData] = useState({ ...profileData });
  const [stats, setStats] = useState({
    postsCount: 42,
    followersCount: 1234,
    followingCount: 567,
  });

  const navigate = useNavigate();

  useEffect(() => {
    console.log("Loading user profile...");
    // Here you could fetch actual profile data from API
  }, []);

  const handleEdit = () => {
    setIsEditing(true);
    setEditData({ ...profileData });
  };

  const handleSave = () => {
    setProfileData({ ...editData });
    setIsEditing(false);
    console.log("Profile updated:", editData);
    // Typically make PUT/PATCH API request here
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditData({ ...profileData });
  };

  const handleInputChange = (field, value) => {
    setEditData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleAvatarUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setEditData((prev) => ({
          ...prev,
          avatar: event.target.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 relative">
      <div className="backbtn" onClick={() => navigate("/")}>
        <LucideArrowLeft />
      </div>
      <div className="floating-elements"></div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <ProfileHeader />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main profile & form */}
          <div className="lg:col-span-2">
            <ProfileCard
              isEditing={isEditing}
              profileData={profileData}
              editData={editData}
              onChange={handleInputChange}
              onUpload={handleAvatarUpload}
              onEdit={handleEdit}
              onSave={handleSave}
              onCancel={handleCancel}
            />
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <ProfileStats
              postsCount={stats.postsCount}
              followersCount={stats.followersCount}
              followingCount={stats.followingCount}
            />
            <QuickActions />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
