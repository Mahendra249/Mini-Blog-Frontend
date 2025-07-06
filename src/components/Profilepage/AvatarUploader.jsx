import { Camera } from "lucide-react";
const AvatarUploader = ({ avatar, onUpload }) => (
  <div className="avatar-container relative">
    <img
      src={avatar}
      alt="Profile"
      className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
    />
    <div className="avatar-overlay">
      <label htmlFor="avatar-upload" className="cursor-pointer">
        <Camera className="w-8 h-8 text-white" />
        <input
          id="avatar-upload"
          type="file"
          accept="image/*"
          onChange={onUpload}
          className="hidden"
        />
      </label>
    </div>
  </div>
);

export default AvatarUploader;
