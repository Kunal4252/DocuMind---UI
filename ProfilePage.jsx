"use client";

import { useState, useEffect } from "react";
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

  return (
    <MainLayout>
      <div className="flex flex-col h-full w-full overflow-auto bg-gradient-to-br from-slate-50 to-white dark:from-gray-900 dark:to-gray-800 p-4 md:p-6 transition-colors duration-200">
        {/* Header with gradient */}
        <div className="w-full rounded-2xl p-6 mb-6 text-white shadow-lg transform transition-all duration-300 hover:shadow-xl gradient-primary overflow-hidden relative">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mt-20 -mr-20 backdrop-blur-sm"></div>
          <div className="absolute bottom-0 left-0 w-40 h-40 bg-white/5 rounded-full -mb-20 -ml-10"></div>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center relative z-10">
            <div>
              <h1 className="text-3xl font-bold mb-2 tracking-tight">
                Profile Dashboard
              </h1>
              <p className="opacity-90 text-white/80">
                Manage your account settings and documents
              </p>
            </div>
            <Link
              to="/dashboard"
              className="px-5 py-2.5 bg-white/20 backdrop-blur-sm text-white rounded-lg mt-4 md:mt-0 hover:bg-white/30 transition-all duration-200 font-medium flex items-center justify-center group"
            >
              <span>Back to Dashboard</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 ml-1 group-hover:translate-x-1 transition-transform duration-200"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Main profile card */}
          <div className="md:col-span-2 bg-white dark:bg-gray-800 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden border border-gray-100 dark:border-gray-700">
            <div className="h-28 w-full bg-gradient-to-r from-blue-600 to-emerald-600 transition-all duration-300 relative">
              <div className="absolute inset-0 bg-black/10 backdrop-blur-[1px]"></div>
              <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -mt-10 -mr-10"></div>
            </div>
            <div className="p-6 -mt-14 relative z-10">
              <UserProfile />
            </div>
          </div>

          {/* Stats and activity sidebar */}
          <div className="flex flex-col space-y-6">
            {/* Account info card */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 p-6 border border-gray-100 dark:border-gray-700">
              <h2 className="text-xl font-semibold mb-4 dark:text-white gradient-text">
                Account Information
              </h2>
              <div className="space-y-4">
                <div className="border-b dark:border-gray-700 pb-3">
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Email
                  </p>
                  <p className="font-medium dark:text-white">
                    {user?.email || "Not available"}
                  </p>
                </div>
                <div className="border-b dark:border-gray-700 pb-3">
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Member Since
                  </p>
                  <p className="font-medium dark:text-white">
                    {user?.metadata?.creationTime
                      ? new Date(
                          user.metadata.creationTime
                        ).toLocaleDateString()
                      : "Not available"}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Account Type
                  </p>
                  <div className="flex items-center mt-1">
                    <span className="font-medium dark:text-white">
                      Free Plan
                    </span>
                    <span className="ml-2 px-2 py-0.5 bg-gradient-to-r from-blue-500 to-blue-600 text-white text-xs rounded-full">
                      Active
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Stats cards */}
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-2xl p-5 text-white shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1 gradient-secondary overflow-hidden relative group">
                <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -mt-10 -mr-10 group-hover:scale-110 transition-transform duration-300"></div>
                <h3 className="text-2xl font-bold mb-1">
                  {stats.totalDocuments}
                </h3>
                <p className="text-sm opacity-90">Total Documents</p>
              </div>

              <div className="rounded-2xl p-5 text-white shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1 gradient-primary overflow-hidden relative group">
                <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -mt-10 -mr-10 group-hover:scale-110 transition-transform duration-300"></div>
                <h3 className="text-2xl font-bold mb-1">
                  {stats.recentActivity}
                </h3>
                <p className="text-sm opacity-90">Recent Activity</p>
              </div>
            </div>

            {/* Storage usage */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 p-6 border border-gray-100 dark:border-gray-700">
              <div className="flex justify-between items-center mb-3">
                <h3 className="font-semibold dark:text-white">Storage Usage</h3>
                <span className="text-sm text-gray-500 dark:text-gray-400 font-medium">
                  {stats.storage.used} MB / {stats.storage.total} MB
                </span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
                <div
                  className="h-3 rounded-full transition-all duration-500 ease-in-out"
                  style={{
                    width: `${
                      (stats.storage.used / stats.storage.total) * 100
                    }%`,
                    background: `linear-gradient(90deg, #10B981 0%, ${
                      stats.storage.used / stats.storage.total > 0.8
                        ? "#F59E0B"
                        : "#059669"
                    } 100%)`,
                  }}
                ></div>
              </div>
              <div className="flex justify-between mt-2">
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {Math.round((stats.storage.used / stats.storage.total) * 100)}
                  % of your storage used
                </p>
                {stats.storage.used / stats.storage.total > 0.8 && (
                  <p className="text-xs text-amber-600 dark:text-amber-400 font-medium flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-3 w-3 mr-1"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Almost full
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default ProfilePage;
