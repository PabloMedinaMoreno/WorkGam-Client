import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TextField, Button } from "@mui/material";
import toast from "react-hot-toast";
import { changePasswordRequest } from "../../services/authService";
import { changePasswordSchema } from "../../schemas/authSchema.js";

/**
 * ChangePasswordModal component.
 *
 * Renders a modal that allows the user to change their password.
 * The form data is validated using the changePasswordSchema.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {Function} props.onClose - Function to call when closing the modal.
 * @returns {JSX.Element} The rendered modal component.
 */
const ChangePasswordModal = ({ onClose }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(changePasswordSchema),
  });

  /**
   * Handles the form submission to change the password.
   *
   * @async
   * @param {Object} data - The validated form data containing oldPassword, newPassword, and confirmPassword.
   * @returns {Promise<void>} Resolves when the password is changed.
   */
  const onSubmit = async (data) => {
    try {
      await changePasswordRequest(data);
      toast.success("Contraseña cambiada correctamente");
      onClose();
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <AnimatePresence>
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
          <button
            onClick={onClose}
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            aria-label="Cerrar modal"
          >
            &#x2715;
          </button>
          <h2 className="text-xl font-bold mb-4">Cambiar Contraseña</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
              {...register("oldPassword")}
              label="Contraseña Antigua"
              type="password"
              fullWidth
              margin="normal"
              error={!!errors.oldPassword}
              helperText={errors.oldPassword?.message}
            />
            <TextField
              {...register("newPassword")}
              label="Nueva Contraseña"
              type="password"
              fullWidth
              margin="normal"
              error={!!errors.newPassword}
              helperText={errors.newPassword?.message}
            />
            <TextField
              {...register("confirmPassword")}
              label="Confirmar Nueva Contraseña"
              type="password"
              fullWidth
              margin="normal"
              error={!!errors.confirmPassword}
              helperText={errors.confirmPassword?.message}
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
    </AnimatePresence>
  );
};

export default ChangePasswordModal;
