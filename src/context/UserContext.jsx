import React, { createContext, useState, useEffect, useContext } from "react";
import { getUserProfile } from "../services/userService";
import { useAuth } from "../hooks/useAuth";

// Create a context for user profile data
const UserContext = createContext();

// Hook to use the user profile context
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

// Provider component for user profile data
export const UserProvider = ({ children }) => {
  const { user } = useAuth(); // Get user from AuthContext
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
      if (!user) {
        setUserProfile(null);
        return;
      }

      setLoading(true);
      setError(null);
      try {
        const profile = await getUserProfile();
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
    userProfile,
    loading,
    error,
    refreshUserProfile,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export default UserProvider;
