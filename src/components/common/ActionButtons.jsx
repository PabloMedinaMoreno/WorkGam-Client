// src/components/common/ActionButtons.jsx
import React from "react";
import { IconButton, Tooltip } from "@mui/material";
import { FaEdit, FaTrash } from "react-icons/fa";

const ActionButtons = ({ onEdit, onDelete, editLabel = "Editar", deleteLabel = "Eliminar" }) => {
  return (
    <>
      <Tooltip title={editLabel} arrow>
        <IconButton color="primary" onClick={onEdit}>
          <FaEdit />
        </IconButton>
      </Tooltip>
      <Tooltip title={deleteLabel} arrow>
        <IconButton color="secondary" onClick={onDelete}>
          <FaTrash />
        </IconButton>
      </Tooltip>
    </>
  );
};

export default ActionButtons;
