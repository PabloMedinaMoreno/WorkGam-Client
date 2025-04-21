// src/pages/employee/PendingTasksPage.jsx
import React, { useEffect, useState } from "react";
import useTaskStore from "../../store/useTaskStore";
import { toast } from "react-hot-toast";
import { useAuth } from "../../context/AuthContext";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import { motion, AnimatePresence } from "framer-motion";

const CountdownTimer = ({ initialTimeLeftMs }) => {
  // Estado local para controlar el tiempo restante
  const [timeLeftMs, setTimeLeftMs] = useState(initialTimeLeftMs);

  useEffect(() => {
    // Disminuye en 1 segundo el tiempo restante cada 1000ms
    const timer = setInterval(() => {
      setTimeLeftMs((prev) => prev - 1000);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Si el tiempo es negativo, calculamos el retraso
  const isOverdue = timeLeftMs < 0;
  const displayMs = Math.abs(timeLeftMs);

  // Convertimos ms a días, horas, minutos, segundos
  const days = Math.floor(displayMs / (1000 * 60 * 60 * 24));
  const hours = Math.floor((displayMs / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((displayMs / (1000 * 60)) % 60);
  const seconds = Math.floor((displayMs / 1000) % 60);

  if (isOverdue) {
    return (
      <span className="text-red-600 font-semibold text-sm">
        Retrasada por {days}d {hours}h {minutes}m {seconds}s
      </span>
    );
  }

  return (
    <span className="text-green-600 font-semibold text-sm">
      Quedan {days}d {hours}h {minutes}m {seconds}s
    </span>
  );
};


/* Componente RejectTaskModal:
   Modal animado para solicitar el motivo de rechazo de la tarea.
   Sin fondo opaco, permitiendo ver el contenido detrás. */
const RejectTaskModal = ({ task, onConfirm, onCancel }) => {
  const [reason, setReason] = useState("");

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none"
        // Eliminamos bg-black y bg-opacity para que se vea el contenido detrás
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="bg-white rounded-lg p-6 w-96 pointer-events-auto shadow-lg"
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

const PendingTasksPage = () => {
  const { pendingTasks, loadMyPendingTasks, acceptTask, rejectTask, loading } = useTaskStore();
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

  // Abre el modal de rechazo para la tarea en cuestión
  const handleOpenRejectModal = (task) => {
    setRejectingTask(task);
  };

  // Confirma el rechazo
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

  // if (loading) {
  //   return (
  //     <div className="p-8">
  //       <LoadingSpinner />
  //     </div>
  //   );
  // }

  return (
    <div className="p-8">
      <motion.h1
        className="text-3xl font-bold mb-6 text-center"
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

              {/* Si el backend te da time_left_ms, lo usamos en el CountdownTimer */}
              {typeof task.time_left_ms === "number" && (
                <div className="mt-2">
                  <CountdownTimer initialTimeLeftMs={task.time_left_ms} />
                </div>
              )}

              {/* Enlace al documento subido, si existe */}
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

      {/* Modal de rechazo, con animaciones */}
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
