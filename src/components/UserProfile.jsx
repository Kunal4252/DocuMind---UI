import React, { useState } from "react";
import { useUser } from "../context/UserContext";
import { updateUserProfile, uploadProfileImage } from "../services/userService";

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
  React.useEffect(() => {
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
      <div className="p-4 bg-white rounded-lg shadow-md">
        <div className="flex justify-center items-center h-40">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-700"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Your Profile</h2>
        {!isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Edit Profile
          </button>
        )}
      </div>

      {success && (
        <div className="mb-4 p-2 bg-green-100 text-green-700 rounded">
          Profile updated successfully!
        </div>
      )}

      {error && (
        <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">{error}</div>
      )}

      {isEditing ? (
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="profileImage">
              Profile Image
            </label>
            <div className="flex items-center space-x-4">
              <img
                src={
                  userProfile.profile_image || "https://via.placeholder.com/100"
                }
                alt="Profile"
                className="w-16 h-16 rounded-full object-cover"
              />
              <input
                id="profileImage"
                type="file"
                onChange={handleImageChange}
                accept="image/*"
                className="flex-1"
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="name">
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="phone">
              Phone
            </label>
            <input
              id="phone"
              name="phone"
              type="text"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="location">
              Location
            </label>
            <input
              id="location"
              name="location"
              type="text"
              value={formData.location}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="bio">
              Bio
            </label>
            <textarea
              id="bio"
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              rows="3"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex space-x-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`px-4 py-2 rounded-md text-white font-medium
                ${
                  isSubmitting
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700"
                }`}
            >
              {isSubmitting ? "Saving..." : "Save Changes"}
            </button>
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <img
              src={
                userProfile.profile_image || "https://via.placeholder.com/100"
              }
              alt="Profile"
              className="w-20 h-20 rounded-full object-cover"
            />
            <div>
              <h3 className="text-xl font-semibold">{userProfile.name}</h3>
              <p className="text-gray-600">{userProfile.email}</p>
            </div>
          </div>

          {userProfile.phone && (
            <div>
              <h4 className="text-sm font-medium text-gray-500">Phone</h4>
              <p>{userProfile.phone}</p>
            </div>
          )}

          {userProfile.location && (
            <div>
              <h4 className="text-sm font-medium text-gray-500">Location</h4>
              <p>{userProfile.location}</p>
            </div>
          )}

          {userProfile.bio && (
            <div>
              <h4 className="text-sm font-medium text-gray-500">Bio</h4>
              <p>{userProfile.bio}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default UserProfile;
