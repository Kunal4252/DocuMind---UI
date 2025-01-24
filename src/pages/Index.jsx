import React from "react";
import { useAuthContext } from "../context/authcontext";
import { useNavigate } from "react-router-dom";
import Button from "../components/ui/Button";
export const Main = () => {
  const { user, logoutUser } = useAuthContext();
  if (!user) {
    return <div>Loading...</div>;
  }

  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await logoutUser();
      navigate("/auth/sign-in");
    } catch (error) {
      console.error("logout error:", error.message);
    }
  };

  return (
    <div>
      welcome {user.email}
      <br />
      <br />
      <Button onClick={handleLogout} className="w-full justify-center">
        logout
      </Button>
    </div>
  );
};
