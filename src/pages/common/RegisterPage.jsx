import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { registerSchema } from "../../schemas/authSchema.js"; 
import Card from "../../components/common/Card";
import Button from "../../components/common/Button";
import Input from "../../components/common/Input";
import Label from "../../components/common/Label";
import { useAuth } from "../../context/AuthContext";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function Register() {
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

  const onSubmit = async (data) => {
    try {
      await signup(data);
      toast.success("Registro exitoso. Por favor, verifica tu correo electrónico para activar tu cuenta.");
    } catch (error) {
      console.error("Error registering", error);
      if (Array.isArray(error.message)) {
        error.message.forEach((message) => toast.error(message));
      } else {
        toast.error(error.message);
      }
    }
  };

  useEffect(() => {
    if (isAuthenticated) navigate("/dashboard");
  }, [isAuthenticated, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Card className="w-full max-w-md p-8 shadow-lg">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Crear cuenta</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Username */}
          <div>
            <Label htmlFor="username">Nombre de usuario</Label>
            <Input
              id="username"
              type="text"
              placeholder="Write your name"
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

          {/* Email */}
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="youremail@domain.tld"
              {...register("email")}
              className="mt-1"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Phone (optional) */}
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

          {/* Gender: Radio Buttons */}
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

          {/* Password */}
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

          {/* Confirm Password */}
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

          <Button className="w-full bg-indigo-700 hover:bg-indigo-600 text-white ">
            Registrarse
          </Button>
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

export default Register;
