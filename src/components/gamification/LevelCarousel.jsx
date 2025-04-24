import React, { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";

const LevelCarousel = ({ levels }) => {
  const carouselRef = useRef(null);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    if (carouselRef.current) {
      setWidth(
        carouselRef.current.scrollWidth - carouselRef.current.offsetWidth
      );
    }
  }, [levels]);

  // Variantes para una animación impactante con stagger
  const containerVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.8 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <div>
      <motion.h1
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="text-2xl sm:text-3xl font-semibold text-center mb-6 text-indigo-800"
      >
        Niveles de Gamificación
      </motion.h1>
      <motion.div
        className="overflow-hidden mb-10"
        ref={carouselRef}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div
          className="flex cursor-grab"
          drag="x"
          dragConstraints={{ right: 0, left: -width }}
          whileTap={{ cursor: "grabbing" }}
        >
          {levels.map((level) => (
            <motion.div
              key={level.id}
              className="min-w-[250px] max-w-[300px] m-4 p-4 bg-white rounded-lg shadow-lg flex flex-col items-center"
              variants={itemVariants}
            >
              <div className="w-20 h-20 mb-4 rounded-full overflow-hidden border-2 border-white shadow-md">
  <img
    src={level.image}
    alt={level.name}
    className="w-full h-full object-cover"
  />
</div>
              <h3 className="text-xl font-bold mb-2">{level.name}</h3>
              <p className="text-sm text-gray-600 text-center">
                {level.description}
              </p>
              <p className="text-center mt-2 font-semibold">
                Pts: {level.pointsRequired}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default LevelCarousel;
