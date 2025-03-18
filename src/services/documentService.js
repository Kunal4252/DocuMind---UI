import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Helper to get the current user's ID token
const getAuthHeader = async () => {
  try {
    const userStr = localStorage.getItem("user");
    if (!userStr) throw new Error("Not authenticated");

    const user = JSON.parse(userStr);
    if (!user.token) throw new Error("No token available");

    return {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };
  } catch (error) {
    console.error("Error getting auth header:", error);
    throw new Error("Authentication error: " + error.message);
  }
};

// Upload a document
export const uploadDocument = async (file, title) => {
  try {
    const config = await getAuthHeader();

    const formData = new FormData();
    formData.append("file", file);
    formData.append("title", title);

    const response = await axios.post(
      `${API_BASE_URL}/documents/upload`,
      formData,
      {
        ...config,
        headers: {
          ...config.headers,
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Document upload error:", error);
    if (error.response) {
      console.error("Response status:", error.response.status);
      console.error("Response data:", error.response.data);
    }
    throw new Error(
      error.response?.data?.detail || "Failed to upload document"
    );
  }
};

// Get all documents for the current user
export const getDocuments = async () => {
  try {
    const config = await getAuthHeader();
    const response = await axios.get(`${API_BASE_URL}/documents/list`, config);
    return response.data;
  } catch (error) {
    console.error("Document list error:", error);
    if (error.response) {
      console.error("Response status:", error.response.status);
      console.error("Response data:", error.response.data);
    }
    throw new Error(
      error.response?.data?.detail || "Failed to fetch documents"
    );
  }
};

// Chat with a document
export const chatWithDocument = async (documentId, message) => {
  try {
    const config = await getAuthHeader();
    const response = await axios.post(
      `${API_BASE_URL}/documents/chat/${documentId}`,
      { message },
      config
    );
    return response.data;
  } catch (error) {
    console.error("Document chat error:", error);
    if (error.response) {
      console.error("Response status:", error.response.status);
      console.error("Response data:", error.response.data);
    }
    throw new Error(
      error.response?.data?.detail || "Failed to chat with document"
    );
  }
};

// Get chat history for a document
export const getChatHistory = async (documentId) => {
  try {
    const config = await getAuthHeader();
    const response = await axios.get(
      `${API_BASE_URL}/documents/chat/${documentId}/history`,
      config
    );
    return response.data;
  } catch (error) {
    console.error("Chat history error:", error);
    if (error.response) {
      console.error("Response status:", error.response.status);
      console.error("Response data:", error.response.data);
    }
    throw new Error(
      error.response?.data?.detail || "Failed to fetch chat history"
    );
  }
};

// Delete a document
export const deleteDocument = async (documentId) => {
  try {
    const config = await getAuthHeader();
    const response = await axios.delete(
      `${API_BASE_URL}/documents/${documentId}`,
      config
    );
    return response.data;
  } catch (error) {
    console.error("Document deletion error:", error);
    if (error.response) {
      console.error("Response status:", error.response.status);
      console.error("Response data:", error.response.data);
    }
    throw new Error(
      error.response?.data?.detail || "Failed to delete document"
    );
  }
};
