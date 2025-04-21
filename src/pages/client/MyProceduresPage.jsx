// src/pages/client/MyProceduresPage.jsx
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import useProcedureStore from "../../store/useProcedureStore";
import { useAuth } from "../../context/AuthContext";
import { FaEdit, FaTimes } from "react-icons/fa";
import IconButton from "../../components/common/IconButton";
import { motion } from "framer-motion";

const MyProceduresPage = () => {
  const {
    myStartedProcedures,
    loading,
    cancelProcedure,
    loadMyStartedProcedures,
  } = useProcedureStore();
  const navigate = useNavigate();
  const { socket } = useAuth();

  // Cargar los trámites iniciados por el cliente
  useEffect(() => {
    loadMyStartedProcedures().catch((error) => {
      toast.error(error.message);
    });
  }, [loadMyStartedProcedures]);

  // Función para asignar estilos según el estado del trámite
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

  const handleCancel = async (procedureId) => {
    try {
      await cancelProcedure(procedureId, socket.id);
      toast.success("Trámite cancelado exitosamente.");
    } catch (error) {
      console.error("Error canceling procedure", error);
      toast.error(error.message);
    }
  };

  // if (loading) {
  //   return (
  //     <div className="p-8">
  //       <LoadingSpinner />
  //     </div>
  //   );
  // }

  console.log("Mis trámites iniciados:", myStartedProcedures);

  return (
    <div className="p-8">
      <motion.h1
        className="text-3xl font-bold mb-6 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Mis Trámites Iniciados
      </motion.h1>

      {myStartedProcedures.length === 0 ? (
        <p className="text-center">No has iniciado ningún trámite todavía.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {myStartedProcedures.map((startedProcedure, index) => (
            <motion.div
              key={startedProcedure.id}
              className="border border-gray-200 rounded-lg p-6 shadow bg-white flex flex-col justify-between"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <div>
                <h2 className="text-xl font-semibold mb-2">
                  {startedProcedure.name}
                </h2>
                <p className="text-gray-600 mb-2">
                  {startedProcedure.description}
                </p>

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

                <span
                  className={`inline-block px-3 py-1 text-sm font-semibold border rounded-full mt-2 ${getStatusStyles(
                    startedProcedure.status
                  )}`}
                >
                  {startedProcedure.status === "pending" && "Pendiente"}
                  {startedProcedure.status === "in_progress" && "En Progreso"}
                  {startedProcedure.status === "completed" && "Completado"}
                </span>
              </div>

              <div className="flex flex-col gap-2 mt-4">
                {startedProcedure.status !== "completed" && (
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
