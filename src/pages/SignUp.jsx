import React, { useContext, useState } from "react";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input.jsx";
import { useAuthContext } from "../context/authcontext.jsx";
import { useNavigate } from "react-router-dom";
import GoogleIcon from "../assets/googleicon.svg";

export const SignUpPage = () => {
  const { signUpUser, handleGoogleSignUp } = useAuthContext();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.password) newErrors.password = "Password is required";
    if (!formData.confirmPassword)
      newErrors.confirmPassword = "confirmPassword is required";
    if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match.";
    setError(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEmailSignUp = async (e) => {
    e.preventDefault();
    setError(null);

    if (validateForm()) {
      try {
        await signUpUser(formData.email, formData.password);
        alert("Signup successful!");
        navigate("/auth/sign-in");
      } catch (error) {
        setError(error.message || "An unknown error occurred");
      }
    }
  };

  const handleGoogleSignup = async () => {
    try {
      await handleGoogleSignUp();
      alert("Signed up successfully with Google!");
      navigate("/home");
    } catch (error) {
      setError(error.message || "An unknown error occurred");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white shadow-md rounded-lg p-8">
        <h2 className="text-2xl font-bold text-center mb-6">
          Sign Up to DocuMind
        </h2>

        {error && typeof error === "string" && (
          <p className="text-red-500 mb-4">{error}</p>
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
            />
            <Input
              label="Password"
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
            />
            <Input
              label="Confirm Password"
              type="password"
              name="confirmPassword"
              placeholder="Re-enter your password"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
          </div>
          <Button type="submit" variant="primary" className="w-full mt-4">
            Create Account
          </Button>
          <p className="text-center text-sm text-gray-600 mt-4">
            Already have an account?{" "}
            <a href="/auth/sign-in" className="text-blue-500 hover:underline">
              Sign In
            </a>
          </p>
        </form>

        <div className="flex items-center justify-center my-4">
          <span className="w-1/3 border-b"></span>
          <span className="px-2 text-sm text-gray-500">or</span>
          <span className="w-1/3 border-b"></span>
        </div>

        <Button
          onClick={handleGoogleSignup}
          variant="secondary"
          className="w-full flex items-center justify-center gap-2"
        >
          <img src={GoogleIcon} alt="Google Icon" width={22} />
          Sign Up with Google
        </Button>
      </div>
    </div>
  );
};
