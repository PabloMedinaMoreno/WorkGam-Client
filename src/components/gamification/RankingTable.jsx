import React from "react";
import { motion } from "framer-motion";
import { useAuth } from "../../context/AuthContext";

const RankingTable = ({ ranking, onRowClick }) => {
  const { user } = useAuth();
  const getRowStyles = (index, isCurrentUser) => {
    if (isCurrentUser) return "bg-yellow-100 border-l-4 border-yellow-500";
    if (index === 0) return "bg-yellow-300 font-semibold";
    if (index === 1) return "bg-gray-300 font-semibold";
    if (index === 2) return "bg-orange-300 font-semibold";
    return "";
  };

  const getOrdinalPosition = (index) => {
    const position = index + 1;
    const ordinal = `${position}º`;
    const medal = {
      0: "🥇",
      1: "🥈",
      2: "🥉",
    }[index];
    return medal ? `${ordinal} ${medal}` : ordinal;
  };

  return (
    <div className="bg-white rounded-lg shadow-xl p-6 overflow-x-auto max-[500px] overflow-y-auto">
      <motion.h1
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="text-2xl sm:text-3xl font-semibold text-center mb-6 text-indigo-800"
      >
        Ranking
      </motion.h1>

      <div className="max-h-96 overflow-y-auto">
        <table className="min-w-full">
          <thead className="bg-indigo-600 text-white text-left sticky top-0 z-10">
            <tr>
              <th className="py-2 px-4">Posición</th>
              <th className="py-2 px-4">Usuario</th>
              <th className="py-2 px-4">XP</th>
              <th className="py-2 px-4">Nivel</th>
            </tr>
          </thead>

          <tbody>
            {ranking.map((employee, index) => {
              const isCurrentUser = user.id === employee.id;
              return (
                <motion.tr
                  key={employee.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className={`border-b cursor-pointer hover:bg-gray-100 ${getRowStyles(
                    index,
                    isCurrentUser
                  )}`}
                  onClick={() => onRowClick && onRowClick(employee)}
                >
                  <td className="py-2 px-4">{getOrdinalPosition(index)}</td>
                  <td className="py-2 px-4 flex items-center">
                    <motion.img
                      src={employee.profile_pic}
                      alt={employee.username}
                      className="w-8 h-8 rounded-full mr-2"
                      whileHover={{ scale: 1.1 }}
                    />
                    <span>
                      {employee.username}
                      {isCurrentUser && (
                        <span className="ml-2 text-xs text-yellow-700 font-semibold">
                          (Tú)
                        </span>
                      )}
                    </span>
                  </td>
                  <td className="py-2 px-4">{employee.xp_total}</td>
                  <td className="py-2 px-4">{employee.level.name}</td>
                </motion.tr>
              );
            })}
            {ranking.length === 0 && (
              <tr>
                <td className="py-2 px-4 text-center" colSpan="4">
                  No hay datos de ranking.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RankingTable;
