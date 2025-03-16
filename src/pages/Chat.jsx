import React, { useState } from "react";
import { useDocuments } from "../context/DocumentContext";
import DocumentChat from "../components/DocumentChat";
import MainLayout from "../components/layouts/MainLayout";
import ChatSidebar from "../components/ChatSidebar";
import NewChatModal from "../components/NewChatModal";
import EmptyState from "../components/EmptyState";

export const Chat = () => {
  const { selectedDocument, selectDocument } = useDocuments();
  const [showNewChatModal, setShowNewChatModal] = useState(false);

  const handleNewChat = () => {
    setShowNewChatModal(true);
  };

  const handleSelectDocument = (documentId) => {
    selectDocument(documentId);
  };

  const handleCloseModal = () => {
    setShowNewChatModal(false);
  };

  return (
    <MainLayout>
      <div className="flex h-full w-full overflow-hidden">
        {/* Chat Sidebar - make narrower and fixed width */}
        <div className="h-full w-64 flex-shrink-0 border-r border-gray-200">
          <ChatSidebar
            onSelectDocument={handleSelectDocument}
            onNewChat={handleNewChat}
            selectedDocumentId={selectedDocument?.id}
          />
        </div>

        {/* Main Chat Area - take full remaining width */}
        <div className="flex-1 flex flex-col overflow-hidden bg-gray-50">
          {selectedDocument ? (
            <DocumentChat />
          ) : (
            <div className="flex-1 flex items-center justify-center p-4 bg-white">
              <div className="text-center max-w-md mx-auto">
                <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-indigo-600"
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
                <h2 className="text-xl font-medium text-gray-800 mb-2">
                  Select a document
                </h2>
                <p className="text-gray-500 mb-6">
                  Choose a document from the sidebar or create a new chat to get
                  started
                </p>
                <button
                  onClick={handleNewChat}
                  className="inline-flex items-center justify-center space-x-2 bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-6 rounded-md transition duration-200"
                >
                  <span>New Chat</span>
                </button>
              </div>
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
