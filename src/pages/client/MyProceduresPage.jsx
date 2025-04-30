import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import useProcedureStore from "../../store/useProcedureStore";
import { useAuth } from "../../context/AuthContext";
import IconButton from "../../components/common/IconButton";
import { motion } from "framer-motion";
import { CircularProgress } from "@mui/material";
import { FaEdit, FaTimes, FaFileAlt } from "react-icons/fa";

const MyProceduresPage = () => {
  const {
    myStartedProcedures,
    loading,
    cancelProcedure,
    loadMyStartedProcedures,
  } = useProcedureStore();
  const navigate = useNavigate();
  const { socket } = useAuth();
  const [statusFilter, setStatusFilter] = useState("all");

  useEffect(() => {
    loadMyStartedProcedures().catch((error) => {
      toast.error(error.message);
    });
  }, [loadMyStartedProcedures]);

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

  const handleCancel = async (procedureId) => {
    try {
      await cancelProcedure(procedureId, socket.id);
      toast.success("Trámite cancelado exitosamente.");
    } catch (error) {
      console.error("Error canceling procedure", error);
      toast.error(error.message);
    }
  };

  const filteredProcedures =
    statusFilter === "all"
      ? myStartedProcedures
      : myStartedProcedures.filter((proc) => proc.status === statusFilter);

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
        Mis trámites iniciados
      </motion.h1>

      {/* Filtro de estado responsive */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-2 mb-6">
        <label className="font-medium">Filtrar por estado:</label>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="w-full sm:w-auto border rounded px-3 py-1"
        >
          <option value="all">Todos</option>
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

      {filteredProcedures.length === 0 ? (
        <p className="text-center text-gray-600">
          {statusFilter === "all"
            ? "No has iniciado ningún trámite todavía."
            : "No hay trámites con ese estado."}
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProcedures.map((startedProcedure, index) => (
            <motion.div
              key={startedProcedure.id}
              className="h-full border border-gray-200 rounded-lg p-6 shadow bg-white flex flex-col justify-between"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <div className="flex-1 flex flex-col">
                <h2 className="text-xl font-semibold mb-2">
                  {startedProcedure.name}
                </h2>
                <p className="text-gray-600 mb-2 flex-1">
                  {startedProcedure.description}
                </p>

                <div>
                  <p className="text-sm text-gray-500 mb-1">
                    Inicio:{" "}
                    {new Date(startedProcedure.start_date).toLocaleString()}
                  </p>

                  {startedProcedure.status === "completed" &&
                    startedProcedure.end_date && (
                      <p className="text-sm text-gray-500 mb-1">
                        Finalización:{" "}
                        {new Date(startedProcedure.end_date).toLocaleString()}
                      </p>
                    )}
                </div>

                <span
                  className={`inline-block px-3 py-1 text-sm font-semibold border rounded-full mt-2 self-start ${getStatusStyles(
                    startedProcedure.status
                  )}`}
                >
                  {getStatusLabel(startedProcedure.status)}
                </span>
              </div>

              <div className="flex flex-col gap-2 mt-4">
                {startedProcedure.status !== "completed" ? (
                  <>
                    <IconButton
                      variant="primary"
                      label="Editar Documentación"
                      onClick={() =>
                        navigate(
                          `/dashboard/client/procedures/${startedProcedure.id}/tasks`,
                          {
                            state: {
                              procedure: {
                                id: startedProcedure.procedure_id,
                                name: startedProcedure.name,
                                description: startedProcedure.description,
                              },
                            },
                          }
                        )
                      }
                    >
                      <FaEdit />
                    </IconButton>

                    <IconButton
                      variant="danger"
                      label="Cancelar Trámite"
                      onClick={() => handleCancel(startedProcedure.id)}
                    >
                      <FaTimes />
                    </IconButton>
                  </>
                ) : (
                  <IconButton
                    variant="primary"
                    label="Consultar Documentación"
                    onClick={() =>
                      navigate(
                        `/dashboard/client/procedures/${startedProcedure.id}/tasks`,
                        {
                          state: {
                            procedure: {
                              id: startedProcedure.procedure_id,
                              name: startedProcedure.name,
                              description: startedProcedure.description,
                            },
                          },
                        }
                      )
                    }
                  >
                    <FaFileAlt />
                  </IconButton>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyProceduresPage;
