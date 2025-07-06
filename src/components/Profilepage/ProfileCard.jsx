import AvatarUploader from "./AvatarUploader";
import {
  Calendar,
  Mail,
  MapPin,
  Phone,
  Globe,
  Save,
  X,
  Edit3,
} from "lucide-react";
import { useState } from "react";

const ProfileCard = ({
  isEditing,
  profileData,
  editData,
  onChange,
  onUpload,
  onEdit,
  onSave,
  onCancel,
}) => (
  <div className="profile-card bg-white rounded-2xl shadow-xl p-8 border border-gray-200">
    <div className="flex flex-col sm:flex-row items-center gap-8 mb-8">
      {isEditing ? (
        <AvatarUploader avatar={editData.avatar} onUpload={onUpload} />
      ) : (
        <img
          src={profileData.avatar}
          alt="Profile"
          className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
        />
      )}
      <div className="flex-1 text-center sm:text-left">
        {isEditing ? (
          <>
            <input
              type="text"
              value={editData.fullName}
              onChange={(e) => onChange("fullName", e.target.value)}
              className="form-input text-2xl font-bold w-full"
              placeholder="Full Name"
            />
            <input
              type="text"
              value={editData.username}
              onChange={(e) => onChange("username", e.target.value)}
              className="form-input text-lg w-full"
              placeholder="Username"
            />
          </>
        ) : (
          <>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              {profileData.fullName}
            </h2>
            <p className="text-xl text-gray-600 mb-4">
              @{profileData.username}
            </p>
          </>
        )}
        <div className="flex items-center justify-center sm:justify-start gap-2 text-gray-500">
          <Calendar className="w-4 h-4" />
          <span>
            Joined{" "}
            {new Date(profileData.joinDate).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
            })}
          </span>
        </div>
      </div>
    </div>

    {/* Contact & Bio */}
    <div className="mb-8">
      <h3 className="text-lg font-semibold text-gray-900 mb-3">About</h3>
      {isEditing ? (
        <textarea
          value={editData.bio}
          onChange={(e) => onChange("bio", e.target.value)}
          className="form-input w-full resize-none"
          rows="4"
        />
      ) : (
        <p className="text-gray-700">{profileData.bio}</p>
      )}
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
      {/* Fields */}
      {["email", "phone", "location", "website"].map((field, idx) => (
        <div key={idx}>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {field === "email" && <Mail className="w-4 h-4 inline mr-2" />}
            {field === "phone" && <Phone className="w-4 h-4 inline mr-2" />}
            {field === "location" && <MapPin className="w-4 h-4 inline mr-2" />}
            {field === "website" && <Globe className="w-4 h-4 inline mr-2" />}
            {field.charAt(0).toUpperCase() + field.slice(1)}
          </label>
          {isEditing ? (
            <input
              type={
                field === "email"
                  ? "email"
                  : field === "phone"
                  ? "tel"
                  : field === "website"
                  ? "url"
                  : "text"
              }
              value={editData[field]}
              onChange={(e) => onChange(field, e.target.value)}
              className="form-input w-full"
            />
          ) : field === "website" ? (
            <a
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-600 hover:text-indigo-800"
            >
              {profileData.website}
            </a>
          ) : (
            <p className="text-gray-900">{profileData[field]}</p>
          )}
        </div>
      ))}
    </div>

    <div className="flex gap-4">
      {isEditing ? (
        <>
          <button
            onClick={onSave}
            className="action-btn bg-green-600 text-white px-6 py-3 rounded-xl hover:bg-green-700 flex items-center gap-2"
          >
            <Save className="w-4 h-4" /> Save Changes
          </button>
          <button
            onClick={onCancel}
            className="action-btn bg-gray-600 text-white px-6 py-3 rounded-xl hover:bg-gray-700 flex items-center gap-2"
          >
            <X className="w-4 h-4" /> Cancel
          </button>
        </>
      ) : (
        <button
          onClick={onEdit}
          className="edit-btn bg-indigo-600 text-white px-6 py-3 rounded-xl hover:bg-indigo-700 flex items-center gap-2"
        >
          <Edit3 className="w-4 h-4" /> Edit Profile
        </button>
      )}
    </div>
  </div>
);

export default ProfileCard;
