import axiosInstance from "./axios";

/**
 * Fetches the gamification stats for the current user.
 *
 * This function makes a GET request to the `/gamification/statistics` endpoint
 * to retrieve the user's gamification stats such as total XP, rank, etc.
 *
 * @async
 * @function
 * @returns {Promise<Object>} The gamification stats of the user.
 * The returned object will contain various gamification metrics.
 */
export const fetchWorkerStatsService = async (employeeId) => {
  try {
    const response = await axiosInstance.get(
      `/gamification/statistics/${employeeId}`
    );
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message ||
        "Error al obtener las estadísticas de gamificación"
    );
  }
};

/**
 * Fetches the available gamification levels.
 *
 * This function makes a GET request to the `/gamification/levels` endpoint
 * to retrieve a list of gamification levels (e.g., Bronze, Silver, Gold) and
 * their respective criteria for the user to progress through.
 *
 * @async
 * @function
 * @returns {Promise<Object[]>} A list of available gamification levels.
 * Each level contains details such as the level name, description, and required XP.
 */
export const fetchGamificationLevelsService = async () => {
  try {
    const response = await axiosInstance.get("/gamification/levels");
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message ||
        "Error al obtener los niveles de gamificación"
    );
  }
};

/**
 * Fetches the gamification ranking for users.
 *
 * This function makes a GET request to the `/gamification/ranking` endpoint
 * to retrieve the current ranking of users based on their gamification stats.
 *
 * @async
 * @function
 * @returns {Promise<Object[]>} A list of users and their respective gamification ranks.
 * Each object in the array contains user information such as username, rank, and XP.
 */
export const fetchGamificationRankingService = async () => {
  try {
    const response = await axiosInstance.get("/gamification/ranking");
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message ||
        "Error al obtener el ranking de gamificación"
    );
  }
};

/**
 * Fetches the level progression for the current user.
 *
 * This function makes a GET request to the `/gamification/level-progression` endpoint
 * to retrieve the user's current level and the XP required to reach the next level.
 *
 * @async
 * @function
 * @returns {Promise<Object>} The level progression of the user.
 */
export const fetchLevelProgressionService = async () => {
  try {
    const response = await axiosInstance.get("/gamification/level-progression");
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message ||
        "Error al obtener la progresión de niveles"
    );
  }
};
