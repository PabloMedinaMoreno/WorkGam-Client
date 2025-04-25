import React from "react";
import { motion } from "framer-motion";
import { FaTrash } from "react-icons/fa";
import FileUploadButton from "../common/FileUploadButton";
import { IconButton, Tooltip } from "@mui/material";

const ClientProcedureTasksTable = ({
  procedure,
  tasks,
  onFileSelect,
  onRemoveFile,
}) => {
  if (!procedure)
    return <div className="p-8">No se encontraron datos del trámite.</div>;
  if (tasks.length === 0)
    return <p>No hay tareas registradas para este trámite.</p>;

  return (
    <div className="overflow-x-auto bg-white rounded shadow">
      <table className="min-w-full">
        <thead className="bg-indigo-600 text-white">
          <tr>
            <th className="py-3 px-4 text-left">Tarea</th>
            <th className="py-3 px-4 text-left">Descripción</th>
            <th className="py-3 px-4 text-left">Documento</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task, index) => (
            <motion.tr
              key={task.id}
              className="border-b last:border-0 hover:bg-gray-50"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <td className="py-3 px-4 font-medium">{task.name}</td>
              <td className="py-3 px-4">{task.description}</td>
              <td className="py-3 px-4">
                {task.uploadedFile ? (
                  <div className="flex items-center">
                    <a
                      href={URL.createObjectURL(task.uploadedFile)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 underline"
                    >
                      {task.uploadedFile.name}
                    </a>
                    <Tooltip title={"Eliminar archivo"} arrow>
                      <IconButton
                        color="secondary"
                        onClick={() => onRemoveFile(task.id)}
                      >
                        <FaTrash />
                      </IconButton>
                    </Tooltip>
                  </div>
                ) : (
                  <FileUploadButton
                    onFileSelect={(file) =>
                      onFileSelect(task.id, file, task.name)
                    }
                    label="Adjuntar PDF"
                  />
                )}
              </td>
            </motion.tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ClientProcedureTasksTable;
