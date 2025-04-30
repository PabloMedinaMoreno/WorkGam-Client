import React from "react";
import { useNotifications } from "../../context/NotificationsContext";
import { motion } from "framer-motion";
import IconButton from "../../components/common/IconButton";
import { FaEye, FaCheckDouble, FaTrash, FaTrashAlt } from "react-icons/fa";
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

  const hasUnread = notifications.some((noti) => !noti.is_read);
  const hasNotifications = notifications.length > 0;

  if (loading) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <CircularProgress size={60} color="primary" />
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-8">
      <motion.h1
        className="text-xl sm:text-3xl font-semibold text-center mb-4 sm:mb-6 text-indigo-800"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Notificaciones
      </motion.h1>

      <motion.div
        className={`flex flex-col sm:flex-row justify-center gap-2 sm:gap-4 mb-4 ${!hasNotifications ? "hidden" : ""}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        {hasUnread && (
          <IconButton
            variant="success"
            onClick={markAllAsRead}
            label="Marcar todas como leídas"
            className="w-full sm:w-auto"
          >
            <FaCheckDouble className="text-lg sm:text-xl" />
          </IconButton>
        )}

        {hasNotifications && (
          <IconButton
            variant="danger"
            onClick={deleteAllNotifications}
            label="Eliminar todas las notificaciones"
            className="w-full sm:w-auto"
          >
            <FaTrashAlt className="text-lg sm:text-xl" />
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
                className="border p-4 rounded bg-white flex flex-col sm:flex-row justify-between items-start sm:items-center shadow-lg"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <div className="flex-1 mb-2 sm:mb-0">
                  <p className="text-sm sm:text-base">{noti.message}</p>
                  <small className="text-gray-500 text-xs sm:text-sm">
                    {new Date(noti.created_at).toLocaleString()}
                  </small>
                </div>
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
                  {!noti.is_read && (
                    <IconButton
                      variant="success"
                      onClick={() => markAsRead(noti.id)}
                      label="Marcar como leído"
                      className="w-full sm:w-auto"
                    >
                      <FaEye className="text-base sm:text-lg" />
                    </IconButton>
                  )}
                  <IconButton
                    variant="danger"
                    onClick={() => deleteNotification(noti.id)}
                    label="Eliminar notificación"
                    className="w-full sm:w-auto"
                  >
                    <FaTrash className="text-base sm:text-lg" />
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