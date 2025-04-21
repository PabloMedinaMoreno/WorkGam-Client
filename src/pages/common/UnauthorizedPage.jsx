// src/pages/UnauthorizedPage.jsx
import React from "react";
import { Link } from "react-router-dom";

const UnauthorizedPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-4xl font-bold text-red-600">Unauthorized</h1>
      <p className="mt-4 text-lg text-gray-700">
        You do not have permission to access this page.
      </p>
      <Link to="/dashboard" className="mt-6 text-indigo-600 underline">
        Return Home
      </Link>
    </div>
  );
};

export default UnauthorizedPage;
