// src/components/tasks/ClientPendingTasksTable.jsx
import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import IconButton from "../common/IconButton";
import { Upload, X } from "lucide-react";

const ClientPendingTasksTable = ({
  tasks,
  handleFileSelect,
  handleRemoveFile,
}) => {
  const [previews, setPreviews] = useState({});

  useEffect(() => {
    const newPreviews = {};
    tasks.forEach((t) => {
      if (t.uploadedFile && t.uploadedFile.type === "application/pdf") {
        newPreviews[t.id] = URL.createObjectURL(t.uploadedFile);
      }
    });
    Object.values(previews).forEach(URL.revokeObjectURL);
    setPreviews(newPreviews);
    return () => Object.values(newPreviews).forEach(URL.revokeObjectURL);
  }, [tasks]);

  if (tasks.length === 0) return null;

  return (
    <div className="mb-8">
      <motion.h1
        className="text-xl sm:text-2xl font-semibold text-left mb-6 text-indigo-800"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Tareas pendientes 
      </motion.h1>
      <div className="bg-white rounded-lg shadow-xl p-6 overflow-x-auto max-h-[500px] overflow-y-auto">
        <table className="min-w-full">
          <thead className="bg-indigo-600 text-white text-left">
            <tr>
              <th className="py-2 px-4">Tarea</th>
              <th className="py-2 px-4">Descripción</th>
              <th className="py-2 px-4">Archivo</th>
              <th className="py-2 px-4 text-right">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((t, idx) => {
              const inputRef = useRef(null);
              return (
                <motion.tr
                  key={t.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: idx * 0.05 }}
                  className="border-b hover:bg-gray-100"
                >
                  <td className="py-2 px-4 font-medium">{t.name}</td>
                  <td className="py-2 px-4">{t.description}</td>
                  <td className="py-2 px-4">
                    {t.uploadedFile ? (
                      <a
                        href={previews[t.id]}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-medium text-indigo-700 hover:underline"
                      >
                        {t.uploadedFile.name}
                      </a>
                    ) : (
                      <span className="text-gray-400">—</span>
                    )}
                  </td>
                  <td className="py-2 px-4 flex justify-end gap-2">
                    {!t.uploadedFile ? (
                      <>
                        <input
                          type="file"
                          accept="application/pdf"
                          className="hidden"
                          ref={inputRef}
                          onChange={(e) =>
                            e.target.files.length &&
                            handleFileSelect(t.id, e.target.files[0], t.name)
                          }
                        />
                        <IconButton
                          variant="primary"
                          label="Seleccionar PDF"
                          onClick={() => inputRef.current.click()}
                          className="px-3 py-1"
                        >
                          <Upload className="w-4 h-4" />
                        </IconButton>
                      </>
                    ) : (
                      <IconButton
                        variant="danger"
                        label="Quitar"
                        onClick={() => handleRemoveFile(t.id)}
                        className="px-3 py-1"
                      >
                        <X className="w-4 h-4" />
                      </IconButton>
                    )}
                  </td>
                </motion.tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ClientPendingTasksTable;
