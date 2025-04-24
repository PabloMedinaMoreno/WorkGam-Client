import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { forgotPasswordSchema } from "../../schemas/authSchema";
import { Link } from "react-router-dom";
import { forgotPasswordService } from "../../services/authService";
import Card from "../../components/common/Card";
import Label from "../../components/common/Label";
import Input from "../../components/common/Input";
import Button from "../../components/common/Button";
import IconButton from "../../components/common/IconButton";
import { FaPaperPlane } from "react-icons/fa";
import toast, { Toaster } from "react-hot-toast";
import { motion } from "framer-motion";

/**
 * Página de recuperación de contraseña con animación de Framer Motion
 * y estela amarilla alrededor de la carta.
 *
 * @returns {JSX.Element} La página de recuperación de contraseña.
 */
function ForgotPasswordPage() {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      await forgotPasswordService(data.email);
      toast.success("¡Correo enviado! Revisa tu bandeja de entrada.");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative w-full max-w-md"
      >
        {/* Efecto de estela amarilla */}
        <motion.div
          initial={{ boxShadow: "0 0 0px rgba(255, 255, 0, 0)" }}
          animate={{
            boxShadow: [
              "0 0 0px rgba(255, 255, 0, 0)",
              "0 0 20px rgba(255, 255, 0, 0.8)",
              "0 0 0px rgba(255, 255, 0, 0)",
            ],
          }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0 rounded-lg"
        />

        <Card className="w-full p-8 shadow-lg rounded-lg bg-white relative">
          <h1 className="text-3xl font-semibold text-center mb-6 text-indigo-800">
            Recuperar Contraseña
          </h1>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <Label htmlFor="email">Correo Electrónico</Label>
              <Input
                id="email"
                type="email"
                placeholder="tuemail@dominio.com"
                {...register("email")}
                className="mt-1"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            <IconButton
              variant="primary"
              className="w-full bg-indigo-700 hover:bg-indigo-600 text-white flex items-center justify-center"
              type="submit"
              disabled={loading}
            >
              <FaPaperPlane className="mr-2" />
              {loading ? "Enviando..." : "Enviar enlace de restablecimiento"}
            </IconButton>
          </form>
          <div className="flex justify-between mt-4">
            <Link to="/login" className="text-indigo-700 font-medium">
              Regresar al inicio de sesión
            </Link>
          </div>
        </Card>
      </motion.div>
      <Toaster />
    </div>
  );
}

export default ForgotPasswordPage;
