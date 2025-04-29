import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { registerSchema } from "../../schemas/authSchema.js";
import Card from "../../components/common/Card";
import Input from "../../components/common/Input";
import Label from "../../components/common/Label";
import IconButton from "../../components/common/IconButton";
import { FaEye, FaEyeSlash, FaUserPlus } from "react-icons/fa";
import { useAuth } from "../../context/AuthContext";
import { motion } from "framer-motion";

/**
 * Página de registro de usuario con animación de Framer Motion
 * y estela amarilla alrededor de la carta, con padding extra para evitar cortes.
 */
function RegisterPage() {
  const { signup, isAuthenticated } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(registerSchema) });
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (data) => {
    try {
      await signup(data);
      toast.success("Registro exitoso. Por favor, verifica tu correo electrónico para activar tu cuenta.");
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (isAuthenticated) navigate("/dashboard");
  }, [isAuthenticated, navigate]);

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
            Crear cuenta
          </h1>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <Label htmlFor="username">Nombre de usuario</Label>
              <Input
                id="username"
                type="text"
                placeholder="Escribe tu nombre"
                {...register("username")}
                autoFocus
                className="mt-1"
              />
              {errors.username && <p className="text-red-500 text-sm mt-1">{errors.username.message}</p>}
            </div>

            <div>
              <Label htmlFor="email">Correo electrónico</Label>
              <Input id="email" type="email" placeholder="tuemail@dominio.com" {...register("email")} className="mt-1" />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
            </div>

            <div>
              <Label htmlFor="phone">Teléfono (Opcional)</Label>
              <Input id="phone" type="text" placeholder="+34 234 567 890" {...register("phone")} className="mt-1" />
              {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>}
            </div>

            <div>
              <span className="block text-gray-700 font-medium mb-1">Género</span>
              <div className="flex items-center gap-4">
                <label className="flex items-center">
                  <input type="radio" value="male" {...register("gender")} className="mr-2" /> Masculino
                </label>
                <label className="flex items-center">
                  <input type="radio" value="female" {...register("gender")} className="mr-2" /> Femenino
                </label>
              </div>
              {errors.gender && <p className="text-red-500 text-sm mt-1">{errors.gender.message}</p>}
            </div>

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
                <button type="button" className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-500 hover:text-indigo-600 cursor-pointer" onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
            </div>

            <div>
              <Label htmlFor="confirmPassword">Confirmar contraseña</Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  type={showPassword ? "text" : "password"}
                  placeholder="*****"
                  {...register("confirmPassword")}
                  className="mt-1 pr-10 w-full"
                />
                <button type="button" className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-500 hover:text-indigo-600 cursor-pointer" onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>}
            </div>

            <IconButton variant="primary" className="w-full bg-indigo-700 hover:bg-indigo-600 text-white flex items-center justify-center" type="submit">
              <FaUserPlus className="mr-2" /> Registrarse
            </IconButton>
          </form>

          <p className="text-center mt-4">
            ¿Ya tienes cuenta? <Link to="/login" className="text-indigo-700 font-medium">Iniciar sesión</Link>
          </p>
        </Card>
      </motion.div>
    </div>
  );
}

export default RegisterPage;
