import React from "react";

const EmptyState = ({ onNewChat }) => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-4 md:p-8 max-w-3xl mx-auto">
      <div className="w-20 h-20 bg-indigo-100 rounded-full flex items-center justify-center mb-8">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-10 w-10 text-indigo-600"
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

      <h1 className="text-3xl font-bold text-gray-800 mb-4 text-center">
        Welcome to DocuMind
      </h1>

      <p className="text-gray-600 text-center mb-8 max-w-lg">
        Your intelligent document assistant. Upload documents and chat with them
        to extract information, gain insights, and get answers to your
        questions.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 w-full">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mb-4">
            <span className="text-blue-600 font-bold">1</span>
          </div>
          <h3 className="font-bold text-lg mb-2">Upload Document</h3>
          <p className="text-gray-600 text-sm">
            Start by uploading a document. We support PDF, DOC, DOCX, and TXT
            formats.
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mb-4">
            <span className="text-green-600 font-bold">2</span>
          </div>
          <h3 className="font-bold text-lg mb-2">Process & Analyze</h3>
          <p className="text-gray-600 text-sm">
            Our AI will process and analyze your document, making it ready for
            conversation.
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mb-4">
            <span className="text-purple-600 font-bold">3</span>
          </div>
          <h3 className="font-bold text-lg mb-2">Chat & Discover</h3>
          <p className="text-gray-600 text-sm">
            Ask questions, get summaries, or extract specific information from
            your document.
          </p>
        </div>
      </div>

      <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">
        Future Enhancements
      </h2>

      <ul className="list-disc list-inside text-gray-600 mb-8 max-w-lg space-y-2">
        <li>Multi-document conversations</li>
        <li>Document comparison</li>
        <li>Collaborative document analysis</li>
        <li>Export conversations to various formats</li>
        <li>Advanced data visualization</li>
      </ul>

      <button
        onClick={onNewChat}
        className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition-colors duration-200 flex items-center"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 mr-2"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
            clipRule="evenodd"
          />
        </svg>
        Start a New Chat
      </button>
    </div>
  );
};

export default EmptyState;
