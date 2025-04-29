// src/components/tasks/ClientStartedTasksTable.jsx
import React from "react";
import { motion } from "framer-motion";

const statusPillStyles = {
  pending: "bg-yellow-100 text-yellow-800 border border-yellow-200",
  completed: "bg-green-100 text-green-800 border border-green-200",
};

const statusLabels = {
  pending: "Pendiente",
  completed: "Aceptada",
};

const ClientStartedTasksTable = ({ tasks }) => {
  if (tasks.length === 0) return null;

  return (
    <div className="mb-8">
      <motion.h1
        className="text-xl sm:text-2xl font-semibold text-left mb-6 text-indigo-800"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Documentación adjuntada
      </motion.h1>

      <div className="bg-white rounded-lg shadow-xl p-6 overflow-x-auto max-h-[500px] overflow-y-auto">
        <table className="min-w-full">
          <thead className="bg-indigo-600 text-white text-left">
            <tr>
              <th className="py-2 px-4">Tarea</th>
              <th className="py-2 px-4">Iniciada</th>
              <th className="py-2 px-4">Aceptada</th>
              <th className="py-2 px-4">Estado</th>
              <th className="py-2 px-4">Documento</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((t, idx) => (
              <motion.tr
                key={t.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: idx * 0.05 }}
                className="border-b hover:bg-gray-100"
              >
                <td className="py-2 px-4 font-medium">{t.name}</td>
                <td className="py-2 px-4">
                  {new Date(t.start_date).toLocaleDateString()}
                </td>
                <td className="py-2 px-4">
                  {t.end_date ? new Date(t.end_date).toLocaleDateString() : "—"}
                </td>
                <td className="py-2 px-4">
                  <span
                    className={`inline-block px-3 py-1 text-sm font-semibold rounded-full ${
                      statusPillStyles[t.status]
                    }`}
                  >
                    {statusLabels[t.status] || t.status}
                  </span>
                </td>
                <td className="py-2 px-4">
                  {t.document_uploaded ? (
                    <a
                      href={t.document_uploaded}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-semibold text-indigo-700 hover:underline"
                    >
                      Ver
                    </a>
                  ) : (
                    <span className="text-gray-400">—</span>
                  )}
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ClientStartedTasksTable;
