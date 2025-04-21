// src/pages/ResetPasswordPage.jsx
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { resetPasswordSchema } from "../../schemas/authSchema";
import { resetPasswordService } from "../../services/authService";
import Card from "../../components/common/Card";
import Label from "../../components/common/Label";
import Input from "../../components/common/Input";
import Button from "../../components/common/Button";
import toast, { Toaster } from "react-hot-toast";

function ResetPasswordPage() {
  const { token } = useParams();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(resetPasswordSchema),
  });

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      await resetPasswordService(token, data.password);
      toast.success("Contraseña restablecida con éxito");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Card className="w-full max-w-md p-8 shadow-lg">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">
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

          <Button className="w-full bg-indigo-700 hover:bg-indigo-600 text-white">
            Restablecer Contraseña
          </Button>
        </form>
      </Card>
      <Toaster />
    </div>
  );
}

export default ResetPasswordPage;
