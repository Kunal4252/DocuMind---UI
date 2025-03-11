import React, { useState } from "react";
import Button from "../components/ui/Button.jsx";
import Input from "../components/ui/Input";
import GoogleIcon from "../assets/googleicon.svg";
import { useNavigate } from "react-router-dom";
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
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white shadow-md rounded-lg p-8">
        <h2 className="text-2xl font-bold text-center mb-6">Welcome Back</h2>

        {errors && errors.general && (
          <div className="bg-red-50 border border-red-200 text-red-800 rounded-md p-3 mb-4">
            {errors.general}
          </div>
        )}

        <form onSubmit={handleSubmit}>
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
          <Button
            type="submit"
            variant="primary"
            className="w-full mt-4"
            loading={loading}
          >
            {loading ? "Signing in..." : "Sign In"}
          </Button>
        </form>

        <div className="flex items-center justify-center my-4">
          <span className="w-1/3 border-b"></span>
          <span className="px-2 text-sm text-gray-500">or</span>
          <span className="w-1/3 border-b"></span>
        </div>

        <Button
          onClick={GoogleSignIn}
          variant="secondary"
          className="w-full flex items-center justify-center gap-2"
          loading={loading}
        >
          <img src={GoogleIcon} alt="Google Icon" width={22} />
          <p>{loading ? "Signing in..." : "Sign In with Google"}</p>
        </Button>

        <div className="flex justify-between mt-4 text-sm">
          <a href="/forgot-password" className="text-blue-500 hover:underline">
            Forgot Password?
          </a>
          <a href="/auth/sign-up" className="text-blue-500 hover:underline">
            Create Account
          </a>
        </div>
      </div>
    </div>
  );
};
