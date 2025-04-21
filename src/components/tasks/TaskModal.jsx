import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@mui/material";
import TaskForm from "./TaskForm";
import { taskSchema } from "../../schemas/taskSchema";
import useRoleStore from "../../store/useRoleStore";
import toast from "react-hot-toast";

/**
 * TaskModal component.
 *
 * Renders a modal for creating or editing a task.
 * Uses react-hook-form with Zod (via zodResolver) to validate the form data.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {boolean} props.open - Flag to control the visibility of the modal.
 * @param {Function} props.onClose - Callback function to close the modal.
 * @param {Function} props.onSubmit - Callback function invoked with the form data upon submission.
 * @param {Object} [props.selectedTask] - Optional task data for editing an existing task.
 * @returns {JSX.Element} The rendered task modal component.
 */
const TaskModal = ({ open, onClose, onSubmit, selectedTask }) => {
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
    resolver: zodResolver(taskSchema),
    defaultValues: { difficulty: "medium", role_id: "" },
  });

  useEffect(() => {
    if (selectedTask) {
      setValue("name", selectedTask.name);
      setValue("description", selectedTask.description);
      setValue("xp", parseInt(selectedTask.xp, 10));
      setValue("estimated_duration_days", parseInt(selectedTask.estimated_duration_days, 10));
      setValue("difficulty", selectedTask.difficulty);
      setValue("role_id", selectedTask.role_id);
    }
  }, [selectedTask, setValue, roles]);

  /**
   * Handles form submission.
   *
   * @param {Object} data - The validated form data containing task information.
   */
  const handleFormSubmit = (data) => {
    // Ensure the values are parsed to integers
    data.xp = parseInt(data.xp, 10);
    data.estimated_duration_days = parseInt(data.estimated_duration_days, 10);
  
    // Submit the form with parsed data
    onSubmit({ ...selectedTask, ...data });
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
              {selectedTask ? "Editar Tarea" : "Nueva Tarea"}
            </h2>
            <form onSubmit={handleSubmit(handleFormSubmit)}>
              <TaskForm
                register={register}
                errors={errors}
                watch={watch}
                roles={roles}
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

export default TaskModal;
