import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { loginSchema } from "../../schemas/authSchema.js";
import Card from "../../components/common/Card";
import Label from "../../components/common/Label";
import Input from "../../components/common/Input";
import IconButton from "../../components/common/IconButton"; // Importando IconButton
import { FaEye, FaEyeSlash, FaSignInAlt } from "react-icons/fa";
import { useAuth } from "../../context/AuthContext";
import { motion } from "framer-motion";

/**
 * Página de inicio de sesión.
 * Permite a los usuarios iniciar sesión utilizando su correo electrónico y contraseña.
 * Incluye animación de entrada y estela amarilla alrededor de la carta.
 *
 * @returns {JSX.Element} La página de inicio de sesión.
 */
function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  // Usa Zod para la validación del formulario
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(loginSchema) });

  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  /**
   * Manejador de envío del formulario.
   * Intenta autenticar al usuario utilizando las credenciales proporcionadas.
   *
   * @param {object} data Los datos del formulario (correo y contraseña).
   */
  const onSubmit = async (data) => {
    try {
      await login(data);
      toast.success("Inicio de sesión exitoso");
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Redirige al dashboard si el usuario está autenticado
  useEffect(() => {
    if (isAuthenticated) {
      console.log("Usuario autenticado, redirigiendo al dashboard...");
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center ">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative w-full max-w-md"
      >
        {/* Efecto de estela amarilla */}
        <motion.div
          initial={{ boxShadow: "0 0 0px rgba(255, 255, 0, 0)" }}
          animate={{ boxShadow: [
            "0 0 0px rgba(255, 255, 0, 0)",
            "0 0 20px rgba(255, 255, 0, 0.8)",
            "0 0 0px rgba(255, 255, 0, 0)"
          ] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0 rounded-lg"
        />

        <Card className="w-full p-8 shadow-lg rounded-lg bg-white relative">
          <h1 className="text-3xl font-semibold text-center mb-6 text-indigo-800"> 

          {/* bg-gradient-to-r from-indigo-700 to-yellow-600 text-transparent bg-clip-text */}
            Inicio de sesión
          </h1>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Correo Electrónico */}
            <div>
              <Label htmlFor="email">Correo electrónico</Label>
              <Input
                id="email"
                type="email"
                placeholder="tuemail@dominio.com"
                {...register("email")}
                className="mt-1"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
              )}
            </div>

            {/* Contraseña con icono de mostrar/ocultar */}
            <div>
              <Label htmlFor="password">Contraseña</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="*****"
                  {...register("password")}
                  className="mt-1 pr-10 w-full"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-500 hover:text-indigo-600 cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
              )}
            </div>

            {/* Botón de iniciar sesión con IconButton */}
            <IconButton
              variant="primary"
              className="w-full bg-indigo-700 hover:bg-indigo-600 text-white flex items-center justify-center"
              type="submit"
            >
              <FaSignInAlt className="mr-2" />
              Iniciar sesión
            </IconButton>
          </form>

          {/* Enlaces adicionales */}
          <div className="flex justify-between mt-4">
            <Link to="/forgot-password" className="text-indigo-700 font-medium">
              ¿Olvidaste tu contraseña?
            </Link>
            <Link to="/register" className="text-indigo-700 font-medium">
              Crear cuenta
            </Link>
          </div>
        </Card>
      </motion.div>
      <Toaster />
    </div>
  );
}

export default LoginPage;