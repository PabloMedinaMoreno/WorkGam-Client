import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { resetPasswordSchema } from "../../schemas/authSchema";
import { resetPasswordService } from "../../services/authService";
import Card from "../../components/common/Card";
import Label from "../../components/common/Label";
import Input from "../../components/common/Input";
import IconButton from "../../components/common/IconButton"; // Importando IconButton
import { FaLock } from "react-icons/fa"; // Ícono de candado
import toast, { Toaster } from "react-hot-toast";

/**
 * Página de restablecimiento de contraseña.
 * Permite a los usuarios restablecer su contraseña utilizando un token de verificación.
 *
 * @returns {JSX.Element} La página de restablecimiento de contraseña.
 */
function ResetPasswordPage() {
  const { token } = useParams();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(resetPasswordSchema),
  });

  /**
   * Manejador de envío del formulario de restablecimiento de contraseña.
   * Restablece la contraseña con la nueva proporcionada.
   *
   * @param {object} data Los datos del formulario (nueva contraseña).
   */
  const onSubmit = async (data) => {
    try {
      setLoading(true);
      await resetPasswordService(token, data.password);
      toast.success("Contraseña restablecida con éxito");
      navigate("/login"); // Redirigir al usuario a la página de inicio de sesión después de restablecer la contraseña
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
          Restablecer Contraseña
        </h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Label htmlFor="password">Nueva Contraseña</Label>
            <Input
              id="password"
              type="password"
              placeholder="*****"
              {...register("password")}
              className="mt-1"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Botón de restablecimiento con IconButton */}
          <IconButton
            variant="primary"
            className="w-full bg-indigo-700 hover:bg-indigo-600 text-white flex items-center justify-center"
            type="submit"
            disabled={loading} // Deshabilitar el botón si está en proceso de carga
          >
            <FaLock />
            {loading ? "Restableciendo..." : "Restablecer Contraseña"}
          </IconButton>
        </form>
      </Card>
      <Toaster />
    </div>
  );
}

export default ResetPasswordPage;
