import React, { useState } from "react";
import { useDocuments } from "../context/DocumentContext";
import { uploadDocument } from "../services/documentService";
import { format } from "date-fns";

const NewChatModal = ({ isOpen, onClose, onSelectDocument }) => {
  const { documents, refreshDocuments } = useDocuments();
  const [tab, setTab] = useState("upload"); // 'upload' or 'existing'
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState(null);

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleUpload = async (e) => {
    e.preventDefault();

    if (!file || !title.trim()) {
      setUploadError("Please provide both a file and title");
      return;
    }

    setIsUploading(true);
    setUploadError(null);

    try {
      const result = await uploadDocument(file, title);
      refreshDocuments();
      onSelectDocument(result.document_id);
      onClose();
    } catch (error) {
      setUploadError(error.message || "Failed to upload document");
      setIsUploading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4 overflow-hidden">
        <div className="flex border-b">
          <button
            className={`flex-1 p-4 text-center ${
              tab === "upload" ? "bg-gray-100 font-medium" : ""
            }`}
            onClick={() => setTab("upload")}
          >
            Upload New Document
          </button>
          <button
            className={`flex-1 p-4 text-center ${
              tab === "existing" ? "bg-gray-100 font-medium" : ""
            }`}
            onClick={() => setTab("existing")}
          >
            Existing Documents
          </button>
        </div>

        <div className="p-6">
          {tab === "upload" ? (
            <form onSubmit={handleUpload}>
              <h3 className="text-lg font-semibold mb-4">Upload a Document</h3>

              {uploadError && (
                <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">
                  {uploadError}
                </div>
              )}

              <div className="mb-4">
                <label className="block text-gray-700 mb-2" htmlFor="title">
                  Document Title
                </label>
                <input
                  id="title"
                  type="text"
                  value={title}
                  onChange={handleTitleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter document title"
                  disabled={isUploading}
                />
              </div>

              <div className="mb-6">
                <label className="block text-gray-700 mb-2" htmlFor="file">
                  Select Document
                </label>
                <input
                  id="file"
                  type="file"
                  onChange={handleFileChange}
                  className="w-full"
                  accept=".pdf,.doc,.docx,.txt"
                  disabled={isUploading}
                />
                <p className="text-sm text-gray-500 mt-1">
                  Accepted formats: PDF, DOC, DOCX, TXT
                </p>
              </div>

              <div className="flex space-x-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50"
                  disabled={isUploading}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isUploading || !file || !title.trim()}
                  className={`flex-1 px-4 py-2 rounded-md text-white font-medium
                    ${
                      isUploading || !file || !title.trim()
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-blue-600 hover:bg-blue-700"
                    }`}
                >
                  {isUploading ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      <span>Uploading...</span>
                    </div>
                  ) : (
                    "Upload & Start Chat"
                  )}
                </button>
              </div>
            </form>
          ) : (
            <div>
              <h3 className="text-lg font-semibold mb-4">Select a Document</h3>

              {documents.length === 0 ? (
                <div className="text-center py-6 text-gray-500">
                  <p>
                    No documents found. Upload a new document to get started.
                  </p>
                  <button
                    onClick={() => setTab("upload")}
                    className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  >
                    Upload New Document
                  </button>
                </div>
              ) : (
                <div className="max-h-64 overflow-y-auto">
                  <ul className="divide-y divide-gray-200">
                    {documents.map((doc) => (
                      <li key={doc.id}>
                        <button
                          onClick={() => {
                            onSelectDocument(doc.id);
                            onClose();
                          }}
                          className="w-full text-left px-4 py-3 hover:bg-gray-50 flex items-start"
                        >
                          <div className="mr-3 text-gray-400 mt-0.5">
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
                          <div>
                            <div className="font-medium">{doc.title}</div>
                            <div className="text-sm text-gray-500">
                              {format(new Date(doc.uploaded_at), "MMM d, yyyy")}
                            </div>
                          </div>
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="mt-6 flex justify-end">
                <button
                  onClick={onClose}
                  className="px-4 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NewChatModal;
