import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { registerSchema } from "../../schemas/authSchema.js"; 
import Card from "../../components/common/Card";
import Input from "../../components/common/Input";
import Label from "../../components/common/Label";
import IconButton from "../../components/common/IconButton";  // Importando IconButton
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Íconos de mostrar/ocultar contraseña
import { FaUserPlus } from "react-icons/fa"; // Ícono de "registrarse"
import { useAuth } from "../../context/AuthContext";


/**
 * Página de registro de usuario.
 * Permite a los usuarios crear una nueva cuenta proporcionando sus datos.
 *
 * @returns {JSX.Element} La página de registro.
 */
function RegisterPage() {
  const { signup, isAuthenticated } = useAuth();
  
  // Usa Zod para la validación del formulario de registro
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
  });
  const navigate = useNavigate();

  // State to show/hide password
  const [showPassword, setShowPassword] = useState(false);

  /**
   * Manejador de envío del formulario de registro.
   * Registra al usuario con los datos proporcionados.
   *
   * @param {object} data Los datos del formulario.
   */
  const onSubmit = async (data) => {
    try {
      await signup(data);
      toast.success("Registro exitoso. Por favor, verifica tu correo electrónico para activar tu cuenta.");
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Redirige al dashboard si el usuario está autenticado
  useEffect(() => {
    if (isAuthenticated) navigate("/dashboard");
  }, [isAuthenticated, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <Card className="w-full max-w-md p-8 shadow-lg">
        <h1 className="text-3xl font-semibold text-center mb-6 text-indigo-800">
          Crear cuenta
        </h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Nombre de usuario */}
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
            {errors.username && (
              <p className="text-red-500 text-sm mt-1">
                {errors.username.message}
              </p>
            )}
          </div>

          {/* Correo electrónico */}
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

          {/* Teléfono (opcional) */}
          <div>
            <Label htmlFor="phone">Teléfono (Opcional)</Label>
            <Input
              id="phone"
              type="text"
              placeholder="+34 234 567 890"
              {...register("phone")}
              className="mt-1"
            />
            {errors.phone && (
              <p className="text-red-500 text-sm mt-1">
                {errors.phone.message}
              </p>
            )}
          </div>

          {/* Género: Botones de opción */}
          <div>
            <span className="block text-gray-700 font-medium mb-1">Género</span>
            <div className="flex items-center gap-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  value="male"
                  {...register("gender")}
                  className="mr-2"
                />
                Masculino
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  value="female"
                  {...register("gender")}
                  className="mr-2"
                />
                Femenino
              </label>
            </div>
            {errors.gender && (
              <p className="text-red-500 text-sm mt-1">
                {errors.gender.message}
              </p>
            )}
          </div>

          {/* Contraseña */}
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
                className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-500 hover:text-indigo-600"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Confirmar contraseña */}
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
              <button
                type="button"
                className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-500 hover:text-indigo-600"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm mt-1">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          {/* Botón de registro con IconButton */}
          <IconButton
            variant="primary"
            className="w-full bg-indigo-700 hover:bg-indigo-600 text-white flex items-center justify-center"
            type="submit"
          >
            <FaUserPlus/>
            Registrarse
          </IconButton>
        </form>
        <p className="text-center mt-4">
          ¿Ya tienes cuenta?{" "}
          <Link to="/login" className="text-indigo-700 font-medium">
            Iniciar sesión
          </Link>
        </p>
      </Card>
    </div>
  );
}

export default RegisterPage;
