import "./App.css";
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Link,
} from "react-router-dom";
import { Dashboard } from "./pages/Dashboard.jsx";
import { Chat } from "./pages/Chat.jsx";
import { Home } from "./pages/Home.jsx";
import { SignUpPage } from "./pages/SignUp.jsx";
import { SignInPage } from "./pages/SignIn.jsx";
import ProtectedRoute from "./components/ProtectedRoute";
import { useAuth } from "./hooks/useAuth";
import UserProfile from "./components/UserProfile";
import MainLayout from "./components/layouts/MainLayout";

// Simple Help page component
const HelpPage = () => {
  const getGradientStyle = (colorStart, colorEnd) => {
    return {
      background: `linear-gradient(135deg, ${colorStart} 0%, ${colorEnd} 100%)`,
    };
  };

  return (
    <MainLayout>
      <div className="flex flex-col h-full w-full overflow-auto bg-gray-50 p-6">
        {/* Header with gradient */}
        <div
          className="w-full rounded-xl p-6 mb-6 text-white"
          style={getGradientStyle("#3B82F6", "#2563EB")}
        >
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div>
              <h1 className="text-3xl font-bold mb-2">Help & FAQ</h1>
              <p className="opacity-90">Get assistance using DocuMind</p>
            </div>
            <Link
              to="/dashboard"
              className="px-4 py-2 bg-white/20 backdrop-blur-sm text-white rounded-lg mt-4 md:mt-0 hover:bg-white/30 transition"
            >
              Back to Dashboard
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center mb-4">
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center mr-3 text-white"
                style={getGradientStyle("#F59E0B", "#D97706")}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <h2 className="text-xl font-semibold">How to Use DocuMind</h2>
            </div>

            <ol className="space-y-6 mt-6">
              <li className="flex">
                <div className="bg-indigo-100 rounded-full h-8 w-8 flex-shrink-0 flex items-center justify-center text-indigo-600 font-bold mr-3">
                  1
                </div>
                <div>
                  <span className="font-medium text-gray-800">
                    Create a new chat
                  </span>
                  <p className="text-gray-600 mt-1">
                    Click the "New Chat" button in the sidebar to start a new
                    conversation. You can either upload a new document or select
                    an existing one.
                  </p>
                </div>
              </li>
              <li className="flex">
                <div className="bg-indigo-100 rounded-full h-8 w-8 flex-shrink-0 flex items-center justify-center text-indigo-600 font-bold mr-3">
                  2
                </div>
                <div>
                  <span className="font-medium text-gray-800">
                    Chat with your document
                  </span>
                  <p className="text-gray-600 mt-1">
                    Once a document is selected, you can ask questions about it.
                    The AI will provide answers based on the document's content.
                  </p>
                </div>
              </li>
              <li className="flex">
                <div className="bg-indigo-100 rounded-full h-8 w-8 flex-shrink-0 flex items-center justify-center text-indigo-600 font-bold mr-3">
                  3
                </div>
                <div>
                  <span className="font-medium text-gray-800">
                    Manage your documents
                  </span>
                  <p className="text-gray-600 mt-1">
                    All your documents appear in the sidebar. You can switch
                    between them or delete them if needed.
                  </p>
                </div>
              </li>
            </ol>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center mb-4">
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center mr-3 text-white"
                  style={getGradientStyle("#10B981", "#059669")}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <h2 className="text-xl font-semibold">
                  Frequently Asked Questions
                </h2>
              </div>

              <div className="space-y-5 mt-5">
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-medium text-gray-800">
                    What file formats are supported?
                  </h3>
                  <p className="text-gray-600 mt-1">
                    Currently, we support PDF, DOC, DOCX, and TXT files.
                  </p>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-medium text-gray-800">
                    Is there a file size limit?
                  </h3>
                  <p className="text-gray-600 mt-1">
                    Yes, the maximum file size is 10MB.
                  </p>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-medium text-gray-800">
                    How accurate are the AI responses?
                  </h3>
                  <p className="text-gray-600 mt-1">
                    The AI provides answers based on the content of your
                    document. While it strives for accuracy, it's always a good
                    idea to verify important information.
                  </p>
                </div>
              </div>
            </div>

            <div
              className="rounded-xl p-6 text-white"
              style={getGradientStyle("#8B5CF6", "#6366F1")}
            >
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center mr-3 text-white">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                </div>
                <h2 className="text-xl font-semibold">Contact Support</h2>
              </div>
              <p className="opacity-90 mb-4">
                Need more help? Contact our support team.
              </p>
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3 inline-block">
                <p className="font-medium">support@documind.com</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

// Profile page wrapper
const ProfilePage = () => (
  <MainLayout>
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Your Profile</h1>
      <UserProfile />
    </div>
  </MainLayout>
);

function App() {
  const { user } = useAuth();

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/auth/sign-up"
          element={user ? <Navigate to="/dashboard" replace /> : <SignUpPage />}
        />
        <Route
          path="/auth/sign-in"
          element={user ? <Navigate to="/dashboard" replace /> : <SignInPage />}
        />

        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/chat"
          element={
            <ProtectedRoute>
              <Chat />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/help"
          element={
            <ProtectedRoute>
              <HelpPage />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
