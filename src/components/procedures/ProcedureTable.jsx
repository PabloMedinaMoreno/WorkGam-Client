// src/components/procedures/ProcedureTable.jsx
import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import ActionButtons from "../common/ActionButtons";

const ProcedureTable = ({ procedures, onEdit, onDelete }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-lg shadow-xl p-6 overflow-x-auto max-h-[500px] overflow-y-auto">
      <table className="min-w-full">
        <thead className="bg-indigo-600 text-white text-left">
          <tr>
            <th className="py-2 px-4">Título</th>
            <th className="py-2 px-4">Descripción</th>
            <th className="py-2 px-4 text-right">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {procedures.map((procedure, index) => (
            <motion.tr
              key={procedure.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="border-b hover:bg-gray-100 cursor-pointer"
              onClick={() =>
                navigate(`/dashboard/admin/procedures/${procedure.id}/tasks`, {
                  state: { procedure },
                })
              }
            >
              <td className="py-2 px-4 font-medium">{procedure.name}</td>
              <td className="py-2 px-4">{procedure.description}</td>
              <td
                className="py-2 px-4 text-right"
                onClick={(e) => e.stopPropagation()} // Evita que al hacer click en los botones se dispare la navegación
              >
                <ActionButtons
                  onEdit={() => onEdit(procedure)}
                  onDelete={() => onDelete(procedure.id)}
                  editLabel="Editar trámite"
                  deleteLabel="Eliminar trámite"
                />
              </td>
            </motion.tr>
          ))}
          {procedures.length === 0 && (
            <tr>
              <td colSpan={3} className="text-center py-4">
                No hay trámites registrados.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ProcedureTable;
