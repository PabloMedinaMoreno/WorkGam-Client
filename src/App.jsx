// src/App.jsx
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./routes";
import { Toaster } from "react-hot-toast";
// Componentes generales
import HomePage from "./pages/common/HomePage";
import LoginPage from "./pages/common/LoginPage";
import RegisterPage from "./pages/common/RegisterPage";
import ForgotPasswordPage from "./pages/common/ForgotPasswordPage";
import ResetPasswordPage from "./pages/common/ResetPasswordPage";
import DashboardLayout from "./pages/common/DashboardLayout";
import ProfilePage from "./pages/common/ProfilePage";
import NotificationsPage from "./pages/common/NotificationsPage";
// Componentes de administrador
import AdminProcedureTasksPage from "./pages/admin/AdminProcedureTasksPage";
import AdminGamificationDashboardPage from "./pages/admin/AdminGamificationDashboardPage";
import ProceduresListPage from "./pages/admin/ProceduresListPage";
import RolesListPage from "./pages/admin/RolesListPage";
import WorkerListPage from "./pages/admin/WorkerListPage";
import AdminProcedureHistoryPage from "./pages/admin/AdminProcedureHistoryPage";
import AdminProcedureTasksHistoryPage from "./pages/admin/AdminProcedureTasksHistoryPage";
// Componentes de cliente
import ClientProcedureTasksPage from "./pages/client/ClientProcedureTasksPage";
import AvailableProceduresPage from "./pages/client/AvaliableProceduresPage";
import MyProceduresPage from "./pages/client/MyProceduresPage";
// Componentes de empleado
import CompletedTasksPage from "./pages/employee/CompletedTasksPage";
import PendingTasksPage from "./pages/employee/PendingTasksPage";
import EmployeeGamificationDashboardPage from "./pages/employee/EmployeeGamificationDashboardPage";
// Páginas de error
import UnauthorizedPage from "./pages/common/UnauthorizedPage";
import NotFoundPage from "./pages/common/NotFoundPage";
import LoadingSpinner from "./components/common/LoadingSpinner";
import useRolesStore from "./store/useRoleStore";
import { useEffect } from "react";
import NavBar from "./components/common/NavBar";

const App = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const { employeeRoles, loadRoles } = useRolesStore();

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        await loadRoles();
      } catch (error) {
        console.error("Error loading roles:", error);
      }
    };
    fetchRoles();
  }, []);

  return (
    <Router>
      <Toaster />
      <NavBar onToggleSidebar={toggleSidebar} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password/:token" element={<ResetPasswordPage />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute allowedRoles={[...employeeRoles, "Cliente"]}>
              <DashboardLayout sidebarOpen={sidebarOpen} />
            </ProtectedRoute>
          }
        >
          {/* Subrutas del dashboard para todos los roles */}
          <Route
            path="profile"
            element={
              <ProtectedRoute allowedRoles={[...employeeRoles, "Cliente"]}>
                <ProfilePage />
              </ProtectedRoute>
            }
          />

          {/* Subrutas del dashboard para todos los roles */}
          <Route
            path="notifications"
            element={
              <ProtectedRoute allowedRoles={[...employeeRoles, "Cliente"]}>
                <NotificationsPage />
              </ProtectedRoute>
            }
          />

          {/* Rutas para administradores */}
          <Route
            path="admin/procedures"
            element={
              <ProtectedRoute allowedRoles={["Administrador"]}>
                <ProceduresListPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="admin/procedures/:id/tasks"
            element={
              <ProtectedRoute allowedRoles={["Administrador"]}>
                <AdminProcedureTasksPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="admin/roles"
            element={
              <ProtectedRoute allowedRoles={["Administrador"]}>
                <RolesListPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="admin/workers"
            element={
              <ProtectedRoute allowedRoles={["Administrador"]}>
                <WorkerListPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="admin/gamification"
            element={
              <ProtectedRoute allowedRoles={["Administrador"]}>
                <AdminGamificationDashboardPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="admin/procedure-history"
            element={
              <ProtectedRoute allowedRoles={["Administrador"]}>
                <AdminProcedureHistoryPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="admin/procedure-history/:id/tasks"
            element={
              <ProtectedRoute allowedRoles={["Administrador"]}>
                <AdminProcedureTasksHistoryPage />
              </ProtectedRoute>
            }
          />

          {/* Rutas para clientes */}
          <Route
            path="client/procedures"
            element={
              <ProtectedRoute allowedRoles={["Cliente"]}>
                <AvailableProceduresPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="client/myprocedures"
            element={
              <ProtectedRoute allowedRoles={["Cliente"]}>
                <MyProceduresPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="client/procedures/:id/tasks"
            element={
              <ProtectedRoute allowedRoles={["Cliente"]}>
                <ClientProcedureTasksPage />
              </ProtectedRoute>
            }
          />

          {/* Rutas para empleados */}
          <Route
            path="employee/tasks"
            element={
              <ProtectedRoute allowedRoles={employeeRoles}>
                <PendingTasksPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="employee/completed"
            element={
              <ProtectedRoute allowedRoles={employeeRoles}>
                <CompletedTasksPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="employee/gamification"
            element={
              <ProtectedRoute allowedRoles={employeeRoles}>
                <EmployeeGamificationDashboardPage />
              </ProtectedRoute>
            }
          />
        </Route>
        <Route path="/unauthorized" element={<UnauthorizedPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
};

export default App;
