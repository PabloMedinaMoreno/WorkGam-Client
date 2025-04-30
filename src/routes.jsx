// src/routes.jsx (ProtectedRoute mejorado)
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import LoadingSpinner from "./components/common/LoadingSpinner";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, isAuthenticated, loading: authLoading } = useAuth();

  if (authLoading) return <LoadingSpinner />;

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (user && allowedRoles.includes(user.role)) {
    return children;
  }
  return <Navigate to="/unauthorized" replace />;
};

export default ProtectedRoute;
