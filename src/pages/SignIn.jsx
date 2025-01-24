import React, { useState } from "react";
import { useAuthContext } from "../context/authcontext.jsx";
import Button from "../components/ui/Button.jsx";
import Input from "../components/ui/Input";
import GoogleIcon from "../assets/googleicon.svg";
import { useNavigate } from "react-router-dom";

export const SignInPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const { signInUser, handleGoogleSignUp } = useAuthContext();
  const navigate = useNavigate();

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
    if (validateForm()) {
      try {
        await signInUser(formData.email, formData.password);
        navigate("/home");
      } catch (error) {
        setErrors({ email: "Invalid email or password" });
        console.error("Sign-in error:", error.message);
      }
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await handleGoogleSignUp();
      navigate("/home");
    } catch (error) {
      console.error("Google Sign-in error:", error.message);
      setErrors({ google: "Google sign-in failed. Please try again." });
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white shadow-md rounded-lg p-8">
        <h2 className="text-2xl font-bold text-center mb-6">Welcome Back</h2>

        {errors.google && (
          <p className="text-red-500 text-center mb-4">{errors.google}</p>
        )}

        <form onSubmit={handleSubmit}>
          <Input
            label="Email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
          />
          <Input
            label="Password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
          />
          <Button type="submit" variant="primary" className="w-full mt-4">
            Sign In
          </Button>
        </form>

        <div className="flex items-center justify-center my-4">
          <span className="w-1/3 border-b"></span>
          <span className="px-2 text-sm text-gray-500">or</span>
          <span className="w-1/3 border-b"></span>
        </div>

        <Button
          onClick={handleGoogleSignIn}
          variant="secondary"
          className="w-full flex items-center justify-center gap-2"
        >
          <img src={GoogleIcon} alt="Google Icon" width={22} />
          Sign In with Google
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
