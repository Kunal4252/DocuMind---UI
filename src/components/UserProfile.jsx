import React, { useState, useEffect } from "react";
import { useUser } from "../context/UserContext";
import { updateUserProfile, uploadProfileImage } from "../services/userService";
import userPlaceholderSvg from "../assets/user placeholder.svg";

const UserProfile = () => {
  const { userProfile, refreshUserProfile } = useUser();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    location: "",
    bio: "",
  });
  const [profileImage, setProfileImage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  // Initialize form data when userProfile changes
  useEffect(() => {
    if (userProfile) {
      setFormData({
        name: userProfile.name || "",
        phone: userProfile.phone || "",
        location: userProfile.location || "",
        bio: userProfile.bio || "",
      });
    }
  }, [userProfile]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setProfileImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    setSuccess(false);

    try {
      // Upload profile image if selected
      if (profileImage) {
        await uploadProfileImage(profileImage);
      }

      // Update profile data
      await updateUserProfile(formData);

      // Refresh user profile
      refreshUserProfile();

      setSuccess(true);
      setIsEditing(false);
      setProfileImage(null);
    } catch (err) {
      setError(err.message || "Failed to update profile");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!userProfile) {
    return (
      <div className="flex justify-center items-center h-40">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-5xl mx-auto bg-white rounded-lg shadow-md">
      <div className="relative p-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 border-b pb-6">
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="relative">
              <img
                src={
                  userProfile.profile_image || userPlaceholderSvg
                }
                alt="Profile"
                className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-md bg-gray-50"
              />
              <div className="absolute -bottom-1 -right-1 h-8 w-8 bg-white rounded-full shadow-md flex items-center justify-center">
                <div className="h-6 w-6 rounded-full bg-gradient-to-br from-green-400 to-green-600"></div>
              </div>
            </div>
            <div className="text-center sm:text-left">
              <h2 className="text-2xl font-bold text-gray-800">
                {userProfile.name || "User"}
              </h2>
              <p className="text-gray-600">{userProfile.email}</p>
            </div>
          </div>
          {!isEditing && (
            <button
              onClick={() => setIsEditing(true)}
              className="px-6 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-md hover:from-indigo-700 hover:to-purple-700 transition shadow-sm w-full sm:w-auto"
            >
              Edit Profile
            </button>
          )}
        </div>

        {success && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 text-green-700 rounded-lg flex items-center">
            <svg
              className="h-5 w-5 mr-2"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            Profile updated successfully!
          </div>
        )}

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg flex items-center">
            <svg
              className="h-5 w-5 mr-2"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                clipRule="evenodd"
              />
            </svg>
            {error}
          </div>
        )}

        {isEditing ? (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="mb-8">
              <label
                className="block text-gray-700 font-medium mb-2"
                htmlFor="profileImage"
              >
                Profile Image
              </label>
              <div className="flex flex-col sm:flex-row gap-4 items-center">
                <img
                  src={
                    userProfile.profile_image ||
                    userPlaceholderSvg
                  }
                  alt="Profile"
                  className="w-24 h-24 rounded-full object-cover border-2 border-gray-200 bg-gray-50"
                />
                <div className="flex-1">
                  <input
                    id="profileImage"
                    type="file"
                    onChange={handleImageChange}
                    accept="image/*"
                    className="hidden"
                  />
                  <label
                    htmlFor="profileImage"
                    className="px-4 py-2 bg-white border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 cursor-pointer inline-block"
                  >
                    Choose Image
                  </label>
                  {profileImage && (
                    <span className="ml-2 text-sm text-gray-600">
                      {profileImage.name}
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  className="block text-gray-700 font-medium mb-2"
                  htmlFor="name"
                >
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  required
                />
              </div>

              <div>
                <label
                  className="block text-gray-700 font-medium mb-2"
                  htmlFor="phone"
                >
                  Phone
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="text"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
            </div>

            <div>
              <label
                className="block text-gray-700 font-medium mb-2"
                htmlFor="location"
              >
                Location
              </label>
              <input
                id="location"
                name="location"
                type="text"
                value={formData.location}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            <div>
              <label
                className="block text-gray-700 font-medium mb-2"
                htmlFor="bio"
              >
                Bio
              </label>
              <textarea
                id="bio"
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                rows="5"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Tell us about yourself..."
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`px-6 py-3 rounded-lg text-white font-medium shadow-sm flex-grow sm:flex-grow-0
                  ${
                    isSubmitting
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
                  }`}
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Saving...
                  </div>
                ) : (
                  "Save Changes"
                )}
              </button>
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="px-6 py-3 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 shadow-sm flex-grow sm:flex-grow-0"
              >
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <div className="mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {userProfile.phone && (
                <div className="flex flex-col p-4 bg-gray-50 rounded-lg">
                  <h4 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-2">
                    Phone
                  </h4>
                  <p className="text-gray-800 text-lg">{userProfile.phone}</p>
                </div>
              )}

              {userProfile.location && (
                <div className="flex flex-col p-4 bg-gray-50 rounded-lg">
                  <h4 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-2">
                    Location
                  </h4>
                  <p className="text-gray-800 text-lg">{userProfile.location}</p>
                </div>
              )}
            </div>

            {userProfile.bio && (
              <div className="mt-8 p-4 bg-gray-50 rounded-lg">
                <h4 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-2">
                  Bio
                </h4>
                <p className="text-gray-800 whitespace-pre-line">
                  {userProfile.bio}
                </p>
              </div>
            )}

            {!userProfile.phone &&
              !userProfile.location &&
              !userProfile.bio && (
                <div className="mt-8 p-6 border border-dashed border-gray-300 rounded-lg bg-gray-50 text-center">
                  <p className="text-gray-500 text-lg">
                    Your profile is empty. Click "Edit Profile" to add your
                    information.
                  </p>
                </div>
              )}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfile;