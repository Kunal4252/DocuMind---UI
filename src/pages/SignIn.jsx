import React, { useState } from "react";
import Button from "../components/ui/Button.jsx";
import Input from "../components/ui/Input";
import GoogleIcon from "../assets/googleicon.svg";
import { useNavigate, Link } from "react-router-dom";
import { signInWithEmail, signInWithGoogle } from "../services/authService.js";

export const SignInPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState(null);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.password) newErrors.password = "Password is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors(null);
    setLoading(true);

    if (validateForm()) {
      try {
        const userCredential = await signInWithEmail(
          formData.email,
          formData.password
        );
        console.log(userCredential.user);

        navigate("/dashboard");
      } catch (error) {
        console.error("Sign-in error:", error.message);

        // Map Firebase error messages to user-friendly messages
        let errorMessage = "Invalid email or password";
        if (error.code === "auth/user-not-found") {
          errorMessage = "No account found with this email";
        } else if (error.code === "auth/wrong-password") {
          errorMessage = "Incorrect password";
        } else if (error.code === "auth/invalid-credential") {
          errorMessage = "Invalid credentials";
        } else if (error.code === "auth/too-many-requests") {
          errorMessage =
            "Too many failed login attempts. Please try again later";
        }

        setErrors({ general: errorMessage });
      } finally {
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  };

  const GoogleSignIn = async () => {
    setErrors(null);
    setLoading(true);
    try {
      const response = await signInWithGoogle();
      console.log(response);
      navigate("/dashboard");
    } catch (error) {
      console.error("Google sign-in error:", error);
      setErrors({ general: error.message || "Failed to sign in with Google" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-b from-indigo-50 to-white">
      <div className="w-full max-w-md">
        <div className="card p-8 overflow-hidden relative">
          <div className="absolute top-0 left-0 w-full h-1 gradient-primary"></div>

          <h2 className="text-2xl font-bold text-center mb-8 bg-clip-text text-transparent gradient-primary">
            Welcome Back
          </h2>

          {errors && errors.general && (
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
              {errors.general}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              label="Email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              error={errors?.email}
            />
            <Input
              label="Password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              error={errors?.password}
            />

            <div className="mt-2 mb-6 text-right">
              <Link
                to="/forgot-password"
                className="text-sm text-indigo-600 hover:text-indigo-500"
              >
                Forgot password?
              </Link>
            </div>

            <Button
              type="submit"
              variant="primary"
              className="w-full"
              loading={loading}
            >
              {loading ? "Signing in..." : "Sign In"}
            </Button>
          </form>

          <div className="flex items-center my-6">
            <div className="flex-1 h-px bg-gray-200"></div>
            <p className="mx-4 text-sm text-gray-400">or</p>
            <div className="flex-1 h-px bg-gray-200"></div>
          </div>

          <Button
            onClick={GoogleSignIn}
            variant="secondary"
            className="w-full flex items-center justify-center gap-2"
            loading={loading}
          >
            <img src={GoogleIcon} alt="Google Icon" width={20} height={20} />
            <span>{loading ? "Signing in..." : "Sign in with Google"}</span>
          </Button>

          <p className="mt-8 text-center text-sm text-gray-500">
            Don't have an account?{" "}
            <Link
              to="/auth/sign-up"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              Create account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
