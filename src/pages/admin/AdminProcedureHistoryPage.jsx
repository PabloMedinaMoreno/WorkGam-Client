// src/pages/admin/AdminProcedureHistoryPage.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import useProcedureStore from "../../store/useProcedureStore";
import { CircularProgress } from "@mui/material";

const AdminProcedureHistoryPage = () => {
  const navigate = useNavigate();
  const { allStartedProcedures, loading, loadAllStartedProcedures } =
    useProcedureStore();

  const [statusFilter, setStatusFilter] = useState("all");

  useEffect(() => {
    loadAllStartedProcedures().catch((error) => {
      toast.error(error.message);
    });
  }, [loadAllStartedProcedures]);

  const handleProcedureClick = (startedProcedureId) => {
    navigate(`/dashboard/admin/procedure-history/${startedProcedureId}/tasks`);
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case "pending":
        return "Pendiente";
      case "in_progress":
        return "En Progreso";
      case "completed":
        return "Completado";
      default:
        return "Desconocido";
    }
  };

  const getStatusStyles = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "in_progress":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "completed":
        return "bg-green-100 text-green-800 border-green-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const filteredProcedures =
    statusFilter === "all"
      ? allStartedProcedures
      : allStartedProcedures.filter((proc) => proc.status === statusFilter);

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
        Historial de Trámites Iniciados
      </motion.h1>

      {allStartedProcedures.length === 0 ? (
        <p className="text-center">No hay trámites iniciados.</p>
      ) : (
        <>
          <div className="mb-6">
            <label className="mr-2 font-medium">Filtrar por estado:</label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="border rounded px-3 py-1"
            >
              <option value="all" className="bg-white text-black">
                Todos
              </option>
              <option value="pending" className="bg-yellow-100 text-yellow-800">
                Pendiente
              </option>
              <option value="in_progress" className="bg-blue-100 text-blue-800">
                En Progreso
              </option>
              <option value="completed" className="bg-green-100 text-green-800">
                Completado
              </option>
            </select>
          </div>

          <div className="space-y-4">
            {filteredProcedures.map((proc, index) => (
              <motion.div
                key={proc.started_procedure_id}
                className="border p-4 rounded shadow bg-white cursor-pointer hover:bg-gray-100"
                onClick={() => handleProcedureClick(proc.started_procedure_id)}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <h2 className="font-semibold text-lg mb-1">
                  {proc.procedure_name}
                </h2>
                <p className="text-gray-600 mb-1">
                  Cliente: {proc.client_username}
                </p>
                <p className="text-sm text-gray-500 mb-2">
                  Inicio: {new Date(proc.start_date).toLocaleString()}
                  {proc.end_date && (
                    <> | Final: {new Date(proc.end_date).toLocaleString()}</>
                  )}
                </p>
                <span
                  className={`inline-block px-3 py-1 text-sm font-semibold border rounded-full ${getStatusStyles(
                    proc.status
                  )}`}
                >
                  {getStatusLabel(proc.status)}
                </span>
              </motion.div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default AdminProcedureHistoryPage;
