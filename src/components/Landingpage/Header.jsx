import React, { useState } from "react";
import { BookOpen, Menu, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const isLogin = !!token; // cleaner boolean check

  const navItems = [
    { label: "Posts", route: "/" },
    { label: "New Post", route: "/createpost" },
    { label: "Dashboard", route: "/dashboard" },
    { label: "MyProfile", route: "/myprofile" },
  ];

  const handleRouteClick = (route) => {
    setIsMenuOpen(false);
    if (isLogin) {
      navigate(route);
    } else {
      navigate("/login");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsMenuOpen(false);
    navigate("/login");
  };

  return (
    <header className="bg-white/80 backdrop-blur-md border-b border-blue-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div
            className="flex items-center cursor-pointer"
            onClick={() => navigate("/")}
          >
            <BookOpen className="w-8 h-8 text-blue-600 mr-2" />
            <span className="text-2xl font-bold text-gray-900">BlogHub</span>
          </div>

          <nav className="hidden md:flex space-x-8">
            {navItems.map((link, index) => (
              <button
                key={index}
                onClick={() => handleRouteClick(link.route)}
                className="text-gray-700 hover:text-blue-600 transition"
              >
                {link.label}
              </button>
            ))}
          </nav>

          {!isLogin ? (
            <div className="hidden md:flex items-center space-x-4">
              <button
                className="text-gray-700 hover:text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-50"
                onClick={() => navigate("/login")}
              >
                Login
              </button>
              <button
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
                onClick={() => navigate("/register")}
              >
                Register
              </button>
            </div>
          ) : (
            <button
              className="hidden md:block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
              onClick={handleLogout}
            >
              Logout
            </button>
          )}

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-gray-700 hover:text-blue-600"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navItems.map((link, index) => (
              <button
                key={index}
                onClick={() => handleRouteClick(link.route)}
                className="block w-full text-left px-3 py-2 text-gray-700 hover:text-blue-600"
              >
                {link.label}
              </button>
            ))}
            {!isLogin ? (
              <>
                <button
                  onClick={() => {
                    setIsMenuOpen(false);
                    navigate("/login");
                  }}
                  className="block w-full text-left px-3 py-2 text-gray-700 hover:text-blue-600"
                >
                  Login
                </button>
                <button
                  onClick={() => {
                    setIsMenuOpen(false);
                    navigate("/register");
                  }}
                  className="block w-full text-left px-3 py-2 text-white bg-blue-600 rounded-lg mt-2 mx-3"
                >
                  Register
                </button>
              </>
            ) : (
              <button
                onClick={handleLogout}
                className="block w-full text-left px-3 py-2 text-gray-700 hover:text-blue-600"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
