import React, { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext";
import {
  fetchNotifications,
  markNotificationAsReadRequest,
  markAllNotificationsAsReadRequest,
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
      const notifications = await fetchNotifications();
      setNotifications(notifications);
      setUnreadCount(notifications.filter((n) => !n.is_read).length);
    } catch (error) {
      console.error("Error fetching notifications:", error);
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (notificationId) => {
    try {
      await markNotificationAsReadRequest(notificationId);
      setNotifications((prev) =>
        prev.map((n) => (n.id === notificationId ? { ...n, is_read: true } : n))
      );
      setUnreadCount((prev) => prev - 1);
    } catch (error) {
      console.error("Error marking notification as read:", error);
    }
  };

  const markAllAsRead = async () => {
    try {
      await markAllNotificationsAsReadRequest();
      setNotifications((prev) => prev.map((n) => ({ ...n, is_read: true })));
      setUnreadCount(0);
    } catch (error) {
      console.error("Error marking all notifications as read:", error);
    }
  };

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
