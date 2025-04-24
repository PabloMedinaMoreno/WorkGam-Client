// src/pages/employee/PendingTasksPage.jsx
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import useTaskStore from "../../store/useTaskStore";
import { motion, AnimatePresence } from "framer-motion";
import CountdownTimer from "../../components/common/CountdownTimer";
import RejectTaskModal from "../../components/tasks/RejectTaskModal";
import { useAuth } from "../../context/AuthContext";

/**
 * Página de Tareas Pendientes donde se gestionan las tareas que el usuario aún no ha completado.
 */
const PendingTasksPage = () => {
  const { pendingTasks, loadMyPendingTasks, acceptTask, rejectTask, loading } =
    useTaskStore();
  const { socket } = useAuth();
  const [rejectingTask, setRejectingTask] = useState(null);

  useEffect(() => {
    loadMyPendingTasks().catch((error) => {
      toast.error(error.message);
    });
  }, [loadMyPendingTasks]);

  const handleComplete = async (taskId) => {
    try {
      await acceptTask(taskId, socket.id);
      toast.success("Tarea completada");
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleOpenRejectModal = (task) => {
    setRejectingTask(task);
  };

  const handleConfirmReject = async (reason) => {
    if (!reason.trim()) {
      toast.error("Por favor, ingresa un motivo de rechazo.");
      return;
    }
    try {
      await rejectTask(rejectingTask.started_task_id, reason, socket.id);
      toast.success("Tarea rechazada");
      setRejectingTask(null);
    } catch (error) {
      toast.error("Error rechazando tarea");
    }
  };

  return (
    <div className="p-8">
      <motion.h1
        className="text-2xl sm:text-3xl font-semibold text-center mb-6 text-indigo-800"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Tareas Pendientes
      </motion.h1>

      {pendingTasks.length === 0 ? (
        <p className="text-center">No tienes tareas pendientes</p>
      ) : (
        <div className="overflow-x-auto overflow-y-auto pr-2 space-y-4 max-h-[600px]">
          {pendingTasks.map((task, index) => (
            <motion.div
              key={task.started_task_id}
              className="border p-4 rounded shadow bg-white"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <h2 className="font-semibold text-lg">
                {task.task_name} <span className="text-gray-500">({task.procedure_name})</span>
              </h2>
              <p className="text-gray-600">{task.task_description}</p>

              {typeof task.time_left_ms === "number" && (
                <div className="mt-2">
                  <CountdownTimer initialTimeLeftMs={task.time_left_ms} />
                </div>
              )}

              {task.document_uploaded && (
                <a
                  href={task.document_uploaded}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-600 underline mt-2 block"
                >
                  Ver documento
                </a>
              )}

              <div className="mt-4 flex gap-2">
                <button
                  onClick={() => handleComplete(task.started_task_id)}
                  className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 transition"
                >
                  Aceptar
                </button>
                <button
                  onClick={() => handleOpenRejectModal(task)}
                  className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition"
                >
                  Rechazar
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      <AnimatePresence>
        {rejectingTask && (
          <RejectTaskModal
            task={rejectingTask}
            onConfirm={handleConfirmReject}
            onCancel={() => setRejectingTask(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default PendingTasksPage;
