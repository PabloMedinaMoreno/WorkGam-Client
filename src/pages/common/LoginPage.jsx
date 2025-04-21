import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { loginSchema } from "../../schemas/authSchema.js"; 
import Card from "../../components/common/Card";
import Label from "../../components/common/Label";
import Input from "../../components/common/Input";
import Button from "../../components/common/Button";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useAuth } from "../../context/AuthContext";

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

  const onSubmit = async (data) => {
    try {
      await login(data);
      toast.success("Inicio de sesión exitoso");
    } catch (error) {
      console.error("Error logging in", error);
      const msg =
        Array.isArray(error.message) ? error.message : [error.message || "Error en el inicio de sesión"];
      msg.forEach((m) => toast.error(m));
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Card className="w-full max-w-md p-8 shadow-lg">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Inicio de Sesión</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
              <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>

          {/* Password with toggle icon */}
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
              <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
            )}
          </div>

          {/* Submit Button */}
          <Button className="w-full bg-indigo-700 hover:bg-indigo-600 text-white ">
            Iniciar sesión
          </Button>
        </form>

        {/* Additional Links for Forgot Password and Sign Up */}
        <div className="flex justify-between mt-4">
          <Link to="/forgot-password" className="text-indigo-700 font-medium">
            ¿Olvidaste tu contraseña?
          </Link>
          <Link to="/register" className="text-indigo-700 font-medium">
            Crear cuenta
          </Link>
        </div>
      </Card>
      <Toaster />
    </div>
  );
}

export default LoginPage;
