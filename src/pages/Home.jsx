import React from "react";
import Navbar from "../components/Navbar";

export const Home = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <h1 className="text-2xl font-semibold text-gray-900">
            Welcome to our Home page
          </h1>
          <p className="mt-2 text-gray-600">
            This is the landing page of our website.
          </p>
        </div>
      </main>
    </div>
  );
};
