import React, { useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import ClientProcedureTasksTable from "../../components/tasks/ClientProcedureTasksTable";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import toast from "react-hot-toast";
import useTaskStore from "../../store/useTaskStore";
import { motion } from "framer-motion";
import { FaCheckCircle } from "react-icons/fa";

const ClientProcedureTasksPage = () => {
  const location = useLocation();
  const { procedure } = location.state || {};
  const { id: startedProcedureId } = useParams();
  const navigate = useNavigate();

  const {
    tasks,
    loadTasks,
    loading,
    handleFileSelect,
    handleConfirmUploads,
    pendingUploads,
    setTaskFile,
  } = useTaskStore();

  useEffect(() => {
    if (!procedure) {
      toast.error("No se encontró el trámite");
      return;
    }

    loadTasks(procedure.id).catch((error) => {
      toast.error(error.message);
    });
  }, [loadTasks, procedure]);

  const handleRemoveFile = (taskId) => {
    setTaskFile(taskId, null); // custom action to remove file from task
  };

  const handleConfirm = async () => {
    await handleConfirmUploads(startedProcedureId);
    navigate("/dashboard/client/procedures");
  };

  if (loading) {
    return (
      <div className="p-8">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="p-8">
      <motion.h1
        className="text-3xl font-bold mb-4 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {procedure?.name || "Trámite"}
      </motion.h1>

      <motion.p
        className="text-gray-600 mb-8 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        {procedure?.description || "Descripción no disponible."}
      </motion.p>

      <ClientProcedureTasksTable
        procedure={procedure}
        tasks={tasks}
        onFileSelect={handleFileSelect}
        onRemoveFile={handleRemoveFile}
      />

      <motion.div
        className="mt-6 flex justify-end"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.5 }}
      >
        <button
          onClick={handleConfirm}
          className="bg-green-600 hover:bg-green-500 text-white px-6 py-3 rounded-md flex items-center gap-2 transition"
        >
          <FaCheckCircle className="text-lg" />
          Confirmar Subidas
        </button>
      </motion.div>
    </div>
  );
};

export default ClientProcedureTasksPage;
