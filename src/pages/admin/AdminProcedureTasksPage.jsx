// src/pages/AdminProcedureTasksPage.jsx
import React, { useState, useEffect } from "react";
import { FaPlus } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import TaskModal from "../../components/tasks/TaskModal";
import TaskTable from "../../components/tasks/TaskTable";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import toast from "react-hot-toast";
import useTaskStore from "../../store/useTaskStore";
import { motion } from "framer-motion";
import IconButton from "../../components/common/IconButton";
import { CircularProgress } from "@mui/material";

const AdminProcedureTasksPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { procedure } = location.state || {};

  if (!procedure) {
    return <div>No se encontró el trámite</div>;
  }

  const { tasks, loading, addOrUpdateTask, deleteTask, loadTasks } = useTaskStore();

  useEffect(() => {
    loadTasks(procedure.id).catch((error) => {
      toast.error(error.message);
    });
  }, [loadTasks, procedure.id]);

  const [open, setOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  const openModalForCreate = () => {
    setSelectedTask(null);
    setOpen(true);
  };

  const openModalForEdit = (task) => {
    setSelectedTask(task);
    setOpen(true);
  };

  const closeModal = () => {
    setOpen(false);
    setSelectedTask(null);
  };

  const handleAddOrUpdateTask = async (taskData) => {
    try {
      await addOrUpdateTask(selectedTask, taskData);
      toast.success("Tarea guardada");
    } catch (error) {
      toast.error(error.message);
    } finally {
      closeModal();
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await deleteTask(taskId);
      toast.success("Tarea eliminada");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="p-8">
      <motion.h1
        className="text-3xl font-semibold text-center mb-4 text-indigo-800"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {procedure.name}
      </motion.h1>

      <motion.p
        className="text-gray-600 mb-8 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        {procedure.description}
      </motion.p>

      <motion.div
        className="mb-4 w-fit"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <IconButton
          variant="primary"
          onClick={openModalForCreate}
          label="Crear Tarea"
        >
          <FaPlus />
        </IconButton>
      </motion.div>

      {loading ? (
        <CircularProgress />
      ) : (
        <TaskTable
          tasks={tasks}
          onEdit={openModalForEdit}
          onDelete={handleDeleteTask}
        />
      )}

      <TaskModal
        open={open}
        onClose={closeModal}
        onSubmit={handleAddOrUpdateTask}
        selectedTask={selectedTask}
      />

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

export default AdminProcedureTasksPage;
