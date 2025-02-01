import { auth } from "../config/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
} from "firebase/auth";

const googleProvider = new GoogleAuthProvider();

export const signUpWithEmail = async (email, password) => {
  return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInWithEmail = async (email, password) => {
  return await signInWithEmailAndPassword(auth, email, password);
};

export const signInWithGoogle = async () => {
  return await signInWithPopup(auth, googleProvider);
};

export const logout = async () => {
  return await signOut(auth);
};
