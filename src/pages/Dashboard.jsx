import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/ui/Button";
import { useAuth } from "../hooks/useAuth";
import { logout } from "../services/authService";
import LoadingSpinner from "../components/ui/LoadingSpinner";

export const Dashboard = () => {
  const { user, loading } = useAuth();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const navigate = useNavigate();

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);
      await logout();
      navigate("/auth/sign-in");
    } catch (error) {
      console.error("logout error:", error.message);
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
        <div className="mb-6 p-4 bg-blue-50 rounded-md">
          {user ? (
            <p className="text-blue-800">
              Welcome, <span className="font-semibold">{user.email}</span>
            </p>
          ) : (
            <p className="text-red-500">Please sign in</p>
          )}
        </div>

        <Button
          onClick={handleLogout}
          loading={isLoggingOut}
          className="w-full justify-center"
        >
          Logout
        </Button>
      </div>
    </div>
  );
};
