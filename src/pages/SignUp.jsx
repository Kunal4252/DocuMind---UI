import React, { useState } from "react";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input.jsx";
import { signUpWithEmail, signInWithGoogle } from "../services/authService.js";
import { useNavigate } from "react-router-dom";
import GoogleIcon from "../assets/googleicon.svg"; // Add a Google icon for the button

export const SignUpPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
    phone: "",
    location: "",
    bio: "",
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.password) newErrors.password = "Password is required";
    if (!formData.confirmPassword)
      newErrors.confirmPassword = "Confirm Password is required";
    if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match.";
    if (!formData.name) newErrors.name = "Name is required";

    if (Object.keys(newErrors).length > 0) {
      setError(newErrors);
      return false;
    }
    return true;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEmailSignUp = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    if (validateForm()) {
      try {
        const { email, password, name, phone, location, bio } = formData;
        const userData = { name, phone, location, bio };
        const response = await signUpWithEmail(email, password, userData);
        console.log(response);
        navigate("/dashboard");
      } catch (error) {
        console.error("Sign-up error:", error);

        // Map Firebase error messages to user-friendly messages
        let errorMessage = "Failed to create account";
        if (error.code === "auth/email-already-in-use") {
          errorMessage =
            "This email is already registered. Please sign in instead.";
        } else if (error.code === "auth/invalid-email") {
          errorMessage = "Please enter a valid email address";
        } else if (error.code === "auth/weak-password") {
          errorMessage =
            "Password is too weak. Please use at least 6 characters";
        } else if (error.code === "auth/network-request-failed") {
          errorMessage =
            "Network error. Please check your connection and try again";
        } else if (error.message) {
          errorMessage = error.message;
        }

        setError({ general: errorMessage });
      } finally {
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  };

  const handleGoogleSignUp = async () => {
    setError(null);
    setLoading(true);
    try {
      const response = await signInWithGoogle();
      console.log(response);
      navigate("/dashboard");
    } catch (error) {
      console.error("Google sign-up error:", error);
      setError({ general: error.message || "Failed to sign up with Google" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white shadow-md rounded-lg p-8">
        <h2 className="text-2xl font-bold text-center mb-6">Sign Up</h2>

        {error && typeof error === "string" && (
          <p className="text-red-500 mb-4">{error}</p>
        )}

        {error && error.general && (
          <div className="bg-red-50 border border-red-200 text-red-800 rounded-md p-3 mb-4">
            {error.general}
          </div>
        )}

        {error &&
          typeof error === "object" &&
          !error.general &&
          Object.keys(error).length > 0 && (
            <div className="bg-red-50 border border-red-200 text-red-800 rounded-md p-3 mb-4">
              <ul className="list-disc pl-4">
                {Object.entries(error).map(([field, message]) => (
                  <li key={field}>{message}</li>
                ))}
              </ul>
            </div>
          )}

        <form onSubmit={handleEmailSignUp}>
          <div>
            <Input
              label="Email"
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              error={error?.email}
            />
            <Input
              label="Password"
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              error={error?.password}
            />
            <Input
              label="Confirm Password"
              type="password"
              name="confirmPassword"
              placeholder="Re-enter your password"
              value={formData.confirmPassword}
              onChange={handleChange}
              error={error?.confirmPassword}
            />
            <Input
              label="Name"
              type="text"
              name="name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
              error={error?.name}
            />
            <Input
              label="Phone"
              type="text"
              name="phone"
              placeholder="Enter your phone number"
              value={formData.phone}
              onChange={handleChange}
              error={error?.phone}
            />
            <Input
              label="Location"
              type="text"
              name="location"
              placeholder="Enter your location"
              value={formData.location}
              onChange={handleChange}
              error={error?.location}
            />
            <Input
              label="Bio"
              type="text"
              name="bio"
              placeholder="Enter a short bio"
              value={formData.bio}
              onChange={handleChange}
              error={error?.bio}
            />
          </div>
          <Button
            type="submit"
            variant="primary"
            className="w-full mt-4"
            loading={loading}
          >
            {loading ? "Creating Account..." : "Create Account"}
          </Button>
        </form>

        <div className="flex items-center justify-center my-4">
          <span className="w-1/3 border-b"></span>
          <span className="px-2 text-sm text-gray-500">or</span>
          <span className="w-1/3 border-b"></span>
        </div>

        <Button
          onClick={handleGoogleSignUp}
          variant="secondary"
          className="w-full flex items-center justify-center gap-2"
          loading={loading}
        >
          <img src={GoogleIcon} alt="Google Icon" width={22} />
          <p>{loading ? "Signing in..." : "Continue with Google"}</p>
        </Button>

        <p className="text-center text-sm text-gray-600 mt-4">
          Already have an account?{" "}
          <a href="/auth/sign-in" className="text-blue-500 hover:underline">
            Sign In
          </a>
        </p>
      </div>
    </div>
  );
};
