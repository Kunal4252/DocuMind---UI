import React, { createContext, useContext, useState, useEffect } from "react";
import { auth } from "../config/firebase";
import { onAuthStateChanged } from "firebase/auth";

// Export the context so it can be imported directly
export const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      try {
        if (firebaseUser) {
          // Get the ID token
          const token = await firebaseUser.getIdToken();

          // Store user in state
          setUser({
            uid: firebaseUser.uid,
            email: firebaseUser.email,
            displayName: firebaseUser.displayName,
            photoURL: firebaseUser.photoURL,
            token,
          });

          // Store user in localStorage for persistence
          localStorage.setItem(
            "user",
            JSON.stringify({
              uid: firebaseUser.uid,
              email: firebaseUser.email,
              token,
            })
          );
        } else {
          // No user is signed in
          setUser(null);
          localStorage.removeItem("user");
        }
      } catch (err) {
        console.error("Auth state error:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    });

    // Cleanup subscription
    return () => unsubscribe();
  }, []);

  const value = {
    user,
    loading,
    error,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
