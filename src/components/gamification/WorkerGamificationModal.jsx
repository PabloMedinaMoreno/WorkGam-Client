// src/components/gamification/WorkerGamificationModal.jsx
import React, { useEffect, useState } from "react";
import { Dialog, DialogTitle, DialogContent } from "@mui/material";
import { motion } from "framer-motion";
import useGamificationStore from "../../store/useGamificationStore";
import { FaTimes } from "react-icons/fa";

const WorkerGamificationModal = ({ open, onClose, worker }) => {
  if (!worker) return null;

  const [workerStats, setWorkerStats] = useState(null);
  const { getEmployeeGamificationStats } = useGamificationStore();

  useEffect(() => {
    if (worker?.id) {
      getEmployeeGamificationStats(worker.id)
        .then((data) => setWorkerStats(data))
        .catch((error) => console.error("Error fetching worker stats:", error));
    }
  }, [worker?.id, getEmployeeGamificationStats]);

  if (!workerStats) {
    return (
      <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
        <DialogContent>
          <p className="text-center">Cargando datos...</p>
        </DialogContent>
      </Dialog>
    );
  }

  const { user, completedTasks, pendingTasks, progressData } = workerStats;
  const { username, profile_pic } = user;
  const { currentLevel, nextLevel, currentXP } = progressData;
  const nextLevelXP = nextLevel?.xp || 1000;
  const progressPercentage = Math.min(
    100,
    Math.floor((currentXP / nextLevelXP) * 100)
  );

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <div className="relative">
        <DialogTitle className="text-3xl font-bold text-center">
          Estadísticas de Gamificación de {username}
        </DialogTitle>

        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition"
          aria-label="Cerrar"
          title="Cerrar"
        >
          <FaTimes />
        </button>
      </div>

      <DialogContent>
        <div className="flex flex-col items-center">
          {/* Sección de Perfil */}
          <div className="bg-gradient-to-r from-purple-700 to-blue-500 rounded-lg p-4 mb-6 text-center text-white w-full">
            <motion.img
              src={profile_pic}
              alt={username}
              className="w-24 h-24 rounded-full mx-auto mb-2 shadow-lg border-2 border-white"
              initial={{ opacity: 0, y: 20, rotate: -10 }}
              animate={{ opacity: 1, y: 0, rotate: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            />
            <motion.p
              className="text-xl font-semibold"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              {username}
            </motion.p>
          </div>

          {/* Sección de Tareas */}
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <motion.div
              className="p-4 text-center bg-white shadow rounded-lg"
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <motion.p
                className="text-sm font-bold"
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                Tareas Completadas
              </motion.p>
              <motion.p
                className="text-3xl text-green-500"
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                {completedTasks || 0}
              </motion.p>
            </motion.div>
            <motion.div
              className="p-4 text-center bg-white shadow rounded-lg"
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <motion.p
                className="text-sm font-bold"
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                Tareas Pendientes
              </motion.p>
              <motion.p
                className="text-3xl text-red-500"
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                {pendingTasks || 0}
              </motion.p>
            </motion.div>
            <motion.div
              className="p-4 text-center bg-white shadow rounded-lg"
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <motion.p
                className="text-sm font-bold"
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                XP
              </motion.p>
              <motion.p
                className="text-3xl text-violet-500"
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                {currentXP || 0}
              </motion.p>
            </motion.div>
          </motion.div>

          {/* Sección de Niveles y Barra de Progreso */}
          <motion.div
            className="w-full flex flex-col gap-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <motion.p
              className="text-center text-lg font-medium text-gray-700"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              Progreso hacia el siguiente nivel
            </motion.p>
            <div className="flex items-center gap-4">
              {/* Nivel actual */}
              <motion.div
                className="w-32 flex flex-col items-center text-center"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <motion.img
                  src={currentLevel.image}
                  alt={currentLevel.name}
                  className="w-10 h-10 rounded-full border-2 border-white mb-1"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                />
                <motion.p
                  className="text-sm font-semibold"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  Nivel Actual
                </motion.p>
                <motion.span
                  className="text-xs bg-purple-600 text-white rounded px-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  {currentLevel.name}
                </motion.span>
                <motion.p
                  className="text-xs mt-1 text-gray-700"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  XP: {currentLevel.xp}
                </motion.p>
              </motion.div>

              {/* Barra de Progreso */}
              <motion.div className="flex-1 relative">
                <div className="h-6 bg-gray-300 rounded">
                  <motion.div
                    className="h-6 bg-green-500 rounded"
                    initial={{ width: 0 }}
                    animate={{ width: `${progressPercentage}%` }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                  />
                </div>
                <div className="absolute inset-0 flex items-center justify-center text-white font-semibold text-sm">
                  {progressPercentage}%
                </div>
              </motion.div>

              {/* Próximo nivel */}
              <motion.div
                className="w-32 flex flex-col items-center text-center"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <motion.img
                  src={nextLevel.image}
                  alt={nextLevel.name}
                  className="w-10 h-10 rounded-full border-2 border-white mb-1"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                />
                <motion.p
                  className="text-sm font-semibold"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  Próximo Nivel
                </motion.p>
                <motion.span
                  className="text-xs bg-orange-600 text-white rounded px-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  {nextLevel.name}
                </motion.span>
                <motion.p
                  className="text-xs mt-1 text-gray-700"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  XP: {nextLevel.xp}
                </motion.p>
              </motion.div>
            </div>

            <motion.p
              className="text-sm text-center text-gray-800 mt-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              XP actual: {currentXP} / {nextLevelXP}
            </motion.p>
          </motion.div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default WorkerGamificationModal;
