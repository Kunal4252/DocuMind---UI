import React, { useState, useEffect, useRef } from "react";
import { chatWithDocument, getChatHistory } from "../services/documentService";
import { useDocuments } from "../context/DocumentContext";
import { format } from "date-fns";

const DocumentChat = () => {
  const { selectedDocument } = useDocuments();
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isFetchingHistory, setIsFetchingHistory] = useState(false);

  const chatContainerRef = useRef(null);

  // Reset chat history when selected document changes
  useEffect(() => {
    // Reset state when document changes
    setChatHistory([]);
    setError(null);

    if (!selectedDocument) return;

    const fetchChatHistory = async () => {
      setIsFetchingHistory(true);
      setError(null);
      try {
        const response = await getChatHistory(selectedDocument.id);
        setChatHistory(response.chat_history || []);
      } catch (err) {
        console.error("Error fetching chat history:", err);
        setError("Failed to load chat history. Please try again.");
      } finally {
        setIsFetchingHistory(false);
      }
    };

    fetchChatHistory();
  }, [selectedDocument]);

  // Scroll to bottom when chat history updates
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [chatHistory]);

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!message.trim() || !selectedDocument) return;

    // Optimistically add user message to chat
    const userMessage = {
      id: `temp-${Date.now()}`,
      timestamp: new Date().toISOString(),
      user_message: message,
      bot_response: "",
    };

    setChatHistory((prev) => [...prev, userMessage]);
    setMessage("");
    setLoading(true);
    setError(null);

    try {
      const response = await chatWithDocument(selectedDocument.id, message);

      // Update chat history with response
      setChatHistory((prev) => {
        const filtered = prev.filter((item) => item.id !== userMessage.id);
        return [
          ...filtered,
          {
            id: `resp-${Date.now()}`,
            timestamp: new Date().toISOString(),
            user_message: message,
            bot_response: response.answer,
          },
        ];
      });
    } catch (err) {
      console.error("Error chatting with document:", err);
      setError(`Failed to get a response: ${err.message}`);

      // Remove the optimistic message on error
      setChatHistory((prev) =>
        prev.filter((item) => item.id !== userMessage.id)
      );
    } finally {
      setLoading(false);
    }
  };

  if (!selectedDocument) {
    return (
      <div className="flex-1 flex items-center justify-center bg-white h-full w-full">
        <p className="text-gray-500">
          Select a document to start chatting or create a new chat
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full w-full overflow-hidden">
      <div className="bg-white border-b border-gray-200 px-6 py-3 flex items-center flex-shrink-0">
        <h2 className="text-lg font-semibold text-gray-800">
          {selectedDocument.title}
        </h2>
      </div>

      <div
        ref={chatContainerRef}
        className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4 bg-gray-50 w-full"
      >
        {isFetchingHistory ? (
          <div className="flex justify-center py-4">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-700"></div>
          </div>
        ) : chatHistory.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-8 text-center space-y-3">
            <div className="bg-indigo-100 rounded-full p-3">
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
            <h3 className="text-lg font-medium text-gray-800">
              Start the conversation
            </h3>
            <p className="text-gray-500 max-w-md">
              Ask questions about{" "}
              <span className="font-medium">{selectedDocument.title}</span> to
              explore its contents. Try queries like "What is the main topic?"
              or "Summarize this document."
            </p>
          </div>
        ) : (
          chatHistory.map((chat) => (
            <div key={chat.id} className="space-y-2">
              <div className="flex flex-col items-end">
                <div className="bg-blue-100 p-3 rounded-lg max-w-[80%]">
                  <p className="text-gray-800">{chat.user_message}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    {format(new Date(chat.timestamp), "h:mm a")}
                  </p>
                </div>
              </div>

              <div className="flex flex-col">
                <div className="bg-white p-3 rounded-lg shadow-sm max-w-[80%]">
                  {chat.bot_response ? (
                    <>
                      <p className="text-gray-800 whitespace-pre-line">
                        {chat.bot_response}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {format(new Date(chat.timestamp), "h:mm a")}
                      </p>
                    </>
                  ) : (
                    <div className="flex items-center space-x-2">
                      <div className="animate-pulse flex space-x-1">
                        <div className="h-2 w-2 bg-gray-400 rounded-full"></div>
                        <div className="h-2 w-2 bg-gray-400 rounded-full"></div>
                        <div className="h-2 w-2 bg-gray-400 rounded-full"></div>
                      </div>
                      <span className="text-sm text-gray-500">Thinking...</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))
        )}

        {error && (
          <div className="bg-red-100 text-red-700 p-3 rounded-lg">
            <p>{error}</p>
          </div>
        )}
      </div>

      <div className="bg-white border-t border-gray-200 p-4 flex-shrink-0 w-full">
        <form onSubmit={handleSubmit} className="flex w-full max-w-4xl mx-auto">
          <input
            type="text"
            value={message}
            onChange={handleMessageChange}
            disabled={loading}
            placeholder="Ask a question about your document..."
            className="flex-1 border border-gray-300 rounded-l-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            disabled={!message.trim() || loading}
            className={`px-4 py-2 rounded-r-md text-white font-medium
              ${
                !message.trim() || loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
          >
            {loading ? (
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
            ) : (
              <span>Send</span>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default DocumentChat;
