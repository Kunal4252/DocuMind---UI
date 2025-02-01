import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/ui/Button";
import { useAuth } from "../hooks/useAuth";
import { logout } from "../services/authService";
export const Dashboard = () => {
  const { user, loading } = useAuth();

  if (loading) return <div>Loading...</div>;

  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await logout();
      navigate("/auth/sign-in");
    } catch (error) {
      console.error("logout error:", error.message);
    }
  };

  return (
    <div>
      <div>{user ? `Welcome, ${user.email}` : "Please sign in"}</div>
      <br />
      <br />
      <Button onClick={handleLogout} className="w-full justify-center">
        logout
      </Button>
    </div>
  );
};
