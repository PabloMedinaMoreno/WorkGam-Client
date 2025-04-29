import axiosInstance from "./axios.js";

/**
 * Fetches all notifications for the authenticated user.
 *
 * Sends a GET request to the `/notifications` endpoint to retrieve the list of notifications
 * for the currently authenticated user.
 *
 * @async
 * @function
 * @returns {Promise<Array>} A promise that resolves with an array of notifications.
 * Each notification in the array contains details such as the notification's message, status, and timestamps.
 */
export const fetchNotificationsService = async () => {
  try {
    const response = await axiosInstance.get("/notifications");
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Error obteniendo las notificaciones"
    );
  }
};

/**
 * Marks a specific notification as read.
 *
 * Sends a PUT request to the `/notifications/read/{notificationId}` endpoint to mark a specific
 * notification as read by its ID.
 *
 * @async
 * @function
 * @param {number|string} notificationId - The ID of the notification to mark as read.
 * @returns {Promise<Object>} A promise that resolves with the updated notification data.
 * The returned object contains the notification's details, including its new status.
 */
export const markNotificationAsReadService = async (notificationId) => {
  try {
    const response = await axiosInstance.put(
      `/notifications/read/${notificationId}`
    );
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Error marcando la notificación como leída"
    );
  }
};

/**
 * Marks all notifications for the authenticated user as read.
 *
 * Sends a PUT request to the `/notifications/read` endpoint to mark all notifications as read
 * for the currently authenticated user.
 *
 * @async
 * @function
 * @returns {Promise<Object>} A promise that resolves with the response from the API.
 * The response typically contains a success message or status confirming the update.
 */
export const markAllNotificationsAsReadService = async () => {
  try {
    const response = await axiosInstance.put("/notifications/read");
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Error marcando todas las notificaciones como leídas"
    );
  }
};

/**
 * Deletes a specific notification by its ID.
 *
 * Sends a DELETE request to the `/notifications/{notificationId}` endpoint to remove a specific
 * notification from the user's list of notifications.
 *
 * @async
 * @function
 * @param {number|string} notificationId - The ID of the notification to delete.
 * @returns {Promise<Object>} A promise that resolves with the response from the API.
 * The response typically contains a success message or status confirming the deletion.
 */
export const deleteNotificationService = async (notificationId) => {
  try {
    const response = await axiosInstance.delete(
      `/notifications/${notificationId}`
    );
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Error eliminando la notificación"
    );
  }
};

/**
 * Deletes all notifications for the authenticated user.
 *
 * Sends a DELETE request to the `/notifications` endpoint to remove all notifications
 * from the user's list of notifications.
 *
 * @async
 * @function
 * @returns {Promise<Object>} A promise that resolves with the response from the API.
 * The response typically contains a success message or status confirming the deletion.
 */
export const deleteAllNotificationsService = async () => {
  try {
    const response = await axiosInstance.delete("/notifications");
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Error eliminando todas las notificaciones"
    );
  }
};
