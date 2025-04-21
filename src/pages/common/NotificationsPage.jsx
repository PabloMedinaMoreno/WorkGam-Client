// src/pages/NotificationsPage.jsx
import React from "react";
import { useNotifications } from "../../context/NotificationsContext";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import { motion } from "framer-motion";
import IconButton from "../../components/common/IconButton";
import { FaEye, FaCheckDouble } from "react-icons/fa";

const NotificationsPage = () => {
  const { notifications, loading, markAsRead, markAllAsRead } =
    useNotifications();

  const hasUnread = notifications.some((noti) => !noti.is_read);

  if (loading) {
    return (
      <div className="p-8">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="p-8">
      <motion.h1
        className="text-3xl font-bold mb-6 text-center"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Notificaciones
      </motion.h1>

      {hasUnread && (
        <motion.div
          className="mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          <IconButton
            variant="success"
            onClick={markAllAsRead}
            label="Marcar todas como leídas"
          >
            <FaCheckDouble />
          </IconButton>
        </motion.div>
      )}

      {notifications.length === 0 ? (
        <p className="text-center">No tienes notificaciones.</p>
      ) : (
        <div className="max-h-[500px] overflow-y-auto pr-2" >
          
          <ul className="space-y-4">
            {notifications.map((noti, index) => (
              <motion.li
                key={noti.id}
                className="border p-4 rounded bg-white flex justify-between items-center shadow"
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
                {!noti.is_read && (
                  <IconButton
                    variant="success"
                    onClick={() => markAsRead(noti.id)}
                    label="Marcar como leído"
                  >
                    <FaEye />
                  </IconButton>
                )}
              </motion.li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default NotificationsPage;
