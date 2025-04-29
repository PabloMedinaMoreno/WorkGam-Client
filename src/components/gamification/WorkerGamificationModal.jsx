import React, { useEffect, useState } from "react";
import { Dialog, DialogTitle, DialogContent, IconButton } from "@mui/material";
import { motion } from "framer-motion";
import { FaTimes } from "react-icons/fa";
import useGamificationStore from "../../store/useGamificationStore";

const WorkerGamificationModal = ({ open, onClose, worker, stats }) => {
  const loading = !worker || !stats;

  let content = <p className="text-center">Cargando datos...</p>;

  if (!loading) {
    const { user, completedTasks, pendingTasks, progressData } = stats;
    const { username, profile_pic } = user;
    const { currentLevel, nextLevel, currentXP } = progressData;
    const nextLevelXP = nextLevel?.xp || 1000;
    const progressPercentage = Math.min(
      100,
      Math.floor((currentXP / nextLevelXP) * 100)
    );

    content = (
      <div className="flex flex-col items-center">
        {/* Perfil */}
        <div className="bg-gradient-to-r from-purple-700 to-blue-500 rounded-lg p-4 mb-6 text-center text-white w-full">
          <div className="w-24 h-24 rounded-full mx-auto mb-2 overflow-hidden shadow-lg border-2 border-white">
            <img
              src={profile_pic}
              alt={username}
              className="w-full h-full object-cover"
            />
          </div>
          <p className="text-xl font-semibold">{username}</p>
        </div>

        {/* Stats */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <div className="p-4 text-center bg-white shadow rounded-lg">
            <p className="text-sm font-bold">Tareas Completadas</p>
            <p className="text-3xl text-green-500">{completedTasks || 0}</p>
          </div>
          <div className="p-4 text-center bg-white shadow rounded-lg">
            <p className="text-sm font-bold">Tareas Pendientes</p>
            <p className="text-3xl text-red-500">{pendingTasks || 0}</p>
          </div>
          <div className="p-4 text-center bg-white shadow rounded-lg">
            <p className="text-sm font-bold">XP</p>
            <p className="text-3xl text-violet-500">{currentXP || 0}</p>
          </div>
        </motion.div>

        {/* Progreso */}
        <motion.div
          className="w-full flex flex-col gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-center text-lg font-medium text-gray-700">
            Progreso hacia el siguiente nivel
          </p>
          <div className="flex items-center gap-4">
            {/* Nivel Actual */}
            <div className="w-32 text-center flex flex-col items-center">
              <div className="relative -mb-4 z-10">
                <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-white shadow-lg">
                  <img
                    src={currentLevel.image}
                    alt={currentLevel.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="bg-white rounded-lg shadow px-2 pt-6 pb-2 w-full">
                <p className="text-sm font-semibold">Nivel Actual</p>
                <span className="text-xs bg-purple-600 text-white rounded px-2 mt-1 inline-block">
                  {currentLevel.name}
                </span>
                <p className="text-xs text-gray-700 mt-1">
                  XP: {currentLevel.xp}
                </p>
              </div>
            </div>

            {/* Barra Progreso */}
            <div className="flex-1 relative">
              <div className="h-6 bg-gray-300 rounded">
                <motion.div
                  className="h-6 bg-green-500 rounded"
                  initial={{ width: 0 }}
                  animate={{ width: `${progressPercentage}%` }}
                  transition={{ duration: 1.5 }}
                />
              </div>
              <div className="absolute inset-0 flex justify-center items-center text-white text-sm font-semibold">
                {progressPercentage}%
              </div>
            </div>

            {/* Próximo Nivel */}
            <div className="w-32 text-center flex flex-col items-center">
              <div className="relative -mb-4 z-10">
                <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-white shadow-lg">
                  <img
                    src={nextLevel.image}
                    alt={nextLevel.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="bg-white rounded-lg shadow px-2 pt-6 pb-2 w-full">
                <p className="text-sm font-semibold">Próximo Nivel</p>
                <span className="text-xs bg-orange-600 text-white rounded px-2 mt-1 inline-block">
                  {nextLevel.name}
                </span>
                <p className="text-xs text-gray-700 mt-1">
                  XP: {nextLevel.xp}
                </p>
              </div>
            </div>
          </div>

          <p className="text-sm text-center text-gray-800 mt-2">
            XP actual: {currentXP} / {nextLevelXP}
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle
        sx={{
          textAlign: "center",
          fontWeight: "bold",
          fontSize: "1.5rem",
          color: "#4B0082",
        }}
      >
        Estadísticas de Gamificación
        <IconButton
          onClick={onClose}
          aria-label="Cerrar"
          sx={{ position: "absolute", top: 8, right: 8 }}
        >
          <FaTimes />
        </IconButton>
      </DialogTitle>
      <DialogContent>{content}</DialogContent>
    </Dialog>
  );
};

export default WorkerGamificationModal;
