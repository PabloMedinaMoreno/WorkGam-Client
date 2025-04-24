import React from "react";
import { motion } from "framer-motion";
import PropTypes from "prop-types";

/**
 * Componente de título reutilizable con gradiente y animación Framer Motion.
 *
 * Props:
 * - children: contenido del título.
 * - className: clases Tailwind adicionales.
 * - animation: objeto con props de Framer Motion (initial, animate, transition).
 */
const Title = ({
  children,
  className = "",
  animation = {
    initial: { opacity: 0, y: -20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8 },
  },
}) => {
  return (
    <motion.h1
      className={`text-2xl sm:text-3xl font-semibold text-center mb-6 bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-600 ${className}`}
      initial={animation.initial}
      animate={animation.animate}
      transition={animation.transition}
    >
      {children}
    </motion.h1>
  );
};

Title.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  animation: PropTypes.shape({
    initial: PropTypes.object,
    animate: PropTypes.object,
    transition: PropTypes.object,
  }),
};

export default Title;
