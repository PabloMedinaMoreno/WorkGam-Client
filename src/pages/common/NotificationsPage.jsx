import React from "react";
import { useNotifications } from "../../context/NotificationsContext";
import { motion } from "framer-motion";
import IconButton from "../../components/common/IconButton";
import { FaEye, FaCheckDouble, FaTrash, FaTrashAlt } from "react-icons/fa"; // Importando los íconos para eliminar
import { CircularProgress } from "@mui/material";

const NotificationsPage = () => {
  const {
    notifications,
    loading,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    deleteAllNotifications,
  } = useNotifications();

  const hasUnread = notifications.some((noti) => !noti.is_read); // Verificar si hay notificaciones no leídas
  const hasNotifications = notifications.length > 0; // Verificar si hay notificaciones

  if (loading) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <CircularProgress size={60} color="primary" />
      </div>
    );
  }

  return (
    <div className="p-8">
      <motion.h1
        className="text-2xl sm:text-3xl font-semibold text-center mb-6 text-indigo-800"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Notificaciones
      </motion.h1>

      {/* Mostrar los botones solo si hay notificaciones no leídas o alguna notificación */}
      <motion.div
        className={`flex justify-center gap-4 mb-4 ${
          !hasNotifications ? "hidden" : ""
        }`} // Solo se muestra si hay notificaciones
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        {hasUnread && (
          <IconButton
            variant="success"
            onClick={markAllAsRead}
            label="Marcar todas como leídas"
          >
            <FaCheckDouble />
          </IconButton>
        )}

        {hasNotifications && (
          <IconButton
            variant="danger"
            onClick={deleteAllNotifications}
            label="Eliminar todas las notificaciones"
          >
            <FaTrashAlt />
          </IconButton>
        )}
      </motion.div>

      {notifications.length === 0 ? (
        <p className="text-center text-gray-600">No tienes notificaciones.</p>
      ) : (
        <div className="max-h-[500px] overflow-y-auto pr-2">
          <ul className="space-y-4">
            {notifications.map((noti, index) => (
              <motion.li
                key={noti.id}
                className="border p-4 rounded bg-white flex justify-between items-center shadow-lg"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <div>
                  <p>{noti.message}</p>
                  <small className="text-gray-500">
                    {new Date(noti.created_at).toLocaleString()}
                  </small>
                </div>
                <div className="flex items-center gap-2">
                  {/* Solo los iconos de marcar como leído y eliminar */}
                  {!noti.is_read && (
                    <IconButton
                      variant="success"
                      onClick={() => markAsRead(noti.id)}
                      label="Marcar como leído"
                    >
                      <FaEye />
                    </IconButton>
                  )}
                  <IconButton
                    variant="danger"
                    onClick={() => deleteNotification(noti.id)}
                    label="Eliminar notificación"
                  >
                    <FaTrash />
                  </IconButton>
                </div>
              </motion.li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default NotificationsPage;
