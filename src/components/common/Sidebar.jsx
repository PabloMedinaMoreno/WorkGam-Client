// src/components/ui/Sidebar.jsx
import React from "react";
import { NavLink } from "react-router-dom";
import clsx from "clsx";
import { motion } from "framer-motion";
import { FaSignOutAlt } from "react-icons/fa";
import { useAuth } from "../../context/AuthContext";

const Sidebar = ({ options }) => {
  // Variantes de animación para el sidebar
  const sidebarVariants = {
    hidden: { x: "-100%", opacity: 0 },
    visible: { x: 0, opacity: 1 },
    exit: { x: "-100%", opacity: 0, transition: { duration: 0.3 } },
  };

  const { logout } = useAuth();

  return (
    <motion.aside
      variants={sidebarVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="bg-indigo-700 text-white w-20 md:w-56 h-[80vh] flex flex-col transition-all duration-300 shadow-xl rounded-lg mx-4 my-4"
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
                "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors duration-200 hover:bg-indigo-600",
                isActive ? "bg-indigo-600 font-semibold" : ""
              )
            }
          >
            <div className="text-lg">{option.icon}</div>
            <span className="hidden md:inline text-sm">{option.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="mt-auto px-4 py-4">
        <motion.button
          onClick={logout}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-full flex items-center justify-center p-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition"
        >
          <FaSignOutAlt size={20} />
        </motion.button>
      </div>
    </motion.aside>
  );
};

export default Sidebar;
