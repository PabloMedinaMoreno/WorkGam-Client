import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TextField, Button } from "@mui/material";
import { useAuth } from "../../context/AuthContext";
import toast from "react-hot-toast";
import { updateProfileSchema } from "../../schemas/authSchema.js"

/**
 * UpdateProfileModal component.
 *
 * Renders a modal that allows the user to update their profile.
 * The form data is validated using the updateProfileSchema.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {Function} props.onClose - Function to call when closing the modal.
 * @returns {JSX.Element} The rendered modal component.
 */
const UpdateProfileModal = ({ onClose }) => {
  const { updateProfile, user } = useAuth();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(updateProfileSchema),
  });

  useEffect(() => {
    if (user) {
      setValue("username", user.username);
      setValue("email", user.email);
      setValue("phone", user.phone);
    }
  }, [user, setValue]);

  /**
   * Handles form submission to update the user profile.
   *
   * @async
   * @param {Object} data - The validated form data.
   * @returns {Promise<void>}
   */
  const onSubmit = async (data) => {
    try {
      await updateProfile(data);
      toast.success("Perfil actualizado correctamente");
    } catch (error) {
      toast.error(error.message);
    } finally {
      onClose();
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
          <h2 className="text-xl font-bold mb-4">Actualizar Perfil</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
              {...register("username")}
              label="Nombre Completo"
              fullWidth
              margin="normal"
              error={!!errors.username}
              helperText={errors.username?.message}
            />
            <TextField
              {...register("email")}
              label="Email"
              fullWidth
              margin="normal"
              error={!!errors.email}
              helperText={errors.email?.message}
            />
            <TextField
              {...register("phone")}
              label="Teléfono"
              fullWidth
              margin="normal"
              error={!!errors.phone}
              helperText={errors.phone?.message}
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

export default UpdateProfileModal;
