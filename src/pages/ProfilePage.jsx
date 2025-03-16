import React, { useState, useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import { useUser } from "../context/UserContext";
import { useDocuments } from "../context/DocumentContext";
import MainLayout from "../components/layouts/MainLayout";
import UserProfile from "../components/UserProfile";
import { Link } from "react-router-dom";

const ProfilePage = () => {
  const { user } = useAuth();
  const { userProfile } = useUser();
  const { documents } = useDocuments();
  const [stats, setStats] = useState({
    totalDocuments: 0,
    recentActivity: 0,
    storage: {
      used: 0,
      total: 1000, // 1GB limit for example
    },
  });

  // Calculate user stats
  useEffect(() => {
    if (documents) {
      const now = new Date();
      const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

      // Calculate how many documents were created in the last 30 days
      const recentDocs = documents.filter(
        (doc) => new Date(doc.uploaded_at) > thirtyDaysAgo
      ).length;

      // Rough estimation of storage - just for display
      const storageUsed = documents.length * 2.5; // Assuming 2.5MB per document

      setStats({
        totalDocuments: documents.length,
        recentActivity: recentDocs,
        storage: {
          used: storageUsed,
          total: 1000,
        },
      });
    }
  }, [documents]);

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
          style={getGradientStyle("#4F46E5", "#7C3AED")}
        >
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div>
              <h1 className="text-3xl font-bold mb-2">Profile Dashboard</h1>
              <p className="opacity-90">
                Manage your account settings and documents
              </p>
            </div>
            <Link
              to="/dashboard"
              className="px-4 py-2 bg-white/20 backdrop-blur-sm text-white rounded-lg mt-4 md:mt-0 hover:bg-white/30 transition"
            >
              Back to Dashboard
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Main profile card */}
          <div className="md:col-span-2 bg-white rounded-xl shadow-sm overflow-hidden">
            <div
              className="h-20 w-full"
              style={getGradientStyle("#3B82F6", "#10B981")}
            ></div>
            <div className="p-6 -mt-12">
              <UserProfile />
            </div>
          </div>

          {/* Stats and activity sidebar */}
          <div className="flex flex-col space-y-6">
            {/* Account info card */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-semibold mb-4">
                Account Information
              </h2>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="font-medium">
                    {user?.email || "Not available"}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Member Since</p>
                  <p className="font-medium">
                    {user?.metadata?.creationTime
                      ? new Date(
                          user.metadata.creationTime
                        ).toLocaleDateString()
                      : "Not available"}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Account Type</p>
                  <p className="font-medium">Free Plan</p>
                </div>
              </div>
            </div>

            {/* Stats cards */}
            <div className="grid grid-cols-2 gap-4">
              <div
                className="rounded-xl p-4 text-white shadow-sm"
                style={getGradientStyle("#3B82F6", "#2563EB")}
              >
                <h3 className="text-lg font-semibold">
                  {stats.totalDocuments}
                </h3>
                <p className="text-sm opacity-90">Total Documents</p>
              </div>

              <div
                className="rounded-xl p-4 text-white shadow-sm"
                style={getGradientStyle("#8B5CF6", "#6366F1")}
              >
                <h3 className="text-lg font-semibold">
                  {stats.recentActivity}
                </h3>
                <p className="text-sm opacity-90">Recent Activity</p>
              </div>
            </div>

            {/* Storage usage */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-semibold">Storage Usage</h3>
                <span className="text-sm text-gray-500">
                  {stats.storage.used} MB / {stats.storage.total} MB
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className="h-2.5 rounded-full"
                  style={{
                    width: `${
                      (stats.storage.used / stats.storage.total) * 100
                    }%`,
                    ...getGradientStyle("#10B981", "#059669"),
                  }}
                ></div>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                {Math.round((stats.storage.used / stats.storage.total) * 100)}%
                of your storage used
              </p>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default ProfilePage;
