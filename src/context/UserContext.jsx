import React, { createContext, useContext, useState, useEffect } from "react";
import { getUserProfile } from "../services/userService";
import { useAuth } from "./authcontext";

const UserContext = createContext();

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

export const UserProvider = ({ children }) => {
  const { user } = useAuth(); // Get user from AuthContext instead of duplicating logic
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  // Function to force refresh of user profile
  const refreshUserProfile = () => {
    setRefreshTrigger((prev) => prev + 1);
  };

  // Fetch user profile when auth changes or refresh is triggered
  useEffect(() => {
    const fetchUserProfile = async () => {
      if (!user) return;

      setLoading(true);
      setError(null);
      try {
        console.log("Fetching user profile...");
        const profile = await getUserProfile();
        console.log("Profile fetched:", profile);
        setUserProfile(profile);
      } catch (err) {
        console.error("Error fetching user profile:", err);
        setError(err.message || "Failed to fetch user profile");
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [user, refreshTrigger]);

  const value = {
    currentUser: user, // Use the user from AuthContext
    userProfile,
    loading,
    error,
    refreshUserProfile,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
