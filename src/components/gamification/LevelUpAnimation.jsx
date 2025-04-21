import React, { useEffect, useRef } from "react";
import ReactCanvasConfetti from "react-canvas-confetti";
import { motion, AnimatePresence } from "framer-motion";
import { FaTimes } from "react-icons/fa";

const canvasStyles = {
  position: "fixed",
  pointerEvents: "none",
  width: "100%",
  height: "100%",
  top: 0,
  left: 0,
  zIndex: 99999,
};

const getAnimationSettings = (originX = 0.5) => ({
  startVelocity: 45,
  spread: 360,
  ticks: 120,
  particleCount: 200,
  scalar: 1.2,
  origin: { x: originX, y: 0.6 },
  zIndex: 99999,
});

const LevelUpAnimation = ({ level, onClose }) => {
  const { previousLevel, nextLevel } = level;
  const refAnimationInstance = useRef(null);
  const audioRef = useRef(null);

  const fireConfetti = () => {
    const shoot = (ratio, settings) =>
      refAnimationInstance.current?.({
        ...settings,
        particleCount: Math.floor(200 * ratio),
      });

    shoot(0.25, getAnimationSettings(0.1));
    shoot(0.2, getAnimationSettings(0.3));
    shoot(0.35, getAnimationSettings(0.5));
    shoot(0.1, getAnimationSettings(0.7));
    shoot(0.1, getAnimationSettings(0.9));
  };

  useEffect(() => {
    fireConfetti();

    if (audioRef.current) {
      audioRef.current.muted = false;
      audioRef.current.play().catch((e) => {
        console.warn("Autoplay bloqueado:", e);
      });
    }
  }, []);

  const handleClose = () => {
    audioRef.current?.pause();
    onClose();
  };

  return (
    <>
      <ReactCanvasConfetti
        refConfetti={(inst) => (refAnimationInstance.current = inst)}
        style={canvasStyles}
      />
      <audio ref={audioRef} src="/sounds/tada.mp3" preload="auto" muted />

      <AnimatePresence>
        <motion.div
          className="fixed inset-0 z-[99990] flex items-center justify-center bg-black/70 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Contenedor exterior con el borde degradado */}
          <motion.div
            className="relative w-[90%] max-w-2xl rounded-3xl shadow-xl p-[3px] bg-gradient-to-br from-yellow-400 via-pink-500 to-purple-600"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Contenedor interior con fondo sólido y mismo radio */}
            <div className="rounded-3xl p-10 text-white relative">
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 text-white text-xl hover:text-gray-300 transition"
                title="Cerrar"
              >
                <FaTimes />
              </button>

              <h2 className="text-4xl font-extrabold text-center mb-8 tracking-wide drop-shadow-2xl animate-pulse">
                🎉 ¡Nivel Ascendido! 🎉
              </h2>

              <motion.div
                className="flex gap-12 justify-center mb-6 items-center"
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.6 }}
              >
                {/* Nivel anterior */}
                <div className="text-center">
                  <img
                    src={previousLevel.image}
                    alt={previousLevel.name}
                    className="w-32 h-32 object-cover mx-auto mb-2 rounded-3xl shadow-lg"
                  />
                  <p className="text-lg font-semibold">{previousLevel.name}</p>
                  <p className="text-sm text-white/70">XP: {previousLevel.xp}</p>
                </div>

                {/* Flecha */}
                <div className="text-5xl text-white animate-bounce">→</div>

                {/* Nuevo nivel */}
                <div className="text-center">
                  <img
                    src={nextLevel.image}
                    alt={nextLevel.name}
                    className="w-32 h-32 object-cover mx-auto mb-2 rounded-3xl shadow-lg"
                  />
                  <p className="text-xl font-bold text-yellow-200">
                    {nextLevel.name}
                  </p>
                  <p className="text-sm text-white/80">XP: {nextLevel.xp}</p>
                </div>
              </motion.div>

              <p className="text-xl text-center font-semibold text-white mt-4">
                🚀 ¡Ahora eres nivel <strong>{nextLevel.name}</strong>! 🚀
              </p>
            </div>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </>
  );
};

export default LevelUpAnimation;
