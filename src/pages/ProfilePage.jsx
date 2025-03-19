import React from "react";
import { useAuth } from "../hooks/useAuth";
import { useUser } from "../context/UserContext";
import { useDocuments } from "../context/DocumentContext";
import MainLayout from "../components/layouts/MainLayout";
import UserProfile from "../components/UserProfile";
import { Link } from "react-router-dom";

// Profile page wrapper
const ProfilePage = () => (
  <MainLayout>
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Your Profile</h1>
      <UserProfile />
    </div>
  </MainLayout>
);

export default ProfilePage;