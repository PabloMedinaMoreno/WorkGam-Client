// src/pages/ClientProcedureTasksPage.jsx
import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import useTaskStore from "../../store/useTaskStore";
import { CircularProgress } from "@mui/material";
import ClientStartedTasksTable from "../../components/tasks/ClientStartedTasksTable";
import ClientPendingTasksTable from "../../components/tasks/ClientPendingTasksTable";
import IconButton from "../../components/common/IconButton";
import { FaCheckCircle } from "react-icons/fa";

const ClientProcedureTasksPage = () => {
  const { id: startedProcedureId } = useParams();
  const navigate = useNavigate();

  const {
    clientStartedTasks,
    clientPendingTasks,
    loading,
    loadClientStartedTasks,
    loadClientPendingTasks,
    handleFileSelect,
    handleRemoveFile,
    handleConfirmUploads,
  } = useTaskStore();

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        await loadClientStartedTasks(startedProcedureId);
        await loadClientPendingTasks(startedProcedureId);
      } catch {
        toast.error("Error al cargar las tareas del trámite.");
        navigate(-1);
      }
    };
    fetchTasks();
  }, [
    loadClientStartedTasks,
    loadClientPendingTasks,
    startedProcedureId,
    navigate,
  ]);

  const onClick = async () => {
    await handleConfirmUploads(startedProcedureId);
  };

  // Determine if there's at least one pending task with an uploaded file
  const hasUploads = clientPendingTasks.some((t) => t.uploadedFile);

  if (loading) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <CircularProgress size={60} color="primary" />
      </div>
    );
  }

  return (
    <div className="p-8">
      <ClientStartedTasksTable tasks={clientStartedTasks} />

      <ClientPendingTasksTable
        tasks={clientPendingTasks}
        handleFileSelect={handleFileSelect}
        handleRemoveFile={handleRemoveFile}
      />

      {hasUploads && (
        <div className="mt-6 flex justify-end">
          <IconButton
            variant="success"
            label="Confirmar Subidas"
            onClick={onClick}
            className="px-6 py-3"
          >
            <FaCheckCircle />
          </IconButton>
        </div>
      )}
    </div>
  );
};

export default ClientProcedureTasksPage;
