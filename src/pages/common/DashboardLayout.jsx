// src/pages/DashboardLayout.jsx
import React, { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Sidebar from "../../components/common/Sidebar";
import Footer from "../../components/common/Footer";
import LevelUpAnimation from "../../components/gamification/LevelUpAnimation";
import LevelProgressAnimation from "../../components/gamification/LevelProgressAnimation";
import { useNotifications } from "../../context/NotificationsContext";
import {
  FaUser,
  FaChartBar,
  FaUsers,
  FaFileAlt,
  FaCogs,
  FaFolderOpen,
  FaTasks,
  FaCheckCircle,
  FaHistory,
} from "react-icons/fa";
import NotificationIcon from "../../components/common/NotificationIcon";
import { AnimatePresence } from "framer-motion";
import DashboardHome from "./DashboardHome";
import PendingTasksIcon from "../../components/common/PendingTasksIcon";
import useTaskStore from "../../store/useTaskStore";

const DashboardLayout = ({ sidebarOpen }) => {
  const { user } = useAuth();
  const { newLevel, clearLevelUp, newProgress, clearProgressNotification } =
    useNotifications();
  const location = useLocation();

  // Carga global de tareas pendientes para empleados
  useEffect(() => {
    if (user && (user.role !== "Administrador" && user.role !== "Cliente")) {
      // Llama a la función para cargar tareas pendientes
      useTaskStore.getState().loadMyPendingTasks();
    }
  }, []);

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

  const options = menuOptions[user.role] || employeeOptions;

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <div className="flex flex-1 mt-[64px]">
        <AnimatePresence>
          {sidebarOpen && <Sidebar options={options} />}
        </AnimatePresence>
        {/* Área de contenido principal */}
        <main className="flex-1 p-4 overflow-auto">
          {newLevel ? (
            <LevelUpAnimation level={newLevel} onClose={clearLevelUp} />
          ) : newProgress ? (
            <LevelProgressAnimation
              progress={newProgress}
              onClose={clearProgressNotification}
            />
          ) : location.pathname === "/dashboard" ? (
            <DashboardHome options={options} />
          ) : (
            <Outlet />
          )}
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default DashboardLayout;
