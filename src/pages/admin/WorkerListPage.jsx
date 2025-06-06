import React, { useEffect, useState } from "react";
import WorkerTable from "../../components/workers/WorkerTable";
import WorkerModal from "../../components/workers/WorkerModal";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { FaPlus } from "react-icons/fa";
import IconButton from "../../components/common/IconButton.jsx";
import useWorkerStore from "../../store/useWorkerStore.js";
import { CircularProgress } from "@mui/material";

const WorkerListPage = () => {
  const { workers, loading, addOrUpdateWorker, deleteWorker, loadWorkers } =
    useWorkerStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedWorker, setSelectedWorker] = useState(null);

  useEffect(() => {
    const fetchWorkers = async () => {
      try {
        await loadWorkers();
      } catch (error) {
        toast.error(error.message);
      }
    };
    fetchWorkers();
  }, [loadWorkers]);

  const openModalForCreate = () => {
    setSelectedWorker(null);
    setIsModalOpen(true);
  };

  const openModalForEdit = (worker) => {
    setSelectedWorker(worker);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedWorker(null);
  };

  const handleAddOrUpdateWorker = async (workerData) => {
    try {
      console.log(workerData);
      await addOrUpdateWorker(workerData, selectedWorker);
      toast.success("Trabajador guardado correctamente");
    } catch (error) {
      toast.error(error.message);
    } finally {
      closeModal();
    }
  };

  const handleDeleteWorker = async (workerId) => {
    try {
      await deleteWorker(workerId);
      toast.success("Trabajador eliminado correctamente");
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
        Gestión de trabajadores
      </motion.h1>

      <motion.div
        className="mb-4 w-fit"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <IconButton
          variant="primary"
          onClick={openModalForCreate}
          label="Crear Trabajador"
        >
          <FaPlus />
        </IconButton>
      </motion.div>

      <WorkerTable
        workers={workers}
        onEdit={openModalForEdit}
        onDelete={handleDeleteWorker}
      />

      <WorkerModal
        open={isModalOpen}
        onClose={closeModal}
        onSubmit={handleAddOrUpdateWorker}
        selectedWorker={selectedWorker}
      />
    </div>
  );
};

export default WorkerListPage;
