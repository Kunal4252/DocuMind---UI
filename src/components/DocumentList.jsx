import React from "react";
import { useDocuments } from "../context/DocumentContext";
import { format } from "date-fns";

const DocumentList = ({ onSelectDocument }) => {
  const { documents, loading, error, selectDocument } = useDocuments();

  if (loading) {
    return (
      <div className="p-4 bg-white rounded-lg shadow-md">
        <div className="flex justify-center items-center h-40">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-700"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-white rounded-lg shadow-md">
        <div className="text-red-600 p-4 text-center">
          <p>Error: {error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (documents.length === 0) {
    return (
      <div className="p-4 bg-white rounded-lg shadow-md">
        <div className="text-center p-6">
          <h3 className="text-lg font-medium text-gray-700">
            No documents yet
          </h3>
          <p className="text-gray-500 mt-2">Upload a document to get started</p>
        </div>
      </div>
    );
  }

  const handleDocumentClick = (docId) => {
    selectDocument(docId);
    if (onSelectDocument) {
      onSelectDocument(docId);
    }
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Your Documents</h2>
      <div className="space-y-3">
        {documents.map((doc) => (
          <div
            key={doc.id}
            onClick={() => handleDocumentClick(doc.id)}
            className="p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
          >
            <div className="flex items-center justify-between">
              <h3 className="font-medium text-lg text-gray-800">{doc.title}</h3>
              <span className="text-sm text-gray-500">
                {format(new Date(doc.uploaded_at), "MMM d, yyyy")}
              </span>
            </div>
            <div className="mt-2 flex items-center text-sm text-gray-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 mr-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              <span>Click to chat with this document</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DocumentList;
