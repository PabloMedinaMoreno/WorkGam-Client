import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import LoadingSpinner from "./components/common/LoadingSpinner";
import { CircularProgress } from "@mui/material";

const ProtectedRoute = ({ allowedRoles, children }) => {
  const { user, isAuthenticated, loading } = useAuth();

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (
    children.props.path &&
    allowedRoles &&
    !allowedRoles.includes(user.role)
  ) {
    return <Navigate to="/unauthorized" />;
  }

  return children;
};

export default ProtectedRoute;
