import React, { useState } from "react";
import { uploadDocument } from "../services/documentService";
import { useDocuments } from "../context/DocumentContext";

const DocumentUpload = () => {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState(null);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  const { refreshDocuments } = useDocuments();

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file || !title.trim()) {
      setUploadError("Please provide both a file and title");
      return;
    }

    setIsUploading(true);
    setUploadError(null);
    setUploadSuccess(false);

    try {
      await uploadDocument(file, title);
      setUploadSuccess(true);
      setFile(null);
      setTitle("");
      // Refresh the documents list after upload
      refreshDocuments();
    } catch (error) {
      setUploadError(error.message || "Failed to upload document");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Upload Document</h2>

      {uploadSuccess && (
        <div className="mb-4 p-2 bg-green-100 text-green-700 rounded">
          Document uploaded successfully!
        </div>
      )}

      {uploadError && (
        <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">
          {uploadError}
        </div>
      )}

      <form onSubmit={handleSubmit}>
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

        <div className="mb-4">
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

        <button
          type="submit"
          disabled={isUploading || !file || !title.trim()}
          className={`w-full py-2 px-4 rounded-md text-white font-medium
            ${
              isUploading || !file || !title.trim()
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
        >
          {isUploading ? "Uploading..." : "Upload Document"}
        </button>
      </form>
    </div>
  );
};

export default DocumentUpload;
