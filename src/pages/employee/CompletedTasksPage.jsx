// src/pages/employee/CompletedTasksPage.jsx
import React, { useEffect } from "react";
import useTaskStore from "../../store/useTaskStore";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

const CompletedTasksPage = () => {
  const { completedTasks, loading, loadMyCompletedTasks } = useTaskStore();

  useEffect(() => {
    loadMyCompletedTasks().catch((error) => {
      toast.error(error.message);
    });
  }, [loadMyCompletedTasks]);

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
        Tareas Completadas
      </motion.h1>

      {completedTasks.length === 0 ? (
        <p className="text-center">No tienes tareas completadas</p>
      ) : (
        <div className="max-h-[500px] overflow-y-auto pr-2 space-y-4">
          {completedTasks.map((task, index) => (
            <motion.div
              key={task.started_task_id}
              className="border p-4 rounded shadow bg-white"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <h2 className="font-semibold text-lg">{task.task_name}</h2>
              <p className="text-gray-600">{task.task_description}</p>
              <p className="text-sm text-gray-500">
                Asignada el: {new Date(task.start_date).toLocaleString()}
              </p>
              <p className="text-sm text-gray-500">
                Revisada el: {new Date(task.end_date).toLocaleString()}
              </p>
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
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CompletedTasksPage;
