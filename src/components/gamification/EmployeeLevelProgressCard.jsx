// src/components/gamification/EmployeeLevelProgressCard.jsx
import React from "react";
import { motion } from "framer-motion";

const EmployeeLevelProgressCard = ({ levelProgression }) => {
  console.log("levelProgression", levelProgression);
  if (!levelProgression) {
    return <div className="text-center text-gray-500">Cargando...</div>;
  }
  const { currentLevel, nextLevel, currentXP } = levelProgression;
  const percentage = Math.min(100, Math.floor((currentXP / nextLevel.xp) * 100));

  return (
    <motion.div 
      className="relative bg-white rounded-3xl shadow-2xl p-8 border border-gray-300 overflow-hidden"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      whileHover={{ scale: 1.02 }}
    >
      {/* Fondo degradado decorativo */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-pink-500 to-yellow-500 opacity-20 -z-10"></div>
      
      <motion.h2 
        className="text-3xl font-bold text-center mb-6 text-indigo-800"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        Progreso de Nivel
      </motion.h2>

      <div className="flex items-center justify-between">
        {/* Nivel Actual */}
        <motion.div
          className="flex flex-col items-center"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <motion.img 
            src={currentLevel.image}
            alt={currentLevel.name}
            className="w-24 h-24 rounded-full mb-2 object-cover"
            whileHover={{ scale: 1.1 }}
          />
          <motion.span 
            className="text-xl font-semibold"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            {currentLevel.name}
          </motion.span>
          <motion.span 
            className="text-md text-gray-600"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            XP Base: {currentLevel.xp}
          </motion.span>
        </motion.div>

        {/* Barra de Progreso */}
        <motion.div
          className="w-2/3 mx-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <motion.div className="relative w-full h-8 bg-gray-300 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-green-500"
              initial={{ width: 0 }}
              animate={{ width: `${percentage}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
            />
            <motion.span
              className="absolute inset-0 flex items-center justify-center text-lg font-bold text-white"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              {percentage}%
            </motion.span>
          </motion.div>
          <motion.div
            className="text-center text-lg mt-3 font-bold text-green-700"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.9 }}
          >
            XP Actual: {currentXP}
          </motion.div>
          <motion.div
            className="text-center text-md text-gray-700 mt-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1.0 }}
          >
            Faltan {nextLevel.xp - currentXP} XP para {nextLevel.name}
          </motion.div>
        </motion.div>

        {/* Siguiente Nivel */}
        <motion.div 
          className="flex flex-col items-center"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <motion.img 
            src={nextLevel.image}
            alt={nextLevel.name}
            className="w-24 h-24 rounded-full mb-2 object-cover"
            whileHover={{ scale: 1.1 }}
          />
          <motion.span 
            className="text-xl font-bold text-yellow-600"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            {nextLevel.name}
          </motion.span>
          <motion.span 
            className="text-md text-gray-600"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            Objetivo: {nextLevel.xp} XP
          </motion.span>
        </motion.div>
      </div>

  
    </motion.div>
  );
};

export default EmployeeLevelProgressCard;
