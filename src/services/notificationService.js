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
export const fetchNotifications = async () => {
  const response = await axiosInstance.get("/notifications");
  return response.data;
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
export const markNotificationAsReadRequest = async (notificationId) => {
  const response = await axiosInstance.put(`/notifications/read/${notificationId}`);
  return response.data;
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
export const markAllNotificationsAsReadRequest = async () => {
  const response = await axiosInstance.put("/notifications/read");
  return response.data;
};
