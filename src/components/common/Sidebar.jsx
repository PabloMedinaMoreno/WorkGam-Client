import React from "react";
import { NavLink } from "react-router-dom";
import clsx from "clsx";
import { motion } from "framer-motion";

const Sidebar = ({ options }) => {
  // Variantes de animación para el sidebar
  const sidebarVariants = {
    hidden: { x: "-100%", opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeInOut", // Mejora el easing para una transición más suave
      },
    },
    exit: {
      x: "-100%",
      opacity: 0,
      transition: {
        duration: 0.5,
        ease: "easeInOut",
      },
    },
  };

  return (
    <motion.aside
      variants={sidebarVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="bg-gradient-to-b from-indigo-700 to-yellow-600 text-white w-20 md:w-56 h-[80vh] flex flex-col transition-all duration-500 shadow-xl rounded-lg mx-4 my-4"
    >
      <div className="text-center py-6 hidden md:block">
        <h2 className="text-xl font-bold tracking-wide">Menú</h2>
      </div>

      <nav className="flex flex-col gap-2 px-2">
        {options.map((option) => (
          <NavLink
            key={option.path}
            to={option.path}
            className={({ isActive }) =>
              clsx(
                "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors duration-200 hover:bg-yellow-400",
                isActive ? "bg-yellow-400 font-semibold" : ""
              )
            }
          >
            <div className="text-lg">{option.icon}</div>
            <span className="hidden md:inline text-sm">{option.label}</span>
          </NavLink>
        ))}
      </nav>
    </motion.aside>
  );
};

export default Sidebar;
