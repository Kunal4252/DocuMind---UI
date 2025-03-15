import React, { useState } from "react";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input.jsx";
import { signUpWithEmail, signInWithGoogle } from "../services/authService.js";
import { useNavigate, Link } from "react-router-dom";
import GoogleIcon from "../assets/googleicon.svg";

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
    <div className="min-h-screen py-12 bg-gradient-to-b from-indigo-50 to-white">
      <div className="max-w-xl mx-auto px-4">
        <div className="card p-8 overflow-hidden relative">
          <div className="absolute top-0 left-0 w-full h-1 gradient-primary"></div>

          <h2 className="text-2xl font-bold text-center mb-6 bg-clip-text text-transparent gradient-primary">
            Create Your Account
          </h2>

          {error && error.general && (
            <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-lg border border-red-100 flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2 text-red-500"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
              {error.general}
            </div>
          )}

          {error &&
            typeof error === "object" &&
            !error.general &&
            Object.keys(error).length > 0 && (
              <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-lg border border-red-100">
                <ul className="list-disc pl-4">
                  {Object.entries(error).map(([field, message]) => (
                    <li key={field} className="text-sm">
                      {message}
                    </li>
                  ))}
                </ul>
              </div>
            )}

          <form onSubmit={handleEmailSignUp} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="col-span-2">
                <Input
                  label="Email"
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  error={error?.email}
                />
              </div>
              <div className="col-span-2 md:col-span-1">
                <Input
                  label="Password"
                  type="password"
                  name="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  error={error?.password}
                />
              </div>
              <div className="col-span-2 md:col-span-1">
                <Input
                  label="Confirm Password"
                  type="password"
                  name="confirmPassword"
                  placeholder="Re-enter your password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  error={error?.confirmPassword}
                />
              </div>
              <div className="col-span-2">
                <Input
                  label="Full Name"
                  type="text"
                  name="name"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={handleChange}
                  error={error?.name}
                />
              </div>
              <div className="col-span-2 md:col-span-1">
                <Input
                  label="Phone (Optional)"
                  type="text"
                  name="phone"
                  placeholder="Enter your phone number"
                  value={formData.phone}
                  onChange={handleChange}
                  error={error?.phone}
                />
              </div>
              <div className="col-span-2 md:col-span-1">
                <Input
                  label="Location (Optional)"
                  type="text"
                  name="location"
                  placeholder="Enter your location"
                  value={formData.location}
                  onChange={handleChange}
                  error={error?.location}
                />
              </div>
              <div className="col-span-2">
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Bio (Optional)
                  </label>
                  <textarea
                    name="bio"
                    rows="3"
                    placeholder="Tell us a bit about yourself"
                    value={formData.bio}
                    onChange={handleChange}
                    className="input-field"
                  ></textarea>
                </div>
              </div>
            </div>

            <Button
              type="submit"
              variant="primary"
              className="w-full mt-6"
              loading={loading}
            >
              {loading ? "Creating Account..." : "Create Account"}
            </Button>
          </form>

          <div className="flex items-center my-6">
            <div className="flex-1 h-px bg-gray-200"></div>
            <p className="mx-4 text-sm text-gray-400">or</p>
            <div className="flex-1 h-px bg-gray-200"></div>
          </div>

          <Button
            onClick={handleGoogleSignUp}
            variant="secondary"
            className="w-full"
            loading={loading}
          >
            <div className="flex items-center justify-center gap-2">
              <img
                src={GoogleIcon}
                alt="Google Icon"
                width={20}
                height={20}
                className="flex-shrink-0"
              />
              <span>{loading ? "Signing up..." : "Continue with Google"}</span>
            </div>
          </Button>

          <p className="mt-8 text-center text-sm text-gray-500">
            Already have an account?{" "}
            <Link
              to="/auth/sign-in"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
