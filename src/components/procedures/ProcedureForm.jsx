import React from "react";
import { TextField } from "@mui/material";

/**
 * ProcedureForm component.
 *
 * Renders form fields for the procedure's title and description.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {Function} props.register - Function to register form fields.
 * @param {Object} props.errors - Object containing form validation errors.
 * @returns {JSX.Element} The rendered form fields.
 */
const ProcedureForm = ({ register, errors }) => {
  return (
    <>
      <TextField
        {...register("name")}
        label="Título"
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

export default ProcedureForm;
