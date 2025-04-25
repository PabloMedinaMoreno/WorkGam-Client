import React, { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaTimes } from "react-icons/fa";

const LevelProgressAnimation = ({ progress, onClose }) => {
  const audioRef = useRef(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.muted = false;
      audioRef.current.play().catch(() => {});
    }
  }, []);

  const percentage = Math.min(
    100,
    Math.floor((progress.currentXP / progress.nextLevel.xp) * 100)
  );

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[99998] flex items-center justify-center bg-black/60 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {/* Contenedor exterior con el degradado y esquinas redondeadas */}
        <motion.div
          className="relative w-[90%] max-w-xl shadow-xl p-[3px] bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 rounded-3xl"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Contenedor interior con el mismo radio para mantener la redondez */}
          <div className="rounded-3xl bg-indigo-700 p-10 text-white relative">
            <audio
              ref={audioRef}
              src="/sounds/progress.mp3"
              preload="auto"
              muted
            />

            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-white text-xl hover:text-gray-300 transition"
              title="Cerrar"
            >
              <FaTimes />
            </button>

            <h2 className="text-3xl font-bold text-center mb-6 animate-pulse">
              ✨ Progreso de Nivel ✨
            </h2>

            <div className="flex gap-8 items-center justify-center mb-6">
              <div className="text-center">
                <img
                  src={progress.currentLevel.image}
                  alt={progress.currentLevel.name}
                  className="w-24 h-24 object-cover rounded-2xl mx-auto mb-2"
                />
                <p className="text-lg font-semibold">
                  {progress.currentLevel.name}
                </p>
                <p className="text-sm text-white/70">
                  XP base: {progress.currentLevel.xp}
                </p>
              </div>

              <div className="text-4xl text-white animate-bounce">→</div>

              <div className="text-center">
                <img
                  src={progress.nextLevel.image}
                  alt={progress.nextLevel.name}
                  className="w-24 h-24 object-cover rounded-2xl mx-auto mb-2"
                />
                <p className="text-lg font-bold text-yellow-200">
                  {progress.nextLevel.name}
                </p>
                <p className="text-sm text-white/70">
                  XP objetivo: {progress.nextLevel.xp}
                </p>
              </div>
            </div>

            {/* Sección para mostrar el XP actual */}
            <div className="text-center mb-4">
              <p className="text-xl font-semibold">
                XP actual: {progress.currentXP}
              </p>
            </div>

            <div className="relative w-full h-6 bg-white/20 rounded-full overflow-hidden shadow-inner mb-4">
              <div
                className="h-full bg-yellow-300 transition-all duration-700"
                style={{ width: `${percentage}%` }}
              ></div>
              <span className="absolute inset-0 flex items-center justify-center text-sm font-medium text-white">
                {percentage}%
              </span>
            </div>

            <p className="text-center text-white mt-4 font-semibold">
              🚀 Estás a{" "}
              <strong>{progress.nextLevel.xp - progress.currentXP}</strong> XP de
              alcanzar <strong>{progress.nextLevel.name}</strong> 🌟
            </p>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default LevelProgressAnimation;
