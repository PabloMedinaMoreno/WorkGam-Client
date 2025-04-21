// src/components/ui/IconButton.jsx
import React from "react";
import { motion } from "framer-motion";
import clsx from "clsx";

const variantStyles = {
  primary: "bg-indigo-600 hover:bg-indigo-500 text-white",
  success: "bg-green-600 hover:bg-green-500 text-white",
  danger: "bg-red-600 hover:bg-red-500 text-white",
  neutral: "bg-gray-300 hover:bg-gray-400 text-gray-800",
};

const IconButton = ({
  children,
  label,
  onClick,
  variant = "primary",
  type = "button",
  className = "",
}) => {
  return (
    <motion.button
      type={type}
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={clsx(
        "inline-flex items-center justify-center gap-2 px-4 py-2 rounded-md transition-colors cursor-pointer",
        variantStyles[variant],
        className
      )}
    >
      {children}
      <span>{label}</span>
    </motion.button>
  );
};

export default IconButton;
