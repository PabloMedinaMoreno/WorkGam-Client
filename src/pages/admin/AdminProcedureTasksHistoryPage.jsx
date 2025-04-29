import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import useTaskStore from "../../store/useTaskStore";
import { CircularProgress } from "@mui/material";

const AdminProcedureTasksHistoryPage = () => {
  const { id: startedProcessId } = useParams();
  const { allStartedTasks, loading, loadAllStartedTasks } = useTaskStore();
  const navigate = useNavigate();
  const [statusFilter, setStatusFilter] = useState("all");

  useEffect(() => {
    loadAllStartedTasks(startedProcessId).catch((error) => {
      toast.error(error.message);
    });
  }, [loadAllStartedTasks, startedProcessId]);


  const getStatusLabel = (status) => {
    switch (status) {
      case "pending":
        return "Pendiente";
      case "completed":
        return "Completada";
      case "rejected":
        return "Rechazada";
      default:
        return "Desconocido";
    }
  };

  const getStatusStyles = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "completed":
        return "bg-green-100 text-green-800 border-green-200";
      case "rejected":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const filteredTasks =
    statusFilter === "all"
      ? allStartedTasks
      : allStartedTasks.filter((task) => task.status === statusFilter);

  if (loading) {
      return (
        <div className="w-full h-screen flex justify-center items-center">
          <CircularProgress size={60} color="primary" />
        </div>
      );
    }

  return (
    <div className="p-8">
      <motion.h1
        className="text-2xl sm:text-3xl font-semibold text-center mb-6 text-indigo-800"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Tareas iniciadas del trámite
      </motion.h1>

      {loading ? (
        <CircularProgress />
      ) : allStartedTasks.length === 0 ? (
        <p className="text-gray-600">No hay tareas para este trámite.</p>
      ) : (
        <>
          <div className="mb-6">
            <label className="mr-2 font-medium">Filtrar por estado:</label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="border rounded px-3 py-1"
            >
              <option value="all">Todos</option>
              <option value="pending" className="bg-yellow-100 text-yellow-800">Pendiente</option>
              <option value="completed" className="bg-green-100 text-green-800">Completada</option>
              <option value="rejected" className="bg-red-100 text-red-800">Rechazada</option>
            </select>
          </div>

          <div className="space-y-4">
            {filteredTasks.map((task, index) => (
              <motion.div
                key={task.started_task_id}
                className="border p-4 rounded shadow bg-white"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <h2 className="font-semibold text-lg">{task.task_name}</h2>
                <p className="text-gray-600">{task.task_description}</p>
                <p className="text-sm text-gray-500">
                  Inicio: {new Date(task.start_date).toLocaleString()}
                  {task.end_date && (
                    <> | Final: {new Date(task.end_date).toLocaleString()}</>
                  )}
                </p>
                <p className="text-sm text-gray-500 mb-2">
                  Asignada a: {task.employee_username}
                </p>
                <span
                  className={`inline-block px-3 py-1 text-sm font-semibold border rounded-full ${getStatusStyles(
                    task.status
                  )}`}
                >
                  {getStatusLabel(task.status)}
                </span>

                {task.document_uploaded && (
                  <a
                    href={task.document_uploaded}
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-600 underline block mt-2"
                  >
                    Ver documento
                  </a>
                )}
              </motion.div>
            ))}
          </div>
        </>
      )}

      <motion.button
        onClick={() => navigate(-1)}
        className="mt-6 bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Volver
      </motion.button>
    </div>
  );
};

export default AdminProcedureTasksHistoryPage;
