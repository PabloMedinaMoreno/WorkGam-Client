import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@mui/material";
import RoleForm from "./RoleForm";
import { roleSchema } from "../../schemas/roleSchema";

/**
 * RoleModal component.
 *
 * Renders a modal for creating or editing a role.
 * Uses react-hook-form with Zod (via zodResolver) to validate the form data.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {boolean} props.open - Flag to control the visibility of the modal.
 * @param {Function} props.onClose - Callback function to close the modal.
 * @param {Function} props.onSubmit - Callback function invoked with the form data upon submission.
 * @param {Object} [props.selectedRole] - Optional role data for editing an existing role.
 * @returns {JSX.Element} The rendered role modal component.
 */
const RoleModal = ({ open, onClose, onSubmit, selectedRole }) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(roleSchema),
  });

  // Preload form values if a role is selected (edit mode)
  useEffect(() => {
    if (selectedRole) {
      setValue("name", selectedRole.name);
      setValue("description", selectedRole.description);
    }
  }, [selectedRole, setValue]);

  /**
   * Handles form submission.
   *
   * @param {Object} data - The validated role data.
   */
  const handleFormSubmit = (data) => {
    onSubmit(data);
    onClose();
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white rounded-lg p-6 w-80 pointer-events-auto shadow-lg relative"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              aria-label="Cerrar modal"
            >
              &#x2715;
            </button>
            {/* Modal title */}
            <h2 className="text-xl font-bold mb-4">
              {selectedRole ? "Editar Rol" : "Crear Rol"}
            </h2>
            {/* Role form */}
            <form onSubmit={handleSubmit(handleFormSubmit)}>
              <RoleForm register={register} errors={errors} />
              <div className="mt-4 flex justify-end gap-4">
                <Button onClick={onClose} color="secondary">
                  Cancelar
                </Button>
                <Button type="submit" color="primary">
                  Guardar
                </Button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default RoleModal;
