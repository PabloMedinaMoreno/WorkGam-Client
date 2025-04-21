// src/components/ui/PendingTasksIcon.jsx
import React from "react";
import { FaTasks } from "react-icons/fa";
import { Badge } from "@mui/material";
import useTaskStore from "../../store/useTaskStore";

const PendingTasksIcon = () => {
  // Se obtiene la cantidad de tareas pendientes desde el store
  const pendingTasks = useTaskStore((state) => state.pendingTasks);
  const count = pendingTasks.length;

  return (
    <Badge
      badgeContent={count}
      color="secondary"
      // Ajusta la posición del badge si lo deseas
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
    >
      <FaTasks />
    </Badge>
  );
};

export default PendingTasksIcon;
