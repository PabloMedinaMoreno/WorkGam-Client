import axios from "axios";

/**
 * Axios instance for making API requests.
 * Configured with base URL and credentials.
 */
const axiosInstance = axios.create({
  baseURL: `${import.meta.env.VITE_BACKEND_URL}/api`,
  withCredentials: true,
});

export default axiosInstance;
