import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import LoadingSpinner from "./components/common/LoadingSpinner";

const ProtectedRoute = ({ allowedRoles, children }) => {
  const { user, isAuthenticated, loading } = useAuth();

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    console.log("Unauthorized access attempt:", user.role);
    console.log("Allowed roles:", allowedRoles);
    return <Navigate to="/unauthorized" />;
  }

  return children;
};

export default ProtectedRoute;
