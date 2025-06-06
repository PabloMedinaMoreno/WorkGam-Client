// src/pages/ClientProcedures.jsx
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import useProcedureStore from "../../store/useProcedureStore.js";
import { useAuth } from "../../context/AuthContext";
import { motion } from "framer-motion";
import { FaPlay } from "react-icons/fa";
import IconButton from "../../components/common/IconButton.jsx";
import { CircularProgress } from "@mui/material";

const AvailableProceduresPage = () => {
  const navigate = useNavigate();
  const { procedures, loading, startProcedure, loadProcedures } =
    useProcedureStore();
  const { socket } = useAuth();

  useEffect(() => {
    loadProcedures().catch((error) => {
      toast.error(error.message);
    });
  }, [loadProcedures]);

  const handleStartProcedure = async (procedure) => {
    try {
      const startedProcedure = await startProcedure(procedure.id, socket.id);
      navigate(`/dashboard/client/procedures/${startedProcedure.id}/tasks`, {
        state: { procedure },
      });
    } catch (error) {
      toast.error(error.message);
    }
  };

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
        Trámites disponibles
      </motion.h1>

      {procedures.length === 0 ? (
        <p className="text-center text-gray-600">
          No hay trámites disponibles en este momento.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {procedures.map((proc, index) => (
            <motion.div
              key={proc.id}
              className="border p-6 rounded shadow bg-white flex flex-col justify-between"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <div>
                <h2 className="text-xl font-semibold mb-2">
                  {proc.name}
                </h2>
                <p className="text-gray-600 mb-4">{proc.description}</p>
              </div>
              <IconButton
                variant="primary"
                onClick={() => handleStartProcedure(proc)}
                label="Iniciar Trámite"
              >
                <FaPlay />
              </IconButton>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AvailableProceduresPage;
