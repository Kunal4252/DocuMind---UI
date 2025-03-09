import { auth } from "../config/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
} from "firebase/auth";
import axios from "axios";

const googleProvider = new GoogleAuthProvider();

// Use the environment variable for the API base URL
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const signUpWithEmail = async (email, password, userData) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const idToken = await userCredential.user.getIdToken();
    console.log("Firebase ID Token:", idToken);
    const response = await axios.post(
      `${API_BASE_URL}/users/auth/signup`,
      { ...userData, email },
      {
        headers: {
          Authorization: `Bearer ${idToken}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.detail || "Failed to sign up");
  }
};

export const signInWithEmail = async (email, password) => {
  return await signInWithEmailAndPassword(auth, email, password);
};

export const signInWithGoogle = async () => {
  try {
    const userCredential = await signInWithPopup(auth, googleProvider);
    const idToken = await userCredential.user.getIdToken();
    const response = await axios.post(
      `${API_BASE_URL}/users/auth/google-signup`,
      null,
      {
        headers: {
          Authorization: `Bearer ${idToken}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.detail || "Failed to sign in with Google"
    );
  }
};

export const logout = async () => {
  return await signOut(auth);
};
