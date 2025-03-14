import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/ui/Button";
import { useAuth } from "../hooks/useAuth";
import { logout } from "../services/authService";
import LoadingSpinner from "../components/ui/LoadingSpinner";

export const Dashboard = () => {
  const { user, loading } = useAuth();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [activeTab, setActiveTab] = useState("documents");
  const navigate = useNavigate();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);
      await logout();
      navigate("/auth/sign-in");
    } catch (error) {
      console.error("Logout error:", error.message);
    } finally {
      setIsLoggingOut(false);
    }
  };

  // Sample data for demo purposes
  const recentDocuments = [
    { id: 1, name: "Project Proposal", type: "PDF", date: "2023-05-10" },
    { id: 2, name: "Meeting Notes", type: "DOCX", date: "2023-05-08" },
    { id: 3, name: "Financial Report", type: "XLSX", date: "2023-05-05" },
    { id: 4, name: "Technical Documentation", type: "PDF", date: "2023-05-02" },
  ];

  const stats = [
    { label: "Documents", value: 24 },
    { label: "Analyzed", value: 18 },
    { label: "Shared", value: 7 },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Dashboard Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-indigo-600">DocuMind</h1>
          <div className="flex items-center space-x-4">
            {user && (
              <div className="hidden md:flex items-center">
                <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold">
                  {user.email?.charAt(0).toUpperCase() || "U"}
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-700">
                    {user.email}
                  </p>
                </div>
              </div>
            )}
            <Button
              onClick={handleLogout}
              variant="secondary"
              loading={isLoggingOut}
              className="text-sm"
            >
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      {/* Dashboard Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="card p-6 hover:shadow-lg transition-all duration-300"
            >
              <p className="text-sm text-gray-500 font-medium">{stat.label}</p>
              <p className="text-3xl font-bold text-indigo-600 mt-2">
                {stat.value}
              </p>
            </div>
          ))}
        </div>

        {/* Main Dashboard Tabs */}
        <div className="bg-white shadow rounded-xl overflow-hidden">
          {/* Tabs */}
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px">
              {["documents", "analytics", "settings"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`py-4 px-6 font-medium text-sm border-b-2 transition-colors duration-200 ${
                    activeTab === tab
                      ? "border-indigo-500 text-indigo-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === "documents" && (
              <>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-lg font-medium">Recent Documents</h2>
                  <Button variant="primary" className="px-4 py-2 text-sm">
                    Upload New
                  </Button>
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Name
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Type
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Date
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {recentDocuments.map((doc) => (
                        <tr key={doc.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4">{doc.name}</td>
                          <td className="px-6 py-4">{doc.type}</td>
                          <td className="px-6 py-4">{doc.date}</td>
                          <td className="px-6 py-4">
                            <button className="text-indigo-600">View</button>
                            <button className="text-indigo-600 ml-2">
                              Edit
                            </button>
                            <button className="text-red-600 ml-2">
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </>
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="max-w-7xl mx-auto px-4 py-6 text-center">
          <p className="text-gray-500 text-sm">
            &copy; 2023 DocuMind. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};
