// src/components/tasks/TaskTable.jsx
import React from "react";
import { motion } from "framer-motion";
import ActionButtons from "../common/ActionButtons";

const TaskTable = ({ tasks, onEdit, onDelete }) => {
  return (
    <div className="bg-white rounded-lg shadow-xl p-6 overflow-x-auto max-h-[500px] overflow-y-auto">
      <table className="min-w-full">
        <thead className="bg-indigo-600 text-white text-left">
          <tr>
            <th className="py-2 px-4">Nombre</th>
            <th className="py-2 px-4">Descripción</th>
            <th className="py-2 px-4">XP</th>
            <th className="py-2 px-4">Dificultad</th>
            <th className="py-2 px-4">Duración (días)</th>
            <th className="py-2 px-4 text-right">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {tasks.length === 0 ? (
            <tr>
              <td colSpan={6} className="text-center py-4">
                No hay tareas registradas.
              </td>
            </tr>
          ) : (
            tasks.map((task, index) => (
              <motion.tr
                key={task.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="border-b hover:bg-gray-100"
              >
                <td className="py-2 px-4 font-medium">{task.name}</td>
                <td className="py-2 px-4">{task.description}</td>
                <td className="py-2 px-4">{task.xp}</td>
                <td className="py-2 px-4">{task.difficulty}</td>
                <td className="py-2 px-4">{task.estimated_duration_days}</td>
                <td className="py-2 px-4 text-right">
                  <ActionButtons
                    onEdit={() => onEdit(task)}
                    onDelete={() => onDelete(task.id)}
                    editLabel="Editar tarea"
                    deleteLabel="Eliminar tarea"
                  />
                </td>
              </motion.tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TaskTable;
