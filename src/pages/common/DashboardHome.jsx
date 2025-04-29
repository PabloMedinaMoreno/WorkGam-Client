// src/pages/DashboardHome.jsx
import React from "react";
import { motion } from "framer-motion";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const DashboardHome = ({ options }) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  // Mapeo de colores según la etiqueta
  const colorMapping = {
    "Perfil": "bg-indigo-500",
    "Trámites": "bg-green-500",
    "Trámites Disponibles": "bg-green-500",
    "Trabajadores": "bg-blue-500",
    "Roles": "bg-purple-500",
    "Ranking": "bg-pink-500",
    "Historial": "bg-gray-500",
    "Mis Trámites": "bg-blue-500",
    "Tareas Pendientes": "bg-yellow-500",
    "Tareas Completadas": "bg-green-500",
    "Estadísticas": "bg-blue-500",
    "Notificaciones": "bg-red-500",
  };

  return (
    <div className="flex flex-col items-center mt-20 space-y-8">
      <motion.h2
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-2xl sm:text-3xl font-semibold text-center mb-6 text-indigo-800"
      >
        ¡Bienvenido, {user.username}!
      </motion.h2>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="text-lg text-center text-gray-600" 
      >
        Selecciona una opción para empezar
      </motion.p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {options.map((option, index) => (
          <motion.div
            key={option.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            onClick={() => navigate(option.path)}
            className={`cursor-pointer p-6 rounded-lg shadow-lg ${
              colorMapping[option.label] || "bg-gray-500"
            } text-white flex flex-col items-center justify-center space-y-4 hover:scale-105 transform transition`}
          >
            <div className="text-4xl">{option.icon}</div>
            <span className="font-semibold">{option.label}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default DashboardHome;
