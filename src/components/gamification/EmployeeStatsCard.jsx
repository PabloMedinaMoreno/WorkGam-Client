// src/components/gamification/EmployeeStatsCard.jsx
import React from "react";
import { motion } from "framer-motion";

const EmployeeStatsCard = ({ title, value, extraContent }) => {
  return (
    <motion.div
      className="bg-white rounded-lg shadow-xl p-6"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-xl font-bold mb-2">{title}</h2>
      <p className="text-3xl text-indigo-600 font-semibold">{value}</p>
      {extraContent && <div className="mt-2">{extraContent}</div>}
    </motion.div>
  );
};

export default EmployeeStatsCard;
