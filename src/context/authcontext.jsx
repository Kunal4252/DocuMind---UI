import React, { createContext, useState, useEffect } from "react";
import { auth } from "../config/firebase";
import { onAuthStateChanged } from "firebase/auth";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [state, setState] = useState({
    user: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setState((prevState) => ({
        ...prevState,
        user,
        loading: false,
      }));
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={state}>
      {!state.loading && children}
    </AuthContext.Provider>
  );
};
