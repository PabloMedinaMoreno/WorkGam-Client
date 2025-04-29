// src/pages/common/DashboardLayout.jsx
import React, { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { useAuth } from "../../context/AuthContext";
import useTaskStore from "../../store/useTaskStore";
import useRoleStore from "../../store/useRoleStore";
import ProtectedRoute from "../../routes";

import Sidebar from "../../components/common/Sidebar";
import DashboardHome from "./DashboardHome";
import ProfilePage from "./ProfilePage";
import NotificationsPage from "./NotificationsPage";

// Admin pages
import ProceduresListPage from "../admin/ProceduresListPage";
import AdminProcedureTasksPage from "../admin/AdminProcedureTasksPage";
import RolesListPage from "../admin/RolesListPage";
import WorkerListPage from "../admin/WorkerListPage";
import AdminGamificationDashboardPage from "../admin/AdminGamificationDashboardPage";
import AdminProcedureHistoryPage from "../admin/AdminProcedureHistoryPage";
import AdminProcedureTasksHistoryPage from "../admin/AdminProcedureTasksHistoryPage";

// Client pages
import AvailableProceduresPage from "../client/AvaliableProceduresPage";
import MyProceduresPage from "../client/MyProceduresPage";
import ClientProcedureTasksPage from "../client/ClientProcedureTasksPage";

// Employee pages
import PendingTasksPage from "../employee/PendingTasksPage";
import CompletedTasksPage from "../employee/CompletedTasksPage";
import EmployeeGamificationDashboardPage from "../employee/EmployeeGamificationDashboardPage";

import {
  FaUser,
  FaChartBar,
  FaUsers,
  FaFileAlt,
  FaCogs,
  FaFolderOpen,
  FaCheckCircle,
  FaHistory,
} from "react-icons/fa";

import NotificationIcon from "../../components/common/NotificationIcon";
import PendingTasksIcon from "../../components/common/PendingTasksIcon";
import { useNotifications } from "../../context/NotificationsContext";
import LevelUpAnimation from "../../components/gamification/LevelUpAnimation";
import LevelProgressAnimation from "../../components/gamification/LevelProgressAnimation";

export default function DashboardLayout({ sidebarOpen }) {
  const { user, loading } = useAuth();
  const { employeeRoles } = useRoleStore();
  const { newLevel, newProgress, clearLevelUp, clearProgressNotification } =
    useNotifications();

  // Carga inicial de tareas para empleados
  useEffect(() => {
    // Si el usuario es empleado
    if (!loading && user?.role && employeeRoles.includes(user.role) && user.role !== "Administrador") {
      useTaskStore.getState().loadMyPendingTasks();
    }
  }, [user]);

  // Roles comunes para todos los usuarios
  const commonRoles = [...employeeRoles, "Cliente", "Administrador"];

  const menuOptions = {
    Administrador: [
      { path: "/dashboard/profile", label: "Perfil", icon: <FaUser /> },
      {
        path: "/dashboard/admin/procedures",
        label: "Trámites",
        icon: <FaFileAlt />,
      },
      {
        path: "/dashboard/admin/workers",
        label: "Trabajadores",
        icon: <FaUsers />,
      },
      { path: "/dashboard/admin/roles", label: "Roles", icon: <FaCogs /> },
      {
        path: "/dashboard/admin/gamification",
        label: "Ranking",
        icon: <FaChartBar />,
      },
      {
        path: "/dashboard/admin/procedure-history",
        label: "Historial",
        icon: <FaHistory />,
      },
    ],
    Cliente: [
      { path: "/dashboard/profile", label: "Perfil", icon: <FaUser /> },
      {
        path: "/dashboard/client/procedures",
        label: "Trámites Disponibles",
        icon: <FaFileAlt />,
      },
      {
        path: "/dashboard/client/myprocedures",
        label: "Mis Trámites",
        icon: <FaFolderOpen />,
      },
      {
        path: "/dashboard/notifications",
        label: "Notificaciones",
        icon: <NotificationIcon />,
      },
    ],
  };

  const employeeOptions = [
    { path: "/dashboard/profile", label: "Perfil", icon: <FaUser /> },
    {
      path: "/dashboard/employee/tasks",
      label: "Tareas Pendientes",
      icon: <PendingTasksIcon />,
    },
    {
      path: "/dashboard/employee/completed",
      label: "Tareas Completadas",
      icon: <FaCheckCircle />,
    },
    {
      path: "/dashboard/employee/gamification",
      label: "Estadísticas",
      icon: <FaChartBar />,
    },
    {
      path: "/dashboard/notifications",
      label: "Notificaciones",
      icon: <NotificationIcon />,
    },
  ];

  const options = menuOptions[user?.role] || employeeOptions;

  return (
    <div className="flex">
      <AnimatePresence>
        {sidebarOpen && <Sidebar options={options} />}
      </AnimatePresence>
      <div className="flex-1 p-4 overflow-auto">
        {/* Mostrar la animación de nivel si está disponible */}
        {newLevel && (
          <LevelUpAnimation level={newLevel} onClose={clearLevelUp} />
        )}

        {/* Mostrar la notificación de progreso si está disponible */}
        {newProgress && (
          <LevelProgressAnimation
            progress={newProgress}
            onClose={clearProgressNotification}
          />
        )}
        <Routes>
          {/* Dashboard home (todos los roles) */}
          <Route
            index
            element={
              <ProtectedRoute allowedRoles={commonRoles}>
                <DashboardHome options={options} />
              </ProtectedRoute>
            }
          />

          {/* Perfil y notificaciones (todos los roles) */}
          <Route
            path="profile"
            element={
              <ProtectedRoute allowedRoles={commonRoles}>
                <ProfilePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="notifications"
            element={
              <ProtectedRoute allowedRoles={commonRoles}>
                <NotificationsPage />
              </ProtectedRoute>
            }
          />

          {/* Admin only */}
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

          {/* Cliente only */}
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

          {/* Empleado only */}
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

          {/* Cualquier otra ruta redirige al dashboard */}
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </div>
    </div>
  );
}
