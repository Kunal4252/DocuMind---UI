import React, { useState } from "react";
import Button from "../components/ui/Button.jsx";
import { FileText } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import { signInWithEmail, signInWithGoogle } from "../services/authService.js";

const SignInPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState(null);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    let isValid = true;

    if (!formData.email) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
      isValid = false;
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    setErrors({});

    try {
      const response = await signInWithEmail(formData.email, formData.password);
      if (response) {
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("Error signing in:", error);

      if (error.code === "auth/user-not-found") {
        setErrors({ email: "No account found with this email" });
      } else if (error.code === "auth/wrong-password") {
        setErrors({ password: "Incorrect password" });
      } else if (error.code === "auth/too-many-requests") {
        setErrors({
          general: "Too many failed login attempts. Please try again later.",
        });
      } else {
        setErrors({
          general: "Failed to sign in. Please check your credentials.",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const GoogleSignIn = async () => {
    setGoogleLoading(true);
    try {
      const response = await signInWithGoogle();
      if (response) {
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("Google sign in error:", error);
      setErrors({
        general: "Failed to sign in with Google. Please try again.",
      });
    } finally {
      setGoogleLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-purple-50 via-blue-50 to-cyan-50">
      {/* Decorative elements similar to Home page */}
      <div className="absolute top-1/4 right-0 w-72 h-72 bg-gradient-to-br from-purple-300 to-blue-500 rounded-full blur-3xl opacity-20" />
      <div className="absolute bottom-1/4 left-0 w-80 h-80 bg-gradient-to-tr from-blue-300 to-cyan-500 rounded-full blur-3xl opacity-20" />

      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-2xl shadow-lg border border-gray-100 relative">
        <div className="text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <FileText className="h-6 w-6 text-blue-600" />
            <h1 className="text-2xl font-bold gradient-text">DocuMind AI</h1>
          </div>
          <h2 className="mt-4 text-2xl font-bold text-gray-800">Sign In</h2>
          <p className="mt-2 text-sm text-gray-600">
            Welcome back! Please sign in to your account
          </p>
        </div>

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

        {errors &&
          typeof errors === "object" &&
          !errors.general &&
          Object.keys(errors).length > 0 && (
            <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-lg border border-red-100">
              <ul className="list-disc pl-4">
                {Object.entries(errors).map(([field, message]) => (
                  <li key={field} className="text-sm">
                    {message}
                  </li>
                ))}
              </ul>
            </div>
          )}

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                className={`input-field ${
                  errors?.email ? "border-red-500 focus:ring-red-200" : ""
                }`}
                placeholder="your.email@example.com"
              />
              {errors?.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email}</p>
              )}
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <a
                  href="#"
                  className="text-sm text-indigo-600 hover:text-indigo-800"
                >
                  Forgot password?
                </a>
              </div>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={formData.password}
                onChange={handleChange}
                className={`input-field ${
                  errors?.password ? "border-red-500 focus:ring-red-200" : ""
                }`}
                placeholder="••••••••"
              />
              {errors?.password && (
                <p className="mt-1 text-sm text-red-600">{errors.password}</p>
              )}
            </div>
          </div>

          <div>
            <Button
              variant="primary"
              type="submit"
              className="w-full"
              loading={loading}
            >
              Sign In
            </Button>
          </div>
        </form>

        <div className="mt-4 relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-4 bg-white text-gray-500">
              Or continue with
            </span>
          </div>
        </div>

        <div>
          <Button
            variant="secondary"
            className="w-full"
            onClick={GoogleSignIn}
            loading={googleLoading}
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
        </div>

        <div className="text-center mt-4">
          <p className="text-sm text-gray-600">
            Don't have an account?{" "}
            <Link
              to="/auth/sign-up"
              className="font-medium text-indigo-600 hover:text-indigo-800"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
