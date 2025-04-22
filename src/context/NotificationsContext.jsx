import React, { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext";
import {
  fetchNotificationsService,
  markNotificationAsReadService,
  markAllNotificationsAsReadService,
  deleteNotificationService,
  deleteAllNotificationsService,
} from "../services/notificationService.js";

const NotificationsContext = createContext();

/**
 * Custom hook to access the notifications context.
 *
 * @returns {Object} The current notifications context value.
 * @throws {Error} If the hook is used outside of a NotificationsProvider.
 */
export const useNotifications = () => {
  const context = useContext(NotificationsContext);
  if (!context)
    throw new Error(
      "useNotifications must be used within a NotificationsProvider"
    );
  return context;
};

/**
 * The NotificationsProvider component provides notifications state and actions to its children.
 *
 * This provider handles loading notifications, marking them as read, and managing real-time updates
 * via WebSocket, including level-up notifications.
 *
 * @param {Object} children - The child components to wrap in the provider.
 * @returns {JSX.Element} The NotificationsProvider component wrapping its children.
 */
export const NotificationsProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [newLevel, setNewLevel] = useState(null);
  const [newProgress, setNewProgress] = useState(null);
  const [loading, setLoading] = useState(true);
  const { isAuthenticated, socket } = useAuth();

  const loadNotifications = async () => {
    if (!isAuthenticated) return;
    setLoading(true);
    try {
      const notifications = await fetchNotificationsService();
      setNotifications(notifications);
      setUnreadCount(notifications.filter((n) => !n.is_read).length);
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (notificationId) => {
    try {
      await markNotificationAsReadService(notificationId);
      setNotifications((prev) =>
        prev.map((n) => (n.id === notificationId ? { ...n, is_read: true } : n))
      );
      setUnreadCount((prev) => prev - 1);
    } catch (error) {
      throw error;
    }
  };

  const markAllAsRead = async () => {
    try {
      await markAllNotificationsAsReadService();
      setNotifications((prev) => prev.map((n) => ({ ...n, is_read: true })));
      setUnreadCount(0);
    } catch (error) {
      throw error;
    }
  };

  const deleteNotification = async (notificationId) => {
    try {
      await deleteNotificationService(notificationId);
      setNotifications((prev) =>
        prev.filter((n) => n.id !== notificationId)
      );
      if (notifications.find((n) => n.id === notificationId)?.is_read) {
        setUnreadCount((prev) => prev - 1);
      }
    } catch (error) {
      throw error;
    }
  };

  const deleteAllNotifications = async () => {
    try {
      await deleteAllNotificationsService();
      setNotifications([]);
      setUnreadCount(0);
    } catch (error) {
      throw error;
    }
  }

  const handleLevelUp = (levelData) => {
    setNewLevel(levelData);
    console.log("Level Up Notification:", levelData);
  };

  const clearLevelUp = () => {
    setNewLevel(null);
  };

  const handleProgressNotification = (progressData) => {
    setNewProgress(progressData);
    console.log("Progress Notification:", progressData);
  };

  const clearProgressNotification = () => {
    setNewProgress(null);
  };

  useEffect(() => {
    if (isAuthenticated && socket) {
      socket.on("new_notification", (notification) => {
        setNotifications((prev) => [notification, ...prev]);
        setUnreadCount((prev) => prev + 1);
      });
      socket.on("level_up_notification", handleLevelUp);

      socket.on("progress_notification", handleProgressNotification);

      return () => {
        socket.off("new_notification");
        socket.off("level_up");
        socket.off("progress_notification");
      };
    }
  }, [isAuthenticated, socket]);

  useEffect(() => {
    if (isAuthenticated) {
      loadNotifications();
    }
  }, [isAuthenticated]);

  return (
    <NotificationsContext.Provider
      value={{
        notifications,
        unreadCount,
        newLevel,
        newProgress,
        loading,
        markAsRead,
        markAllAsRead,
        deleteNotification,
        deleteAllNotifications,
        loadNotifications,
        clearLevelUp,
        clearProgressNotification,
      }}
    >
      {children}
    </NotificationsContext.Provider>
  );
};

export default NotificationsContext;
