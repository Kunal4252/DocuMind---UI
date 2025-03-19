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
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-4">
        <h2 className="text-2xl font-bold text-white">Upload Document</h2>
        <p className="text-indigo-100 text-sm mt-1">Upload your PDF, DOC, DOCX or TXT files</p>
      </div>

      <div className="p-6">
        {uploadSuccess && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 text-green-700 rounded-lg flex items-center">
            <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            Document uploaded successfully!
          </div>
        )}

        {uploadError && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg flex items-center">
            <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
            {uploadError}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-700 font-medium mb-2" htmlFor="title">
              Document Title
            </label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={handleTitleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter a descriptive title"
              disabled={isUploading}
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2" htmlFor="file">
              Select Document
            </label>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg hover:border-indigo-500 transition-colors">
              <div className="space-y-1 text-center">
                <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                  <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <div className="flex text-sm text-gray-600">
                  <label htmlFor="file" className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none">
                    <span>Upload a file</span>
                    <input 
                      id="file" 
                      type="file" 
                      onChange={handleFileChange} 
                      className="sr-only"
                      accept=".pdf,.doc,.docx,.txt"
                      disabled={isUploading} 
                    />
                  </label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs text-gray-500">PDF, DOC, DOCX, TXT up to 10MB</p>
                {file && (
                  <p className="text-sm text-indigo-600 font-medium mt-2">
                    Selected: {file.name}
                  </p>
                )}
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={isUploading || !file || !title.trim()}
            className={`w-full py-3 px-4 rounded-lg text-white font-medium shadow-sm transition-colors
              ${
                isUploading || !file || !title.trim()
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
              }`}
          >
            {isUploading ? (
              <div className="flex items-center justify-center">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                Uploading...
              </div>
            ) : (
              "Upload Document"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default DocumentUpload;
