import React, { useState, useRef, useEffect } from "react";
import { useDocuments } from "../context/DocumentContext";
import DocumentChat from "../components/DocumentChat";
import MainLayout from "../components/layouts/MainLayout";
import ChatSidebar from "../components/ChatSidebar";
import NewChatModal from "../components/NewChatModal";

export const Chat = () => {
  const { selectedDocument, selectDocument } = useDocuments();
  const [showNewChatModal, setShowNewChatModal] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [showDocViewer, setShowDocViewer] = useState(true);
  const [docViewerWidth, setDocViewerWidth] = useState(384); // w-96 is 384px
  const resizingRef = useRef(false);
  const startXRef = useRef(0);
  const startWidthRef = useRef(0);

  const handleNewChat = () => {
    setShowNewChatModal(true);
  };

  const handleSelectDocument = (documentId) => {
    selectDocument(documentId);
    setShowDocViewer(true); // Show document viewer when selecting a document
  };

  const handleCloseModal = () => {
    setShowNewChatModal(false);
  };

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const toggleDocViewer = () => {
    setShowDocViewer(!showDocViewer);
  };

  // Setup resize event handlers
  const handleResizeStart = (e) => {
    resizingRef.current = true;
    startXRef.current = e.clientX;
    startWidthRef.current = docViewerWidth;
    document.addEventListener('mousemove', handleResize);
    document.addEventListener('mouseup', handleResizeEnd);
    document.body.style.cursor = 'ew-resize';
    document.body.style.userSelect = 'none';
  };

  const handleResize = (e) => {
    if (!resizingRef.current) return;
    const delta = startXRef.current - e.clientX;
    const newWidth = Math.min(Math.max(startWidthRef.current + delta, 300), 600); // Min 300px, max 600px
    setDocViewerWidth(newWidth);
  };

  const handleResizeEnd = () => {
    resizingRef.current = false;
    document.removeEventListener('mousemove', handleResize);
    document.removeEventListener('mouseup', handleResizeEnd);
    document.body.style.cursor = '';
    document.body.style.userSelect = '';
  };

  // Cleanup event listeners
  useEffect(() => {
    return () => {
      document.removeEventListener('mousemove', handleResize);
      document.removeEventListener('mouseup', handleResizeEnd);
    };
  }, []);

  return (
    <MainLayout>
      <div className="flex h-full w-full overflow-hidden">
        {/* Chat Sidebar - collapsible */}
        <div 
          className={`h-full flex-shrink-0 border-r border-gray-200 transition-all duration-300 ease-in-out ${
            sidebarCollapsed ? "w-16" : "w-64"
          }`}
        >
          {sidebarCollapsed ? (
            <div className="h-full flex flex-col">
              <button 
                onClick={toggleSidebar}
                className="p-3 hover:bg-gray-100 transition-colors text-gray-600 flex justify-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                </svg>
              </button>
              {/* Collapsed sidebar with just icons */}
              <div className="flex-1 overflow-hidden overflow-y-auto">
                <div className="p-3 flex justify-center">
                  <button 
                    onClick={handleNewChat}
                    className="w-10 h-10 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white flex items-center justify-center"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="h-full flex flex-col">
              <div className="flex items-center justify-between p-3 border-b border-gray-200">
                <h2 className="font-semibold text-gray-800">Chats</h2>
                <button 
                  onClick={toggleSidebar}
                  className="p-1 hover:bg-gray-100 rounded-md transition-colors text-gray-600"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
                  </svg>
                </button>
              </div>
              <ChatSidebar
                onSelectDocument={handleSelectDocument}
                onNewChat={handleNewChat}
                selectedDocumentId={selectedDocument?.id}
              />
            </div>
          )}
        </div>

        {/* Main Chat Area - middle section */}
        <div className="flex-1 flex flex-col overflow-hidden bg-gray-50 relative">
          {selectedDocument ? (
            <>
              <DocumentChat />
              {/* Document viewer toggle button (only shown when document viewer is hidden) */}
              {selectedDocument && !showDocViewer && (
                <button
                  onClick={toggleDocViewer}
                  className="absolute top-4 right-4 bg-white p-2 rounded-md shadow-md border border-gray-200 hover:bg-gray-50 transition-colors z-10"
                  title="Show Document"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </button>
              )}
            </>
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

        {/* Document Viewer - right side, with resize handle */}
        {selectedDocument && showDocViewer && (
          <>
            {/* Resize handle */}
            <div 
              className="h-full w-1 bg-gray-200 hover:bg-indigo-400 cursor-ew-resize transition-colors z-10"
              onMouseDown={handleResizeStart}
            ></div>
            
            {/* Document viewer */}
            <div 
              className="h-full flex-shrink-0 border-l border-gray-200 bg-white overflow-hidden overflow-y-auto"
              style={{ width: `${docViewerWidth}px` }}
            >
              <div className="p-4 border-b border-gray-200 flex justify-between items-center">
                <div>
                  <h2 className="font-semibold text-gray-800">Document Viewer</h2>
                  <p className="text-sm text-gray-500 truncate">{selectedDocument.title}</p>
                </div>
                <button 
                  onClick={toggleDocViewer}
                  className="p-1 hover:bg-gray-100 rounded-md transition-colors text-gray-600"
                  title="Close viewer"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="h-full">
                {selectedDocument.file_url ? (
                  <iframe
                    src={selectedDocument.file_url}
                    className="w-full h-full border-0"
                    title={selectedDocument.title}
                    loading="lazy"
                  ></iframe>
                ) : (
                  <div className="flex items-center justify-center h-full p-4 text-gray-500">
                    Document preview not available
                  </div>
                )}
              </div>
            </div>
          </>
        )}
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
