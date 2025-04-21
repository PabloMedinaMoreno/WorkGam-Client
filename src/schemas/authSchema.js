import { z } from "zod";

/**
 * Schema for user login validation.
 *
 * Validates the email and password for user login.
 * The email must be in a valid format and the password must not be empty.
 *
 * @constant {import("zod").ZodSchema<{ email: string, password: string }>}
 */
export const loginSchema = z.object({
  email: z.string().email({ message: "El correo electrónico debe ser válido" }),
  password: z.string().min(1, { message: "La contraseña es requerida" }),
});

/**
 * Schema for user registration validation.
 *
 * Validates the user registration data, including:
 * - Username: required and non-empty.
 * - Email: must be a valid email.
 * - Phone: optional.
 * - Gender: must be either 'male' or 'female'.
 * - Password: must be at least 5 characters long.
 * - ConfirmPassword: must match the password.
 *
 * @constant {import("zod").ZodSchema<{ username: string, email: string, phone: string, gender: "male" | "female", password: string, confirmPassword: string }>}
 */
export const registerSchema = z
  .object({
    username: z
      .string()
      .min(1, { message: "El nombre de usuario es requerido" }),
    email: z
      .string()
      .email({ message: "El correo electrónico debe ser válido" }),
    phone: z.string().optional(),
    gender: z.enum(["male", "female"], {
      errorMap: () => ({
        message: "El género debe ser 'masculino' o 'femenino'",
      }),
    }),
    password: z.string().min(5, {
      message: "La contraseña debe tener al menos 5 caracteres",
    }),
    confirmPassword: z.string().min(1, {
      message: "La confirmación de contraseña es requerida",
    }),
  })
  // Check that the password and confirm password match
  .refine((data) => data.password === data.confirmPassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmPassword"],
  });

/**
 * Schema for updating the user's profile.
 *
 * Validates the updated profile information, including:
 * - Username: required and non-empty.
 * - Email: must be a valid email.
 * - Phone: optional.
 *
 * @constant {import("zod").ZodSchema<{ username: string, email: string, phone: string }>}
 */
export const updateProfileSchema = z.object({
  username: z.string().min(1, { message: "El nombre de usuario es requerido" }),
  email: z.string().email({ message: "El correo electrónico debe ser válido" }),
  phone: z.string().optional(),
});

/**
 * Schema for changing the user's password.
 *
 * Validates the change password data, including:
 * - Old Password: required and non-empty.
 * - New Password: must be at least 6 characters long.
 * - Confirm Password: must match the new password and be different from the old password.
 *
 * @constant {import("zod").ZodSchema<{ oldPassword: string, newPassword: string, confirmPassword: string }>}
 */
export const changePasswordSchema = z
  .object({
    oldPassword: z
      .string()
      .min(1, { message: "La contraseña actual es requerida" }),
    newPassword: z.string().min(5, {
      message: "La nueva contraseña debe tener al menos 5 caracteres",
    }),
    confirmPassword: z
      .string()
      .min(1, { message: "La confirmación de la contraseña es requerida" }),
  })
  // Check that the new password and confirm password match
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmPassword"],
  })
  // Check that the new password is different from the old password
  .refine((data) => data.oldPassword !== data.newPassword, {
    message: "La nueva contraseña debe ser diferente a la contraseña actual",
    path: ["newPassword"],
  });

/**
 * Schema for forgot password request.
 * 
 * Validates the email format for password recovery.
 * 
 * @constant {import("zod").ZodSchema<{ email: string }>}
 */
export const forgotPasswordSchema = z.object({
  email: z.string().email("Por favor ingresa un correo válido"),
});

/**
 * Schema for resetting the password.
 * 
 * Validates the new password format for password reset.
 * 
 * @constant {import("zod").ZodSchema<{ password: string }>}
 */
export const resetPasswordSchema = z.object({
  password: z
    .string()
    .min(5, { message: "La contraseña debe tener al menos 5 caracteres" }),
});
