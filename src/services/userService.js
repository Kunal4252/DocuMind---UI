import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Helper to get the current user's ID token
const getAuthHeader = async () => {
  try {
    const userStr = localStorage.getItem("user");
    if (!userStr) throw new Error("Not authenticated");

    const user = JSON.parse(userStr);
    if (!user.token) throw new Error("No token available");

    console.log(
      "Using token for API request:",
      user.token.substring(0, 15) + "..."
    );

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

// Get user profile
export const getUserProfile = async () => {
  try {
    const config = await getAuthHeader();
    console.log("Making API request to:", `${API_BASE_URL}/users/profile`);
    const response = await axios.get(`${API_BASE_URL}/users/profile`, config);
    return response.data;
  } catch (error) {
    console.error("Profile API error:", error);
    if (error.response) {
      console.error("Response status:", error.response.status);
      console.error("Response data:", error.response.data);
    }
    throw new Error(
      error.response?.data?.detail || "Failed to fetch user profile"
    );
  }
};

// Update user profile
export const updateUserProfile = async (profileData) => {
  try {
    const config = await getAuthHeader();
    const response = await axios.patch(
      `${API_BASE_URL}/users/profile`,
      profileData,
      config
    );
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.detail || "Failed to update user profile"
    );
  }
};

// Upload profile image
export const uploadProfileImage = async (file) => {
  try {
    const config = await getAuthHeader();

    const formData = new FormData();
    formData.append("file", file);

    const response = await axios.post(
      `${API_BASE_URL}/users/profile/upload-image`,
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
    throw new Error(
      error.response?.data?.detail || "Failed to upload profile image"
    );
  }
};
