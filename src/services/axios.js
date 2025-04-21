import axios from "axios";

/**
 * Axios instance for making API requests.
 * Configured with base URL and credentials.
 */
const axiosInstance = axios.create({
  baseURL: "/api",
  withCredentials: true,
});

export default axiosInstance;