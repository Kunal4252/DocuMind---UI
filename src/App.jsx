import "./App.css";
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
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
const HelpPage = () => (
  <MainLayout>
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Help & FAQ</h1>

      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">How to Use DocuMind</h2>
        <ol className="list-decimal list-inside space-y-4 ml-4">
          <li>
            <span className="font-medium">Create a new chat</span>
            <p className="text-gray-600 ml-6 mt-1">
              Click the "New Chat" button in the sidebar to start a new
              conversation. You can either upload a new document or select an
              existing one.
            </p>
          </li>
          <li>
            <span className="font-medium">Chat with your document</span>
            <p className="text-gray-600 ml-6 mt-1">
              Once a document is selected, you can ask questions about it. The
              AI will provide answers based on the document's content.
            </p>
          </li>
          <li>
            <span className="font-medium">Manage your documents</span>
            <p className="text-gray-600 ml-6 mt-1">
              All your documents appear in the sidebar. You can switch between
              them or delete them if needed.
            </p>
          </li>
        </ol>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">
          Frequently Asked Questions
        </h2>

        <div className="space-y-4">
          <div>
            <h3 className="font-medium">What file formats are supported?</h3>
            <p className="text-gray-600 ml-4 mt-1">
              Currently, we support PDF, DOC, DOCX, and TXT files.
            </p>
          </div>

          <div>
            <h3 className="font-medium">Is there a file size limit?</h3>
            <p className="text-gray-600 ml-4 mt-1">
              Yes, the maximum file size is 10MB.
            </p>
          </div>

          <div>
            <h3 className="font-medium">How accurate are the AI responses?</h3>
            <p className="text-gray-600 ml-4 mt-1">
              The AI provides answers based on the content of your document.
              While it strives for accuracy, it's always a good idea to verify
              important information.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Contact Support</h2>
        <p className="text-gray-600 mb-4">
          Need more help? Contact our support team.
        </p>
        <p className="font-medium">Email: support@documind.com</p>
      </div>
    </div>
  </MainLayout>
);

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
