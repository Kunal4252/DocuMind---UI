import React, { useState } from "react";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input.jsx";
import { signUpWithEmail, signInWithGoogle } from "../services/authService.js";
import { useNavigate, Link } from "react-router-dom";
import { FileText } from "lucide-react";

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
    <div className="min-h-screen py-12 bg-gradient-to-br from-purple-50 via-blue-50 to-cyan-50">
      {/* Decorative elements similar to Home page */}
      <div className="absolute top-1/4 right-0 w-72 h-72 bg-gradient-to-br from-purple-300 to-blue-500 rounded-full blur-3xl opacity-20" />
      <div className="absolute bottom-1/4 left-0 w-80 h-80 bg-gradient-to-tr from-blue-300 to-cyan-500 rounded-full blur-3xl opacity-20" />

      <div className="max-w-xl mx-auto px-4">
        <div className="card p-8 overflow-hidden relative bg-white rounded-2xl shadow-lg border border-gray-100">
          <div className="absolute top-0 left-0 w-full h-1 gradient-primary"></div>

          <div className="text-center mb-6">
            <div className="flex items-center justify-center gap-2 mb-2">
              <FileText className="h-6 w-6 text-blue-600" />
              <h1 className="text-2xl font-bold gradient-text">DocuMind AI</h1>
            </div>
            <h2 className="text-2xl font-bold text-gray-800">
              Create Your Account
            </h2>
          </div>

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
                    className="input-field resize-none"
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
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>
            <p className="mx-4 text-sm text-gray-400">or</p>
            <div className="flex-1 h-px bg-gradient-to-r from-gray-200 via-gray-200 to-transparent"></div>
          </div>

          <Button
            onClick={handleGoogleSignUp}
            variant="secondary"
            className="w-full hover:bg-gray-50 transition-colors duration-200"
            loading={loading}
          >
            <div className="flex items-center justify-center gap-2">
              <svg
                className="w-5 h-5 flex-shrink-0"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 48 48"
              >
                <path
                  fill="#FFC107"
                  d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
                ></path>
                <path
                  fill="#FF3D00"
                  d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
                ></path>
                <path
                  fill="#4CAF50"
                  d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
                ></path>
                <path
                  fill="#1976D2"
                  d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
                ></path>
              </svg>
              <span>Continue with Google</span>
            </div>
          </Button>

          <div className="text-center mt-6">
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <Link
                to="/auth/sign-in"
                className="font-medium text-indigo-600 hover:text-indigo-800"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
