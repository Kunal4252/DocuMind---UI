import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDocuments } from "../context/DocumentContext";
import MainLayout from "../components/layouts/MainLayout";
import NewChatModal from "../components/NewChatModal";
import { format } from "date-fns";

export const Dashboard = () => {
  const { documents, loading, error, refreshDocuments, selectDocument } =
    useDocuments();
  const [showNewChatModal, setShowNewChatModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleNewChat = () => {
    setShowNewChatModal(true);
  };

  const handleSelectDocument = (documentId) => {
    selectDocument(documentId);
    navigate("/chat");
  };

  const handleCloseModal = () => {
    setShowNewChatModal(false);
  };

  const filteredDocuments = documents.filter((doc) =>
    doc.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getGradientStyle = (colorStart, colorEnd) => {
    return {
      background: `linear-gradient(135deg, ${colorStart} 0%, ${colorEnd} 100%)`,
    };
  };

  return (
    <MainLayout>
      <div className="flex flex-col h-full w-full bg-gray-50">
        {/* Dashboard Header */}
        <div className="flex justify-between items-center p-4 lg:px-6 border-b border-gray-200 bg-white">
          <h1 className="text-2xl font-bold text-gray-800">Your Documents</h1>
          <button
            onClick={handleNewChat}
            className="flex items-center justify-center space-x-2 bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-md transition duration-200"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                clipRule="evenodd"
              />
            </svg>
            <span>New Document</span>
          </button>
        </div>

        {/* Search Bar */}
        <div className="bg-white border-b border-gray-200 py-4">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Search documents..."
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Documents Grid */}
        <div className="flex-1 overflow-y-auto p-4 lg:p-6">
          {loading ? (
            <div className="flex justify-center items-center h-32">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-600"></div>
            </div>
          ) : error ? (
            <div className="p-4 bg-red-50 text-red-500 rounded-lg">
              Error loading documents. Please try again.
            </div>
          ) : documents.length === 0 ? (
            <div className="bg-white p-10 rounded-lg shadow-sm text-center">
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-indigo-600"
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
              <h2 className="text-xl font-medium text-gray-800 mb-2">
                No documents yet
              </h2>
              <p className="text-gray-500 mb-6">
                Upload your first document to start chatting with it
              </p>
              <button
                onClick={handleNewChat}
                className="inline-flex items-center justify-center space-x-2 bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-6 rounded-md transition duration-200"
              >
                <span>Upload Document</span>
              </button>
            </div>
          ) : filteredDocuments.length === 0 ? (
            <div className="bg-white p-8 rounded-lg shadow-sm text-center">
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-indigo-600"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <h2 className="text-xl font-medium text-gray-800 mb-2">
                No matching documents
              </h2>
              <p className="text-gray-500 mb-4">
                No documents found matching "{searchQuery}"
              </p>
              <button
                onClick={() => setSearchQuery("")}
                className="text-indigo-600 font-medium hover:text-indigo-800"
              >
                Clear search
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filteredDocuments.map((doc) => (
                <div
                  key={doc.id}
                  onClick={() => handleSelectDocument(doc.id)}
                  className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer border border-gray-200"
                >
                  <div
                    className="h-2 rounded-t-lg"
                    style={getGradientStyle(
                      doc.title.includes("PDF")
                        ? "#F59E0B"
                        : doc.title.includes("DOC")
                        ? "#3B82F6"
                        : doc.title.includes("TXT")
                        ? "#10B981"
                        : "#8B5CF6",
                      doc.title.includes("PDF")
                        ? "#D97706"
                        : doc.title.includes("DOC")
                        ? "#2563EB"
                        : doc.title.includes("TXT")
                        ? "#059669"
                        : "#6366F1"
                    )}
                  ></div>
                  <div className="p-4">
                    <div className="flex items-start mb-3">
                      <div className="bg-indigo-100 p-2 rounded mr-3">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 text-indigo-600"
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
                        <h3 className="font-medium text-gray-800 truncate">
                          {doc.title}
                        </h3>
                        <p className="text-xs text-gray-500">
                          {format(new Date(doc.uploaded_at), "MMM d, yyyy")}
                        </p>
                      </div>
                    </div>
                    <div className="flex justify-end">
                      <button
                        className="text-indigo-600 hover:text-indigo-800 text-sm font-medium"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSelectDocument(doc.id);
                        }}
                      >
                        Chat →
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* New Chat Modal */}
      <NewChatModal
        isOpen={showNewChatModal}
        onClose={handleCloseModal}
        onSelectDocument={handleSelectDocument}
      />
    </MainLayout>
  );
};
