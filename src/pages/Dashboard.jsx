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

  const getDocTypeColors = (title) => {
    if (title.includes("PDF")) {
      return {
        primary: "#F59E0B",
        secondary: "#D97706",
        icon: "text-amber-600 bg-amber-100",
      };
    } else if (title.includes("DOC")) {
      return {
        primary: "#3B82F6",
        secondary: "#2563EB",
        icon: "text-blue-600 bg-blue-100",
      };
    } else if (title.includes("TXT")) {
      return {
        primary: "#10B981",
        secondary: "#059669",
        icon: "text-emerald-600 bg-emerald-100",
      };
    } else {
      return {
        primary: "#8B5CF6",
        secondary: "#6366F1",
        icon: "text-indigo-600 bg-indigo-100",
      };
    }
  };

  return (
    <MainLayout>
      <div className="flex flex-col h-full w-full bg-gradient-to-br from-slate-50 to-white">
        {/* Dashboard Header */}
        <div className="relative overflow-hidden gradient-primary text-white p-6 lg:px-8 shadow-md">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mt-20 -mr-20 backdrop-blur-sm"></div>
          <div className="absolute bottom-0 left-0 w-40 h-40 bg-white/5 rounded-full -mb-20 -ml-10"></div>
          <div className="flex justify-between items-center relative z-10">
            <div>
              <h1 className="text-2xl font-bold tracking-tight mb-1">
                Your Documents
              </h1>
              <p className="text-white/80 text-sm">
                {documents.length} document{documents.length !== 1 ? "s" : ""}{" "}
                in your library
              </p>
            </div>
            <button
              onClick={handleNewChat}
              className="flex items-center justify-center space-x-2 bg-white/20 backdrop-blur-sm text-white py-2 px-5 rounded-lg transition-all duration-200 hover:bg-white/30 shadow-sm hover:shadow group"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 group-hover:scale-110 transition-transform duration-200"
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
        </div>

        {/* Search Bar */}
        <div className="bg-white border-b border-gray-100 shadow-sm py-4">
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
                className="block w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
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
              <div className="animate-spin rounded-full h-10 w-10 border-t-indigo-600 border-r-transparent border-b-purple-600 border-l-transparent border-2"></div>
            </div>
          ) : error ? (
            <div className="p-4 bg-red-50 border border-red-100 text-red-700 rounded-lg flex items-center gap-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-red-500"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
              Error loading documents. Please try again.
            </div>
          ) : documents.length === 0 ? (
            <div className="bg-white p-10 rounded-2xl shadow-sm text-center border border-gray-100">
              <div className="w-20 h-20 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-9 w-9 text-indigo-600"
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
                className="inline-flex items-center justify-center space-x-2 btn-primary px-6 py-2.5"
              >
                <span>Upload Document</span>
              </button>
            </div>
          ) : filteredDocuments.length === 0 ? (
            <div className="bg-white p-8 rounded-2xl shadow-sm text-center border border-gray-100">
              <div className="w-16 h-16 gradient-secondary rounded-full flex items-center justify-center mx-auto mb-4 text-white">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8"
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
                className="text-indigo-600 font-medium hover:text-indigo-800 underline underline-offset-2"
              >
                Clear search
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {filteredDocuments.map((doc) => {
                const docTypeColors = getDocTypeColors(doc.title);
                return (
                  <div
                    key={doc.id}
                    onClick={() => handleSelectDocument(doc.id)}
                    className="group bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer border border-gray-100 overflow-hidden transform hover:-translate-y-1 relative"
                  >
                    <div
                      className="h-2.5 rounded-t-xl"
                      style={{
                        background: `linear-gradient(90deg, ${docTypeColors.primary} 0%, ${docTypeColors.secondary} 100%)`,
                      }}
                    ></div>
                    <div className="p-5">
                      <div className="flex items-start mb-3">
                        <div
                          className={`p-2.5 rounded-lg mr-3 ${docTypeColors.icon}`}
                        >
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
                          <h3 className="font-medium text-gray-800 truncate mb-1">
                            {doc.title}
                          </h3>
                          <p className="text-xs text-gray-500">
                            {format(new Date(doc.uploaded_at), "MMM d, yyyy")}
                          </p>
                        </div>
                      </div>
                      <div className="flex justify-end">
                        <button
                          className="flex items-center text-indigo-600 hover:text-indigo-800 text-sm font-medium group-hover:bg-indigo-50 px-3 py-1 rounded-md transition-colors duration-200 relative z-10"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleSelectDocument(doc.id);
                          }}
                        >
                          <span>Chat</span>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform duration-200"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
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
