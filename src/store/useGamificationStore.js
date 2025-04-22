import { create } from "zustand";
import {
  fetchWorkerStatsService,
  fetchGamificationLevelsService,
  fetchGamificationRankingService,
  fetchLevelProgressionService
} from "../services/gamificationService";

/**
 * Zustand store for managing gamification-related state.
 * 
 * This store is responsible for managing the gamification statistics, ranking, and levels for the user.
 * It provides actions to load personal stats, ranking, and levels, and stores these in the state.
 * 
 * @typedef {Object} GamificationStore
 * @property {Object|null} personalStats - The personal gamification statistics of the user.
 * @property {Array} ranking - The leaderboard ranking of the users.
 * @property {Array} levels - The available gamification levels.
 * @property {boolean} loading - A boolean indicating if data is being loaded.
 * @property {Function} loadGamificationPersonalStatistics - Loads the personal stats for the user.
 * @property {Function} loadGamificationRanking - Loads the ranking of users.
 * @property {Function} loadGamificationLevels - Loads the available gamification levels.
 */

/**
 * Creates and manages the gamification store.
 * 
 * This store holds the user's personal gamification stats, ranking, and levels. It also provides 
 * methods to load these values from an external API. The loading state helps track whether 
 * the store is currently fetching data.
 * 
 * @returns {GamificationStore} The Zustand store for gamification.
 */
const useGamificationStore = create((set) => ({
  levelProgression: null,
  ranking: [],
  levels: [],
  loading: true,

  /**
   * Loads the personal gamification statistics for a specific employee.
   * 
   * This action makes an API call to fetch the gamification stats for the given employee ID and
   * updates the store with the fetched data. It sets the loading state to true during the request
   * 
   * @async
   * @function
   * @param {string} employeeId - The ID of the employee whose stats are to be fetched.
   * @returns {Promise<void>} A promise that resolves when the data has been loaded.
   * @throws {Error} If there is an error fetching the stats.
   */
  getEmployeeGamificationStats: async (employeeId) => {
    set({ loading: true });
    try {
      const employeeStats = await fetchWorkerStatsService(employeeId);
      return employeeStats;
    } catch (error) {
      throw error;
    } finally {
      set({ loading: false });
    }
  },

  /**
   * Loads the gamification ranking.
   * 
   * This action makes an API call to fetch the ranking of users and updates the store with the 
   * fetched ranking data. It sets the loading state to true during the request and false when the 
   * request is complete.
   * 
   * @async
   * @function
   * @returns {Promise<void>} A promise that resolves when the ranking data has been loaded.
   * @throws {Error} If there is an error fetching the ranking.
   */
  loadGamificationRanking: async () => {
    set({ loading: true });
    try {
      const ranking = await fetchGamificationRankingService();
      set({ ranking });
    } catch (error) {
      throw error;
    } finally {
      set({ loading: false });
    }
  },

  /**
   * Loads the available gamification levels.
   * 
   * This action makes an API call to fetch the available gamification levels and updates the store 
   * with the fetched levels data. It sets the loading state to true during the request and false 
   * when the request is complete.
   * 
   * @async
   * @function
   * @returns {Promise<void>} A promise that resolves when the levels data has been loaded.
   * @throws {Error} If there is an error fetching the levels.
   */
  loadGamificationLevels: async () => {
    set({ loading: true });
    try {
      const levels = await fetchGamificationLevelsService();
      set({ levels });
    } catch (error) {
      throw error;
    } finally {
      set({ loading: false });
    }
  },

  loadLevelProgression: async () => {
    set({ loading: true });
    try {
      const levelProgression = await fetchLevelProgressionService();
      set({ levelProgression });
    } catch (error) {
      throw error;
    } finally {
      set({ loading: false });
    }
  },
}));

export default useGamificationStore;
