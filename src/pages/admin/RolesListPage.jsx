// src/pages/admin/RolesListPage.jsx
import React, { useEffect, useState } from "react";
import RoleTable from "../../components/roles/RoleTable";
import RoleModal from "../../components/roles/RoleModal";
import LoadingSpinner from "../../components/common/LoadingSpinner.jsx";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { FaPlus } from "react-icons/fa";
import IconButton from "../../components/common/IconButton.jsx";
import useRoleStore from "../../store/useRoleStore.js";
import { CircularProgress } from "@mui/material";

const RolesListPage = () => {
  const { roles, loading, addOrUpdateRole, deleteRole, loadRoles } =
    useRoleStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState(null);

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        await loadRoles();
      } catch (error) {
        toast.error(error.message);
      }
    };
    fetchRoles();
  }, [loadRoles]);

  const openModalForCreate = () => {
    setSelectedRole(null);
    setIsModalOpen(true);
  };

  const openModalForEdit = (role) => {
    setSelectedRole(role);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedRole(null);
  };

  const handleAddOrUpdateRole = async (roleData) => {
    try {
      await addOrUpdateRole(roleData, selectedRole);
      toast.success("Rol guardado correctamente");
    } catch (error) {
      toast.error(error.message);
    } finally {
      closeModal();
    }
  };

  const handleDeleteRole = async (roleId) => {
    try {
      await deleteRole(roleId);
      toast.success("Rol eliminado correctamente");
    } catch (error) {
      toast.error(error.message);
    }
  };

  // if (loading) {
  //   return (
  //     <div className="w-full h-screen flex justify-center items-center">
  //       <CircularProgress size={60} color="primary" />
  //     </div>
  //   );
  // }

  return (
    <div className="p-8">
      <motion.h1
        className="text-2xl sm:text-3xl font-semibold text-center mb-6 text-indigo-800"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Gestión de Roles
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
          label="Crear Rol"
        >
          <FaPlus />
        </IconButton>
      </motion.div>

      <RoleTable
        roles={roles}
        onEdit={openModalForEdit}
        onDelete={handleDeleteRole}
      />

      <RoleModal
        open={isModalOpen}
        onClose={closeModal}
        onSubmit={handleAddOrUpdateRole}
        selectedRole={selectedRole}
      />
    </div>
  );
};

export default RolesListPage;
