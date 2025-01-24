import { auth } from "../config/firebase";
import { createContext, useContext, useState, useEffect } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";

const authContext = createContext(null);

export const useAuthContext = () => useContext(authContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const provider = new GoogleAuthProvider();

  const signUpUser = async (email, password) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      setUser(userCredential.user);
      console.log("User signed up:", userCredential.user);
      return userCredential.user;
    } catch (error) {
      console.error("Error signing up with email and password:", error);
      throw error;
    }
  };

  const signInUser = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      setUser(userCredential.user);
      console.log("User signed up:", userCredential.user);
      return userCredential.user;
    } catch (error) {
      console.error("Error signing in with email and password:", error);
      throw error;
    }
  };

  const handleGoogleSignUp = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      setUser(result.user); // Update user state
      console.log("User signed up with Google:", result.user);
      return result.user;
    } catch (error) {
      console.error("Error signing up with Google:", error);
      throw error;
    }
  };

  const logoutUser = async () => {
    try {
      await signOut(auth);
      setUser(null);
      console.log("User logged out successfully.");
    } catch (error) {
      console.error("Error logging out:", error);
      throw error;
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <authContext.Provider
      value={{ user, signUpUser, signInUser, handleGoogleSignUp, logoutUser }}
    >
      {children}
    </authContext.Provider>
  );
};
