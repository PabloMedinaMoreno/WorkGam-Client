import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@mui/material";
import WorkerForm from "./WorkerForm";
import { workerSchema } from "../../schemas/workerSchema";
import useRoleStore from "../../store/useRoleStore";
import toast from "react-hot-toast";

/**
 * WorkerModal component.
 *
 * Renders a modal for creating or editing a worker.
 * Uses react-hook-form with Zod (via zodResolver) to validate the form data.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {boolean} props.open - Flag to control the visibility of the modal.
 * @param {Function} props.onClose - Callback function to close the modal.
 * @param {Function} props.onSubmit - Callback function invoked with the form data upon submission.
 * @param {Object} [props.selectedWorker] - Optional worker data for editing an existing worker.
 * @returns {JSX.Element} The rendered worker modal component.
 */
const WorkerModal = ({ open, onClose, onSubmit, selectedWorker }) => {
  const { roles, loadRoles } = useRoleStore();

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

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: { role_id: "", gender: "", phone: "N/A" },
  });

  useEffect(() => {
    if (selectedWorker) {
      setValue("username", selectedWorker.username);
      setValue("email", selectedWorker.email);
      setValue("phone", selectedWorker.phone || "");
      setValue("gender", selectedWorker.gender || "");
      if (roles.length > 0) {
        const roleFound = roles.find(
          (r) => r.name.toLowerCase() === selectedWorker.role.toLowerCase()
        );
        setValue("role_id", roleFound ? roleFound.id : "");
      }
    }
  }, [selectedWorker, setValue, roles]);

  /**
   * Handles form submission.
   *
   * @param {Object} data - The validated form data containing worker information.
   */
  const onFormSubmit = (data) => {
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
            className="bg-white rounded-lg p-6 w-96 pointer-events-auto shadow-lg relative"
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
            <h2 className="text-xl font-bold mb-4">
              {selectedWorker ? "Editar Trabajador" : "Crear Trabajador"}
            </h2>
            <form onSubmit={handleSubmit(onFormSubmit)} className="w-80">
              <WorkerForm
                register={register}
                errors={errors}
                watch={watch}
                roles={roles}
                selectedWorker={selectedWorker}
              />
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

export default WorkerModal;
