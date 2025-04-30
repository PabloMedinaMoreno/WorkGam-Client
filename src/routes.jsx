import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import LoadingSpinner from "./components/common/LoadingSpinner";

const ProtectedRoute = ({ allowedRoles, children }) => {
  const { user, isAuthenticated, loading } = useAuth();

  if (loading) {
    console.log("Loading");
    return <LoadingSpinner />;
  }
  if (!isAuthenticated) {
    console.log("User not authenticated, redirecting to login...");
    return <Navigate to="/login" />;
  }
  if (
    allowedRoles &&
    !allowedRoles.includes(user.role)
  ) {
    return <Navigate to="/unauthorized" />;
  }

  return children;
};

export default ProtectedRoute;
