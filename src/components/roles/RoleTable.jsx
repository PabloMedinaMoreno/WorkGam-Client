import React from "react";
import { motion } from "framer-motion";
import ActionButtons from "../common/ActionButtons";

const RoleTable = ({ roles, onEdit, onDelete }) => {
  return (
    <div className="bg-white rounded-lg shadow-xl p-6 overflow-x-auto max-h-[500px] overflow-y-auto">
      <table className="min-w-full">
        <thead className="bg-indigo-700 text-white text-left">
          <tr>
            <th className="py-2 px-4">Rol</th>
            <th className="py-2 px-4">Descripción</th>
            <th className="py-2 px-4 text-right">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {roles.map((role, index) => (
            <motion.tr
              key={role.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="border-b hover:bg-gray-100"
            >
              <td className="py-2 px-4 font-medium">{role.name}</td>
              <td className="py-2 px-4">{role.description}</td>
              <td className="py-2 px-4 text-right">
                <ActionButtons
                  onEdit={() => onEdit(role)}
                  onDelete={() => onDelete(role.id)}
                  editLabel="Editar rol"
                  deleteLabel="Eliminar rol"
                />
              </td>
            </motion.tr>
          ))}
          {roles.length === 0 && (
            <tr>
              <td colSpan={3} className="text-center py-4">
                No hay roles registrados.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default RoleTable;
