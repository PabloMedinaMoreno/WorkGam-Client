// src/pages/admin/AdminProceduresPage.jsx
import React, { useEffect, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import ProcedureTable from "../../components/procedures/ProcedureTable";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import ProcedureModal from "../../components/procedures/ProcedureModal";
import toast from "react-hot-toast";
import useProcedureStore from "../../store/useProcedureStore";
import { motion } from "framer-motion";
import IconButton from "../../components/common/IconButton";
import { FaPlus } from "react-icons/fa";

const ProceduresListPage = () => {
  const {
    procedures,
    loading,
    loadProcedures,
    addOrUpdateProcedure,
    deleteProcedure,
  } = useProcedureStore();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProcedure, setSelectedProcedure] = useState(null);

  useEffect(() => {
    loadProcedures().catch((err) => {
      toast.error(err.message || "Error cargando los trámites");
    });
  }, [loadProcedures]);

  const openModalForCreate = () => {
    setSelectedProcedure(null);
    setIsModalOpen(true);
  };

  const openModalForEdit = (procedure) => {
    setSelectedProcedure(procedure);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProcedure(null);
  };

  const handleAddOrUpdateProcedure = async (procedureData) => {
    try {
      await addOrUpdateProcedure(procedureData, selectedProcedure);
      toast.success("Trámite guardado correctamente");
    } catch (error) {
      toast.error(error.message);
    } finally {
      closeModal();
    }
  };

  const handleDeleteProcedure = async (procedureId) => {
    try {
      await deleteProcedure(procedureId);
      toast.success("Trámite eliminado correctamente");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="p-8">
      <motion.h1
        className="text-3xl font-bold mb-6 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Gestión de Trámites
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
          label="Crear Trámite"
        >
          <FaPlus />
        </IconButton>
      </motion.div>

      <ProcedureTable
        procedures={procedures}
        onEdit={openModalForEdit}
        onDelete={handleDeleteProcedure}
      />

      <ProcedureModal
        open={isModalOpen}
        onClose={closeModal}
        onSubmit={handleAddOrUpdateProcedure}
        selectedProcedure={selectedProcedure}
      />
    </div>
  );
};

export default ProceduresListPage;
