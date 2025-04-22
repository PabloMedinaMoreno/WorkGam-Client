// src/App.jsx
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import ProtectedRoute from './routes';

// Layout
import NavBar from './components/common/NavBar';
import Footer from './components/common/Footer';

// Pages comunes
import HomePage from './pages/common/HomePage';
import LoginPage from './pages/common/LoginPage';
import RegisterPage from './pages/common/RegisterPage';
import ForgotPasswordPage from './pages/common/ForgotPasswordPage';
import ResetPasswordPage from './pages/common/ResetPasswordPage';
import ProfilePage from './pages/common/ProfilePage';
import NotificationsPage from './pages/common/NotificationsPage';
import UnauthorizedPage from './pages/common/UnauthorizedPage';
import NotFoundPage from './pages/common/NotFoundPage';

// Dashboard
import DashboardLayout from './pages/common/DashboardLayout';
import useRolesStore from './store/useRoleStore';

const App = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const toggleSidebar = () => setSidebarOpen(prev => !prev);

  const { employeeRoles, loadRoles } = useRolesStore();

  useEffect(() => {
    loadRoles().catch(err => console.error('Error loading roles:', err));
  }, [loadRoles]);

  // Roles permitidos para acceder al dashboard
  const dashboardRoles = [...employeeRoles, 'Cliente'];

  return (
    <Router>
      {/* Global Toaster */}
      <Toaster />

      {/* Navigation Bar siempre visible */}
      <NavBar sidebarOpen={sidebarOpen} onToggleSidebar={toggleSidebar} />

      {/* Contenido principal con padding-top para no solapar NavBar */}
      <main className="pt-16 min-h-[calc(100vh-4rem)]">
        <Routes>
          {/* Rutas públicas */}
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/reset-password/:token" element={<ResetPasswordPage />} />

          {/* Rutas de dashboard protegidas */}
          <Route
            path="/dashboard/*"
            element={
              <ProtectedRoute allowedRoles={dashboardRoles}>
                <DashboardLayout sidebarOpen={sidebarOpen} />
              </ProtectedRoute>
            }
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