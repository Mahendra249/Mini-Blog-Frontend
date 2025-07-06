import { Settings, Shield, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const QuickActions = () => {
  const navigate = useNavigate();
  const {user} = useAuth();
  
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="stat-card bg-white rounded-2xl shadow-xl p-6 border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Quick Actions
      </h3>
      <div className="space-y-3">
        <button className="action-btn w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-50">
          <Settings className="w-5 h-5 text-gray-600" /> Account Settings
        </button>
        <button className="action-btn w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-50">
          <Shield className="w-5 h-5 text-gray-600" /> Privacy & Security
        </button>
        <button
          className="action-btn w-full flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer hover:bg-red-50 text-red-600"
          onClick={handleLogout}
        >
          <LogOut className="w-5 h-5" /> Sign Out
        </button>
      </div>
    </div>
  );
};

export default QuickActions;
