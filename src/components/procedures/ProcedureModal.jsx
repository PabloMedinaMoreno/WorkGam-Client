import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@mui/material";
import ProcedureForm from "./ProcedureForm";
import { createProcedureSchema } from "../../schemas/procedureSchema";

/**
 * ProcedureModal component.
 *
 * Renders a modal for creating or updating a procedure.
 * The form data is validated using the Zod schema.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {boolean} props.open - Flag indicating whether the modal is open.
 * @param {Function} props.onClose - Function to call when closing the modal.
 * @param {Function} props.onSubmit - Function to call with the form data upon submission.
 * @param {Object} [props.selectedProcedure] - The procedure to edit (if any).
 * @returns {JSX.Element} The rendered modal component.
 */
const ProcedureModal = ({ open, onClose, onSubmit, selectedProcedure }) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(createProcedureSchema),
  });

  useEffect(() => {
    if (selectedProcedure) {
      setValue("name", selectedProcedure.name);
      setValue("description", selectedProcedure.description);
    }
  }, [selectedProcedure, setValue]);

  /**
   * Handles form submission.
   *
   * @param {Object} data - The validated form data.
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
              {selectedProcedure ? "Editar Trámite" : "Nuevo Trámite"}
            </h2>
            <form onSubmit={handleSubmit(handleFormSubmit)}>
              <ProcedureForm register={register} errors={errors} />
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

export default ProcedureModal;
