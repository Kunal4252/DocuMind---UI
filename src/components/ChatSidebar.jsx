import React, { useState } from "react";
import { useDocuments } from "../context/DocumentContext";
import { format } from "date-fns";
import { deleteDocument } from "../services/documentService";

const ChatSidebar = ({ onSelectDocument, onNewChat, selectedDocumentId }) => {
  const { documents, loading, error, refreshDocuments } = useDocuments();
  const [deletingId, setDeletingId] = useState(null);

  const handleDeleteDocument = async (docId, e) => {
    e.stopPropagation(); // Prevent triggering the parent onClick

    if (window.confirm("Are you sure you want to delete this document?")) {
      try {
        setDeletingId(docId);
        await deleteDocument(docId);
        refreshDocuments(); // Refresh the documents list

        // If the deleted document was selected, clear selection
        if (selectedDocumentId === docId) {
          onSelectDocument(null);
        }
      } catch (error) {
        console.error("Error deleting document:", error);
        alert("Failed to delete document: " + error.message);
      } finally {
        setDeletingId(null);
      }
    }
  };

  return (
    <div className="bg-white text-gray-800 flex flex-col h-full overflow-hidden">
      {/* New Chat Button - fixed at top */}
      <div className="p-3 flex-shrink-0 border-b border-gray-200">
        <button
          onClick={onNewChat}
          className="w-full flex items-center justify-center space-x-2 bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-3 rounded-md transition duration-200 text-sm"
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
          <span>New Chat</span>
        </button>
      </div>

      {/* Documents/Chats List - scrollable */}
      <div className="flex-1 overflow-y-auto">
        <div className="px-3 py-2 text-xs text-gray-500 uppercase font-medium">
          Your chats
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-20">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-indigo-600"></div>
          </div>
        ) : error ? (
          <div className="text-red-500 text-sm p-3">
            Error loading chats. Please try again.
          </div>
        ) : documents.length === 0 ? (
          <div className="text-gray-500 text-sm p-3">
            No documents yet. Start by creating a new chat.
          </div>
        ) : (
          <ul className="space-y-1 px-2">
            {documents.map((doc) => (
              <li key={doc.id}>
                <button
                  onClick={() => onSelectDocument(doc.id)}
                  className={`w-full text-left px-3 py-2 rounded-md transition-colors duration-200 flex items-start hover:bg-gray-100 group ${
                    selectedDocumentId === doc.id
                      ? "bg-indigo-50 text-indigo-700"
                      : ""
                  }`}
                >
                  <div className="mr-2 text-gray-500 mt-0.5">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
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
                  <div className="flex-1 truncate">
                    <div className="text-sm truncate">{doc.title}</div>
                    <div className="text-xs text-gray-400 truncate">
                      {format(new Date(doc.uploaded_at), "MMM d, yyyy")}
                    </div>
                  </div>
                  <div className="opacity-0 group-hover:opacity-100">
                    <div
                      role="button"
                      tabIndex={0}
                      onClick={(e) => handleDeleteDocument(doc.id, e)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          handleDeleteDocument(doc.id, e);
                        }
                      }}
                      className="text-gray-400 hover:text-red-500 p-1 cursor-pointer"
                      aria-label="Delete document"
                      style={{
                        pointerEvents: deletingId === doc.id ? "none" : "auto",
                      }}
                    >
                      {deletingId === doc.id ? (
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-indigo-600"></div>
                      ) : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                            clipRule="evenodd"
                          />
                        </svg>
                      )}
                    </div>
                  </div>
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* User Info/Settings - fixed at bottom */}
      <div className="p-4 border-t border-gray-200 flex-shrink-0">
        <div className="text-xs text-gray-500">DocuMind AI Assistant</div>
      </div>
    </div>
  );
};

export default ChatSidebar;
