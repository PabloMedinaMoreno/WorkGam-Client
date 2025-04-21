import React from "react";
import { TextField } from "@mui/material";

/**
 * RoleForm component.
 *
 * Renders the form fields for a role's name and description.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {Function} props.register - Function provided by react-hook-form to register input fields.
 * @param {Object} props.errors - Object containing validation errors for the form fields.
 * @returns {JSX.Element} The rendered role form.
 */
const RoleForm = ({ register, errors }) => {
  return (
    <>
      <TextField
        {...register("name")}
        label="Nombre"
        fullWidth
        margin="normal"
        error={!!errors.name}
        helperText={errors.name?.message}
      />
      <TextField
        {...register("description")}
        label="Descripción"
        fullWidth
        margin="normal"
        error={!!errors.description}
        helperText={errors.description?.message}
      />
    </>
  );
};

export default RoleForm;
