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

  return (
    <MainLayout>
      <div className="min-h-full w-full bg-gradient-to-br from-slate-50 via-white to-purple-50 overflow-y-auto">
        {/* Hero Header Section */}
        <div className="relative overflow-hidden bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 text-white">
          {/* Decorative Elements */}
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-white/10 rounded-full blur-2xl opacity-70"></div>
          <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-indigo-800/20 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-purple-500/30 rounded-full blur-xl"></div>
          <div className="absolute bottom-1/4 right-1/3 w-32 h-32 bg-indigo-500/20 rounded-full blur-xl"></div>

          {/* Content */}
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
              <div>
                <h1 className="text-4xl font-bold tracking-tight mb-2">
                  Profile Dashboard
                </h1>
                <p className="text-indigo-100 text-lg max-w-2xl">
                  Manage your account settings, view your documents, and track
                  your storage usage
                </p>
              </div>
              <Link
                to="/dashboard"
                className="mt-6 md:mt-0 bg-white/20 backdrop-blur-sm text-white px-6 py-3 rounded-lg hover:bg-white/30 transition-all duration-300 flex items-center group shadow-lg hover:shadow-xl"
              >
                <span>Back to Dashboard</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 ml-2 transform group-hover:translate-x-1 transition-transform duration-300"
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

          {/* Curved bottom */}
          <div className="absolute bottom-0 left-0 right-0 h-16">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 1440 320"
              className="absolute bottom-0 w-full h-full"
            >
              <path
                fill="#f8fafc"
                fillOpacity="1"
                d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,117.3C672,107,768,117,864,144C960,171,1056,213,1152,202.7C1248,192,1344,128,1392,96L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
              ></path>
            </svg>
          </div>
        </div>

        {/* Main Content */}
        <div className="relative z-10 -mt-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Profile Section */}
            <div className="md:col-span-2 space-y-8">
              {/* User Profile Card */}
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 transform transition-all duration-300 hover:shadow-2xl">
                <div className="bg-gradient-to-r from-blue-500 to-cyan-500 h-32 relative">
                  {/* Decorative pattern */}
                  <div className="absolute inset-0 opacity-20">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="100%"
                      height="100%"
                    >
                      <defs>
                        <pattern
                          id="smallGrid"
                          width="10"
                          height="10"
                          patternUnits="userSpaceOnUse"
                        >
                          <path
                            d="M 10 0 L 0 0 0 10"
                            fill="none"
                            stroke="white"
                            strokeWidth="0.5"
                          />
                        </pattern>
                      </defs>
                      <rect width="100%" height="100%" fill="url(#smallGrid)" />
                    </svg>
                  </div>
                </div>
                <div className="px-8 pt-8 pb-10 -mt-16 relative">
                  <div className="mb-6">
                    <UserProfile />
                  </div>

                  {/* Quick Stats Row */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
                    <div className="bg-indigo-50 rounded-xl p-4 flex flex-col items-center justify-center">
                      <div className="text-indigo-500 bg-indigo-100 p-2 rounded-full mb-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <div className="text-2xl font-bold text-gray-800">
                        {stats.totalDocuments}
                      </div>
                      <div className="text-sm text-gray-500">Documents</div>
                    </div>

                    <div className="bg-purple-50 rounded-xl p-4 flex flex-col items-center justify-center">
                      <div className="text-purple-500 bg-purple-100 p-2 rounded-full mb-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <div className="text-2xl font-bold text-gray-800">
                        {stats.recentActivity}
                      </div>
                      <div className="text-sm text-gray-500">Recent</div>
                    </div>

                    <div className="bg-emerald-50 rounded-xl p-4 flex flex-col items-center justify-center">
                      <div className="text-emerald-500 bg-emerald-100 p-2 rounded-full mb-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <div className="text-2xl font-bold text-gray-800">
                        {Math.round(
                          (stats.storage.used / stats.storage.total) * 100
                        )}
                        %
                      </div>
                      <div className="text-sm text-gray-500">Storage</div>
                    </div>

                    <div className="bg-amber-50 rounded-xl p-4 flex flex-col items-center justify-center">
                      <div className="text-amber-500 bg-amber-100 p-2 rounded-full mb-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                        </svg>
                      </div>
                      <div className="text-2xl font-bold text-gray-800">
                        {userProfile?.connections || 0}
                      </div>
                      <div className="text-sm text-gray-500">Connections</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Activity Section */}
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
                <div className="px-6 py-5 border-b border-gray-100">
                  <h2 className="text-xl font-bold gradient-text">
                    Recent Activity
                  </h2>
                </div>
                <div className="p-6">
                  {documents && documents.length > 0 ? (
                    <div className="space-y-4">
                      {documents.slice(0, 5).map((doc) => (
                        <div
                          key={doc.id}
                          className="flex items-start p-3 hover:bg-gray-50 rounded-xl transition-colors"
                        >
                          <div className="bg-blue-100 p-2 rounded-lg mr-4 text-blue-600">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fillRule="evenodd"
                                d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </div>
                          <div className="flex-1">
                            <div className="flex justify-between items-center mb-1">
                              <h3 className="font-medium text-gray-800">
                                {doc.title}
                              </h3>
                              <span className="text-xs text-gray-500">
                                {new Date(doc.uploaded_at).toLocaleDateString()}
                              </span>
                            </div>
                            <p className="text-sm text-gray-500">
                              Document was uploaded{" "}
                              {Math.floor(
                                (new Date() - new Date(doc.uploaded_at)) /
                                  (1000 * 60 * 60 * 24)
                              )}{" "}
                              days ago
                            </p>
                          </div>
                        </div>
                      ))}
                      {documents.length > 5 && (
                        <div className="text-center pt-4">
                          <Link
                            to="/dashboard"
                            className="text-indigo-600 hover:text-indigo-800 font-medium text-sm inline-flex items-center"
                          >
                            See all documents
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-4 w-4 ml-1"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fillRule="evenodd"
                                d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </Link>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <div className="w-16 h-16 bg-gray-100 rounded-full mx-auto flex items-center justify-center mb-4">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-8 w-8 text-gray-400"
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
                      <h3 className="text-lg font-medium text-gray-900 mb-1">
                        No activity yet
                      </h3>
                      <p className="text-gray-500 mb-4">
                        You haven't uploaded any documents
                      </p>
                      <Link
                        to="/dashboard"
                        className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                      >
                        Upload your first document
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Account info card */}
              <div className="bg-white rounded-2xl shadow-lg transition-all duration-300 hover:shadow-xl p-6 border border-gray-100">
                <div className="flex items-center mb-5">
                  <span className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center mr-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-indigo-600"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                  <h2 className="text-xl font-bold text-gray-800">
                    Account Information
                  </h2>
                </div>
                <div className="space-y-4">
                  <div className="border-b border-gray-100 pb-4">
                    <p className="text-sm text-gray-500 mb-1">Email</p>
                    <div className="flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 text-gray-400 mr-2"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                      </svg>
                      <p className="font-medium text-gray-800">
                        {user?.email || "Not available"}
                      </p>
                    </div>
                  </div>
                  <div className="border-b border-gray-100 pb-4">
                    <p className="text-sm text-gray-500 mb-1">Member Since</p>
                    <div className="flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 text-gray-400 mr-2"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <p className="font-medium text-gray-800">
                        {user?.metadata?.creationTime
                          ? new Date(
                              user.metadata.creationTime
                            ).toLocaleDateString()
                          : "Not available"}
                      </p>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Account Type</p>
                    <div className="flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 text-gray-400 mr-2"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="font-medium text-gray-800">
                        Free Plan
                      </span>
                      <span className="ml-2 px-2 py-0.5 bg-gradient-to-r from-green-500 to-green-600 text-white text-xs rounded-full">
                        Active
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-8">
                  <button className="w-full bg-indigo-50 text-indigo-600 py-2 rounded-lg hover:bg-indigo-100 transition-colors font-medium flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 mr-2"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                    </svg>
                    Edit Profile
                  </button>
                </div>
              </div>

              {/* Storage usage */}
              <div className="bg-white rounded-2xl shadow-lg transition-all duration-300 hover:shadow-xl p-6 border border-gray-100">
                <div className="flex items-center mb-5">
                  <span className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-blue-600"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z" />
                    </svg>
                  </span>
                  <h2 className="text-xl font-bold text-gray-800">
                    Storage Usage
                  </h2>
                </div>

                <div className="mb-5">
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-gray-400 mr-2"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M2 9.5A3.5 3.5 0 005.5 13H9v2.586l-1.293-1.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 15.586V13h2.5a4.5 4.5 0 10-.616-8.958 4.002 4.002 0 10-7.753 1.977A3.5 3.5 0 002 9.5zm9 3.5H9V8a1 1 0 012 0v5z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="font-medium text-gray-700">
                        Storage Space
                      </span>
                    </div>
                    <span className="text-sm text-gray-500 font-medium">
                      {stats.storage.used} MB / {stats.storage.total} MB
                    </span>
                  </div>

                  <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-500 ease-in-out relative overflow-hidden"
                      style={{
                        width: `${
                          (stats.storage.used / stats.storage.total) * 100
                        }%`,
                      }}
                    >
                      <div
                        className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-600 animate-pulse-subtle"
                        style={{
                          background: `linear-gradient(90deg, ${
                            stats.storage.used / stats.storage.total > 0.8
                              ? "#F59E0B"
                              : "#3B82F6"
                          }, ${
                            stats.storage.used / stats.storage.total > 0.8
                              ? "#EF4444"
                              : "#6366F1"
                          })`,
                        }}
                      ></div>
                    </div>
                  </div>

                  <div className="flex justify-between mt-2">
                    <p className="text-xs text-gray-500">
                      {Math.round(
                        (stats.storage.used / stats.storage.total) * 100
                      )}
                      % used
                    </p>
                    {stats.storage.used / stats.storage.total > 0.8 && (
                      <p className="text-xs text-amber-600 font-medium flex items-center">
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

                {/* Storage breakdown */}
                <div className="space-y-3 mt-6">
                  <h3 className="text-sm font-medium text-gray-700 mb-3">
                    Storage Breakdown
                  </h3>

                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-amber-500 rounded-full mr-2"></div>
                      <span className="text-sm text-gray-600">
                        PDF Documents
                      </span>
                    </div>
                    <span className="text-sm font-medium">
                      {Math.round(stats.storage.used * 0.45)} MB
                    </span>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                      <span className="text-sm text-gray-600">
                        Word Documents
                      </span>
                    </div>
                    <span className="text-sm font-medium">
                      {Math.round(stats.storage.used * 0.35)} MB
                    </span>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                      <span className="text-sm text-gray-600">Text Files</span>
                    </div>
                    <span className="text-sm font-medium">
                      {Math.round(stats.storage.used * 0.15)} MB
                    </span>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-purple-500 rounded-full mr-2"></div>
                      <span className="text-sm text-gray-600">Other Files</span>
                    </div>
                    <span className="text-sm font-medium">
                      {Math.round(stats.storage.used * 0.05)} MB
                    </span>
                  </div>
                </div>

                <div className="mt-6">
                  <button className="w-full border border-gray-200 text-gray-600 py-2 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 mr-2"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Upgrade Storage
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default ProfilePage;
