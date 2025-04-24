import { create } from "zustand";
import {
  fetchWorkersService,
  createWorkerService,
  updateWorkerService,
  deleteWorkerService,
} from "../services/workerService.js";

/**
 * Zustand store for managing workers-related state.
 *
 * This store holds the list of workers, and provides actions for loading, adding, updating, and deleting workers.
 * It also includes a loading state to track the process of fetching data or modifying the workers list.
 *
 * @typedef {Object} WorkerStore
 * @property {Array} workers - The list of all workers.
 * @property {boolean} loading - A boolean indicating if data is currently being loaded.
 * @property {Function} loadWorkers - Loads all workers from the API and updates the store.
 * @property {Function} addOrupdateWorkerService - Adds a new worker or updates an existing one.
 * @property {Function} deleteWorker - Deletes a worker by its ID.
 */

/**
 * Creates and manages the worker store.
 *
 * This store holds the list of workers and provides actions to load, add, update, and delete workers.
 * It also tracks the loading state during data fetching or updating.
 *
 * @returns {WorkerStore} The Zustand store for workers.
 */
const useWorkerStore = create((set, get) => ({
  workers: [],
  loading: false,

  /**
   * Loads all workers from the backend.
   *
   * This action fetches all workers and updates the store with the data. It sets the `loading`
   * state to `true` during the request and `false` when the data has been loaded.
   *
   * @async
   * @function
   * @returns {Promise<void>} A promise that resolves when the workers have been successfully loaded.
   * @throws {Error} If there is an error fetching the workers.
   */
  loadWorkers: async () => {
    set({ loading: true });
    try {
      const workers = await fetchWorkersService();
      set({ workers });
    } catch (error) {
      throw error;
    } finally {
      set({ loading: false });
    }
  },

  /**
   * Adds a new worker or updates an existing one.
   *
   * This action adds a new worker if no worker is selected, or updates the existing worker if
   * a `selectedWorker` is provided. It updates the list of workers in the store after saving.
   *
   * @async
   * @function
   * @param {Object} workerData - The data of the worker to add or update.
   * @param {Object} [selectedWorker] - The worker to update, if any.
   * @returns {Promise<void>} A promise that resolves when the worker has been added or updated.
   * @throws {Error} If there is an error adding or updating the worker.
   */
  addOrupdateWorkerService: async (workerData, selectedWorker) => {
    try {
      if (selectedWorker) {
        await updateWorkerService(selectedWorker.id, workerData);
      } else {
        await createWorkerService(workerData);
      }
    } catch (error) {
      throw error; 
    } finally {
      await get().loadWorkers(); // Refresh the workers list after adding/updating
    }
  },

  /**
   * Deletes a worker by its ID.
   *
   * This action deletes a worker from the backend by its ID and updates the store by removing
   * the deleted worker from the workers list.
   *
   * @async
   * @function
   * @param {number|string} workerId - The ID of the worker to delete.
   * @returns {Promise<void>} A promise that resolves when the worker has been deleted.
   * @throws {Error} If there is an error deleting the worker.
   */
  deleteWorker: async (workerId) => {
    try {
      await deleteWorkerService(workerId);
    } catch (error) {
      throw error;
    } finally {
      await get().loadWorkers(); // Refresh the workers list after deletion
    }
  },
}));

export default useWorkerStore;
