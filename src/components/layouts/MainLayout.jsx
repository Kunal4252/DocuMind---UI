import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useUser } from "../../context/UserContext";
import { logout } from "../../services/authService";
import { NavLink } from "react-router-dom";
import { FileText } from "lucide-react";

const MainLayout = ({ children }) => {
  const { user } = useAuth();
  const { userProfile } = useUser();
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const profileMenuRef = useRef(null);
  const profileButtonRef = useRef(null);
  const navigate = useNavigate();

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        profileMenuRef.current &&
        !profileMenuRef.current.contains(event.target) &&
        !profileButtonRef.current.contains(event.target)
      ) {
        setIsProfileMenuOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);
      await logout();
      navigate("/auth/sign-in");
    } catch (error) {
      console.error("Logout error:", error.message);
    } finally {
      setIsLoggingOut(false);
    }
  };

  const toggleProfileMenu = () => {
    setIsProfileMenuOpen(!isProfileMenuOpen);
  };

  return (
    <div className="min-h-screen h-screen bg-gray-50 flex flex-col overflow-hidden">
      {/* Header */}
      <header className="bg-white shadow-sm z-20 flex-shrink-0">
        <div className="w-full px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center gap-2">
              <FileText className="h-6 w-6 text-blue-600" />
              <h1 className="text-2xl font-bold gradient-text">DocuMind AI</h1>
            </div>
            <nav className="hidden md:flex space-x-4 ml-6">
              <NavLink
                to="/dashboard"
                className={({ isActive }) =>
                  isActive
                    ? "text-indigo-600 font-medium"
                    : "text-gray-500 hover:text-gray-700"
                }
              >
                Dashboard
              </NavLink>
              <NavLink
                to="/chat"
                className={({ isActive }) =>
                  isActive
                    ? "text-indigo-600 font-medium"
                    : "text-gray-500 hover:text-gray-700"
                }
              >
                Chat
              </NavLink>
              <NavLink
                to="/help"
                className={({ isActive }) =>
                  isActive
                    ? "text-indigo-600 font-medium"
                    : "text-gray-500 hover:text-gray-700"
                }
              >
                Help
              </NavLink>
            </nav>
          </div>

          {/* Profile section */}
          <div className="relative">
            <button
              ref={profileButtonRef}
              onClick={toggleProfileMenu}
              className="flex items-center space-x-2 p-2 rounded-full hover:bg-gray-100 focus:outline-none"
            >
              <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold">
                {userProfile?.name?.charAt(0)?.toUpperCase() ||
                  user?.email?.charAt(0)?.toUpperCase() ||
                  "U"}
              </div>
              <span className="text-sm font-medium text-gray-700 hidden md:block">
                {userProfile?.name || user?.email?.split("@")[0] || "User"}
              </span>
              <svg
                className={`h-5 w-5 text-gray-400 hidden md:block transition-transform duration-200 ${
                  isProfileMenuOpen ? "rotate-180" : ""
                }`}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>

            {/* Profile dropdown */}
            {isProfileMenuOpen && (
              <div
                ref={profileMenuRef}
                className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50"
                style={{ minWidth: "12rem" }}
              >
                <div className="py-1" role="menu" aria-orientation="vertical">
                  <button
                    onClick={() => {
                      setIsProfileMenuOpen(false);
                      navigate("/profile");
                    }}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    role="menuitem"
                  >
                    Your Profile
                  </button>
                  <button
                    onClick={() => {
                      setIsProfileMenuOpen(false);
                      navigate("/help");
                    }}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    role="menuitem"
                  >
                    Help & FAQ
                  </button>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    role="menuitem"
                    disabled={isLoggingOut}
                  >
                    {isLoggingOut ? "Signing out..." : "Sign out"}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main content - change to overflow-auto to enable scrolling */}
      <main className="flex-1 flex overflow-auto w-full">{children}</main>

      {/* Footer - ensure it's flex-shrink-0 so it doesn't collapse */}
      <footer className="bg-white border-t border-gray-200 flex-shrink-0">
        <div className="w-full px-4 py-2 text-center text-sm text-gray-500">
          &copy; {new Date().getFullYear()} DocuMind. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default MainLayout;
