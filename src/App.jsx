// src/App.jsx
import React, { useState } from "react";
import { BrowserRouter as Router,  Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";

// Layout
import NavigationBar from "./components/common/NavigationBar";
import Footer from "./components/common/Footer";

// Pages comunes
import HomePage from "./pages/common/HomePage";
import LoginPage from "./pages/common/LoginPage";
import RegisterPage from "./pages/common/RegisterPage";
import ForgotPasswordPage from "./pages/common/ForgotPasswordPage";
import ResetPasswordPage from "./pages/common/ResetPasswordPage";
import UnauthorizedPage from "./pages/common/UnauthorizedPage";
import NotFoundPage from "./pages/common/NotFoundPage";

// Dashboard
import DashboardLayout from "./pages/common/DashboardLayout";

const App = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const toggleSidebar = () => setSidebarOpen((prev) => !prev);

  return (
    <Router>
      {/* Global Toaster */}
      <Toaster />

      {/* Navigation Bar siempre visible */}
      <NavigationBar
        sidebarOpen={sidebarOpen}
        onToggleSidebar={toggleSidebar}
      />

      {/* Contenido principal con padding-top para no solapar NavBar */}
      <main className="pt-16 min-h-[calc(100vh-4rem)]">
        <Routes>
          {/* Rutas públicas */}
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route
            path="/reset-password/:token"
            element={<ResetPasswordPage />}
          />

          {/* Rutas de dashboard protegidas */}
          <Route
            path="/dashboard/*"
            element={<DashboardLayout sidebarOpen={sidebarOpen} />}
          />

          {/* Errores */}
          <Route path="/unauthorized" element={<UnauthorizedPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>

      {/* Footer siempre visible */}
      <Footer />
    </Router>
  );
};

export default App;
