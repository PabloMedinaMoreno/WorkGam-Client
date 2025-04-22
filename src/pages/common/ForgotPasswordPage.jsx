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
import IconButton from "../../components/common/IconButton"; // Importando IconButton
import { FaPaperPlane } from "react-icons/fa"; // Ícono de enviar
import toast, { Toaster } from "react-hot-toast";

/**
 * Página de recuperación de contraseña.
 * Permite a los usuarios recuperar su contraseña proporcionando su correo electrónico.
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

  /**
   * Manejador de envío del formulario de recuperación de contraseña.
   * Envía un enlace de restablecimiento al correo proporcionado.
   *
   * @param {object} data Los datos del formulario (correo electrónico).
   */
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
    <div className="min-h-screen flex items-center justify-center">
      <Card className="w-full max-w-md p-8 shadow-lg">
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

          {/* Botón para enviar el enlace de restablecimiento con IconButton */}
          <IconButton
            variant="primary"
            className="w-full bg-indigo-700 hover:bg-indigo-600 text-white flex items-center justify-center"
            type="submit"
            disabled={loading} // Deshabilitar el botón si está en proceso de carga
          >
            <FaPaperPlane />
            {loading ? "Enviando..." : "Enviar enlace de restablecimiento"}
          </IconButton>
        </form>
        <div className="flex justify-between mt-4">
          <Link to="/login" className="text-indigo-700 font-medium">
            Regresar al inicio de sesión
          </Link>
        </div>
      </Card>
      <Toaster />
    </div>
  );
}

export default ForgotPasswordPage;
