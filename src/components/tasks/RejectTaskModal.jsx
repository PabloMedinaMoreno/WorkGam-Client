// src/components/tasks/RejectTaskModal.jsx
import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

/**
 * Modal para ingresar el motivo de rechazo de una tarea.
 */
const RejectTaskModal = ({ task, onConfirm, onCancel }) => {
  const [reason, setReason] = useState("");

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 flex items-center justify-center z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="bg-white rounded-lg p-6 w-96 shadow-lg"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
        >
          <h2 className="text-xl font-bold mb-4">Motivo de Rechazo</h2>
          <textarea
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            className="w-full p-2 border rounded mb-4"
            placeholder="Escribe el motivo de rechazo..."
          />
          <div className="flex justify-end gap-4">
            <button
              onClick={onCancel}
              className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 transition"
            >
              Cancelar
            </button>
            <button
              onClick={() => {
                onConfirm(reason);
                setReason("");
              }}
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
            >
              Confirmar
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default RejectTaskModal;
