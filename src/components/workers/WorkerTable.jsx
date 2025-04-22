import React from "react";
import { motion } from "framer-motion";
import ActionButtons from "../common/ActionButtons";

const WorkerTable = ({ workers, onEdit, onDelete }) => {
  return (
    <div className="bg-white rounded-lg shadow-xl p-6 overflow-x-auto max-h-[500px] overflow-y-auto">
      <table className="min-w-full">
        <thead className="bg-indigo-600 text-white text-left">
          <tr>
            <th className="py-2 px-4">Usuario</th>
            <th className="py-2 px-4">Email</th>
            <th className="py-2 px-4">Teléfono</th>
            <th className="py-2 px-4">Rol</th>
            <th className="py-2 px-4 text-right">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {workers.map((worker, index) => (
            <motion.tr
              key={worker.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="border-b hover:bg-gray-100 cursor-pointer" // Hover para resaltar la fila
            >
              <td className="py-2 px-4 flex items-center">
                <motion.img
                  src={worker.profile_pic}
                  alt={worker.username}
                  className="w-8 h-8 rounded-full mr-2"
                  whileHover={{ scale: 1.1 }}
                />
                <span><p className="font-medium">{worker.username}</p></span>
              </td>
              <td className="py-2 px-4">{worker.email}</td>
              <td className="py-2 px-4">{worker.phone || "N/A"}</td>
              <td className="py-2 px-4">{worker.role}</td>
              <td className="py-2 px-4 text-right">
                <ActionButtons
                  onEdit={() => onEdit(worker)}
                  onDelete={() => onDelete(worker.id)}
                  editLabel="Editar trabajador"
                  deleteLabel="Eliminar trabajador"
                />
              </td>
            </motion.tr>
          ))}
          {workers.length === 0 && (
            <tr>
              <td colSpan={5} className="text-center py-4">No hay trabajadores registrados.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default WorkerTable;
