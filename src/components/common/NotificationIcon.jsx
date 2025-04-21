// src/components/ui/NotificationIcon.jsx
import React from "react";
import { Badge } from "@mui/material";
import { FaBell } from "react-icons/fa";
import { useNotifications } from "../../context/NotificationsContext";

const NotificationIcon = () => {
  const { unreadCount } = useNotifications();

  return (
    <Badge badgeContent={unreadCount} color="secondary">
      <FaBell />
    </Badge>
  );
};

export default NotificationIcon;
