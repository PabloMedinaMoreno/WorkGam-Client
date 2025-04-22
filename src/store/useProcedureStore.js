import { create } from "zustand";
import {
  fetchProceduresService,
  fetchMyStartedProceduresService,
  fetchAllStartedProceduresService,
  createProcedureService,
  updateProcedureService,
  deleteProcedureService,
  startProcedureService,
  cancelStartedProcedureProcedure,
} from "../services/procedureService";

/**
 * Zustand store for managing procedures-related state.
 *
 * This store handles the procedures list, started procedures for the current user,
 * and includes actions for loading, adding, updating, starting, canceling, and deleting procedures.
 * It also manages the loading state to track the process of fetching data.
 *
 * @typedef {Object} ProcedureStore
 * @property {Array} procedures - The list of all procedures.
 * @property {Array} myStartedProcedures - The list of procedures that the current user has started.
 * @property {Array} allStartedProcedures - The list of all started procedures (used by admins).
 * @property {boolean} loading - A boolean indicating if data is being fetched.
 * @property {Function} loadProcedures - Loads all procedures from the API.
 * @property {Function} addOrupdateProcedureService - Adds a new procedure or updates an existing one.
 * @property {Function} deleteProcedureService - Deletes a procedure.
 * @property {Function} startProcedureService - Starts a procedure.
 * @property {Function} loadMyStartedProcedures - Loads all procedures started by the current user.
 * @property {Function} cancelProcedure - Cancels a started procedure.
 * @property {Function} loadAllStartedProcedures - Loads all started procedures (used by admins).
 */

/**
 * Creates and manages the procedure store.
 *
 * This store holds the list of procedures, started procedures for the current user,
 * and provides actions to load, add, update, delete, start, and cancel procedures.
 * It tracks the loading state to know if data is currently being fetched.
 *
 * @returns {ProcedureStore} The Zustand store for procedures.
 */
const useProcedureStore = create((set) => ({
  procedures: [],
  myStartedProcedures: [],
  allStartedProcedures: [],
  loading: false,

  /**
   * Loads all available procedures.
   *
   * This action fetches the list of all procedures and updates the store with the data.
   * It sets the loading state to true during the request and false when completed.
   *
   * @async
   * @function
   * @returns {Promise<void>} A promise that resolves when the procedures have been loaded.
   * @throws {Error} If there is an error fetching the procedures.
   */
  loadProcedures: async () => {
    set({ loading: true });
    try {
      const procedures = await fetchProceduresService();
      set({ procedures });
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Error fetching procedures"
      );
    } finally {
      set({ loading: false });
    }
  },

  /**
   * Adds or updates a procedure.
   *
   * This action adds a new procedure or updates an existing one based on whether a procedure is selected.
   * It updates the procedure list in the store.
   *
   * @async
   * @function
   * @param {Object} procedureData - The data for the procedure to add or update.
   * @param {Object} [selectedProcedure] - The procedure to update, if any.
   * @returns {Promise<void>} A promise that resolves when the procedure has been added or updated.
   * @throws {Error} If there is an error saving the procedure.
   */
  addOrupdateProcedureService: async (procedureData, selectedProcedure) => {
    try {
      if (selectedProcedure) {
        const updatedProcedure = await updateProcedureService(
          selectedProcedure.id,
          procedureData
        );
        set((state) => ({
          procedures: state.procedures.map((proc) =>
            proc.id === selectedProcedure.id ? updatedProcedure : proc
          ),
        }));
      } else {
        const newProcedure = await createProcedureService(procedureData);
        set((state) => ({ procedures: [...state.procedures, newProcedure] }));
      }
    } catch (error) {
      throw error;
    }
  },

  /**
   * Deletes a procedure.
   *
   * This action deletes a procedure by its ID and updates the procedure list in the store.
   *
   * @async
   * @function
   * @param {number|string} procedureId - The ID of the procedure to delete.
   * @returns {Promise<void>} A promise that resolves when the procedure has been deleted.
   * @throws {Error} If there is an error deleting the procedure.
   */
  deleteProcedureService: async (procedureId) => {
    try {
      await deleteProcedureService(procedureId);
      set((state) => ({
        procedures: state.procedures.filter((proc) => proc.id !== procedureId),
      }));
    } catch (error) {
      throw error;
    }
  },

  /**
   * Starts a procedure.
   *
   * This action sends a request to the backend to start the procedure and adds it to the list of started procedures.
   * It requires a socket ID for real-time notifications.
   *
   * @async
   * @function
   * @param {number|string} procedureId - The ID of the procedure to start.
   * @param {string} socketId - The socket ID for real-time notifications.
   * @returns {Promise<Object>} A promise that resolves to the started procedure.
   * @throws {Error} If there is an error starting the procedure.
   */
  startProcedureService: async (procedureId, socketId) => {
    try {
      const startedProcedure = await startProcedureService(procedureId, socketId);
      set((state) => ({
        myStartedProcedures: [...state.myStartedProcedures, startedProcedure],
      }));
      return startedProcedure;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Loads all started procedures for the current user.
   *
   * This action fetches the list of procedures that the current user has started and updates the store with the data.
   *
   * @async
   * @function
   * @returns {Promise<void>} A promise that resolves when the started procedures have been loaded.
   * @throws {Error} If there is an error fetching the user's started procedures.
   */
  loadMyStartedProcedures: async () => {
    set({ loading: true });
    try {
      const myStartedProcedures = await fetchMyStartedProceduresService();
      set({ myStartedProcedures });
    } catch (error) {
      throw error;
    } finally {
      set({ loading: false });
    }
  },

  /**
   * Cancels a started procedure.
   *
   * This action cancels a procedure that has already been started and updates the store accordingly.
   * It requires a socket ID for real-time notifications.
   *
   * @async
   * @function
   * @param {number|string} procedureId - The ID of the procedure to cancel.
   * @param {string} socketId - The socket ID for real-time notifications.
   * @returns {Promise<void>} A promise that resolves when the procedure has been canceled.
   * @throws {Error} If there is an error canceling the procedure.
   */
  cancelProcedure: async (procedureId, socketId) => {
    try {
      await cancelStartedProcedureProcedure(procedureId, socketId);
      set((state) => ({
        myStartedProcedures: state.myStartedProcedures.filter(
          (proc) => proc.id !== procedureId
        ),
      }));
    } catch (error) {
      throw error;
    }
  },

  /**
   * Loads all started procedures in the system (used by admin).
   *
   * This action fetches all procedures that have been started across the system, regardless of the user,
   * and updates the store with the data.
   *
   * @async
   * @function
   * @returns {Promise<void>} A promise that resolves when the started procedures have been loaded.
   * @throws {Error} If there is an error fetching all started procedures.
   */
  loadAllStartedProcedures: async () => {
    set({ loading: true });
    try {
      const allStartedProcedures = await fetchAllStartedProceduresService();
      set({ allStartedProcedures });
    } catch (error) {
      throw error;
    } finally {
      set({ loading: false });
    }
  },
}));

export default useProcedureStore;
