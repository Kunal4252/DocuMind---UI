import React, { createContext, useContext, useState, useEffect } from "react";
import { getDocuments } from "../services/documentService";
import { useAuth } from "../hooks/useAuth";

const DocumentContext = createContext();

export const useDocuments = () => {
  const context = useContext(DocumentContext);
  if (!context) {
    throw new Error("useDocuments must be used within a DocumentProvider");
  }
  return context;
};

export const DocumentProvider = ({ children }) => {
  const { user } = useAuth(); // Get user from auth context
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  // Function to force refresh of documents
  const refreshDocuments = () => {
    setRefreshTrigger((prev) => prev + 1);
  };

  // Load documents whenever user or refreshTrigger changes
  useEffect(() => {
    const fetchDocuments = async () => {
      if (!user) {
        setDocuments([]);
        setSelectedDocument(null);
        return;
      }

      setLoading(true);
      setError(null);
      try {
        console.log("Fetching documents...");
        const response = await getDocuments();
        console.log("Documents fetched:", response);
        const documentsList = response.documents || [];
        setDocuments(documentsList);

        // If we have a selectedDocument ID but the document no longer exists, clear selection
        if (
          selectedDocument &&
          !documentsList.find((doc) => doc.id === selectedDocument.id)
        ) {
          setSelectedDocument(null);
        }
      } catch (err) {
        console.error("Error fetching documents:", err);
        setError(err.message || "Failed to fetch documents");
      } finally {
        setLoading(false);
      }
    };

    fetchDocuments();
  }, [user, refreshTrigger]);

  // Select a document by ID
  const selectDocument = (documentId) => {
    if (!documentId) {
      setSelectedDocument(null);
      return;
    }

    const doc = documents.find((d) => d.id === documentId);
    setSelectedDocument(doc || null);

    if (!doc) {
      console.warn(`Document with ID ${documentId} not found`);
    }
  };

  // Clear selected document
  const clearSelectedDocument = () => {
    setSelectedDocument(null);
  };

  const value = {
    documents,
    loading,
    error,
    selectedDocument,
    selectDocument,
    clearSelectedDocument,
    refreshDocuments,
  };

  return (
    <DocumentContext.Provider value={value}>
      {children}
    </DocumentContext.Provider>
  );
};
