// src/pages/NotFoundPage.jsx
import React from "react";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-4xl font-bold text-gray-800">404 - Not Found</h1>
      <p className="mt-4 text-lg text-gray-700">
        The page you are looking for does not exist.
      </p>
      <Link to="/dashboard" className="mt-6 text-indigo-600 underline">
        Return Home
      </Link>
    </div>
  );
};

export default NotFoundPage;
