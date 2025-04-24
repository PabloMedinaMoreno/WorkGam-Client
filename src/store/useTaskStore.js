import { create } from "zustand";
import { toast } from "react-hot-toast";
import {
  fetchTasksService,
  createTaskService,
  updateTaskService,
  deleteTaskService,
  uploadTaskDocumentService,
  fetchAllStartedTasksService,
  fetchMyCompletedTasksService,
  fetchMyPendingTasksService,
  acceptTaskService,
  rejectTaskService,
} from "../services/taskService";

/**
 * Zustand store for managing task-related state.
 *
 * This store holds and manages the list of tasks, both for the current user and the ones that are
 * globally started, completed, or pending. It provides actions to load tasks, add or update them,
 * delete tasks, accept or reject them, and handle file uploads.
 *
 * @typedef {Object} TaskStore
 * @property {Array} tasks - The list of tasks for the procedure.
 * @property {Array} allStartedTasks - The list of all started tasks (used by admin).
 * @property {Array} completedTasks - The list of completed tasks.
 * @property {Array} pendingTasks - The list of tasks pending for the current user.
 * @property {boolean} loading - A boolean indicating if tasks are being loaded.
 * @property {Object} pendingUploads - A mapping of tasks that have selected files pending to be uploaded.
 * @property {Function} loadTasks - Loads tasks for a specific procedure.
 * @property {Function} addOrupdateTaskService - Adds a new task or updates an existing task.
 * @property {Function} deleteTaskService - Deletes a task.
 * @property {Function} handleFileSelect - Handles the file selection for a task.
 * @property {Function} handleConfirmUploads - Confirms the file uploads for tasks.
 * @property {Function} loadAllStartedTasks - Loads all tasks that have been started for a specific procedure.
 * @property {Function} loadMyCompletedTasks - Loads the completed tasks for the current user.
 * @property {Function} loadMyPendingTasks - Loads the pending tasks for the current user.
 * @property {Function} acceptTaskService - Accepts a task by its ID.
 * @property {Function} rejectTaskService - Rejects a task by its ID with a reason.
 */

/**
 * Creates and manages the task store.
 *
 * This store holds the tasks for the procedure, as well as actions to load, add, update, delete,
 * accept, reject, and handle file uploads for tasks.
 *
 * @returns {TaskStore} The Zustand store for tasks.
 */
const useTaskStore = create((set, get) => ({
  tasks: [],
  allStartedTasks: [],
  completedTasks: [],
  pendingTasks: [],
  loading: false,
  pendingUploads: {},

  /**
   * Loads the tasks for a specific procedure.
   *
   * This action fetches tasks for the procedure identified by the `procedureId` and updates the
   * store with the fetched tasks. The `loading` state is set to `true` during the request and `false`
   * when the request is complete.
   *
   * @async
   * @function
   * @param {number|string} procedureId - The ID of the procedure for which tasks should be loaded.
   * @returns {Promise<void>} A promise that resolves when tasks are loaded.
   * @throws {Error} If there is an error fetching the tasks.
   */
  loadTasks: async (procedureId) => {
    set({ loading: true });
    try {
      const tasks = await fetchTasksService(procedureId);
      set({ tasks });
    } catch (error) {
      throw error;
    } finally {
      set({ loading: false });
    }
  },

  /**
   * Adds or updates a task.
   *
   * This action adds a new task or updates an existing one based on whether a `selectedTask` is provided.
   * After adding or updating the task, the tasks list in the store is updated accordingly.
   *
   * @async
   * @function
   * @param {Object} selectedTask - The task to update, if any.
   * @param {Object} taskData - The data of the task to add or update.
   * @param {number|string} procedureId - The ID of the procedure to which the task belongs.
   * @returns {Promise<void>} A promise that resolves when the task is added or updated.
   * @throws {Error} If there is an error saving the task.
   */
  addOrupdateTaskService: async (selectedTask, taskData, procedureId) => {
    try {
      if (selectedTask) {
        await updateTaskService(
          selectedTask.id,
          taskData,
          procedureId
        );
      } else {
        await createTaskService(taskData, procedureId);
      }
    } catch (error) {
      throw error;
    } finally {
      await get().loadTasks(procedureId); // Refresh the tasks after adding/updating
    }
  },

  /**
   * Deletes a task by its ID.
   *
   * This action deletes a task from the backend and updates the store by removing the deleted task
   * from the list of tasks.
   *
   * @async
   * @function
   * @param {number|string} taskId - The ID of the task to delete.
   * @returns {Promise<void>} A promise that resolves when the task is deleted.
   * @throws {Error} If there is an error deleting the task.
   */
  deleteTaskService: async (taskId) => {
    try {
      await deleteTaskService(taskId);
      set((state) => ({
        tasks: state.tasks.filter((task) => task.id !== taskId),
      }));
    } catch (error) {
      throw error;
    }
  },

  /**
   * Handles the file selection for a task.
   *
   * This action stores the selected file in the `pendingUploads` state, associated with the task ID.
   * It also shows a success message indicating the file selection.
   *
   * @function
   * @param {number|string} taskId - The ID of the task for which the file is selected.
   * @param {File} file - The selected file to be uploaded.
   * @param {string} taskName - The name of the task for which the file is selected.
   */
  handleFileSelect: (taskId, file, taskName) => {
    const { setTaskFile } = get();
    setTaskFile(taskId, file);
    toast.success(`Archivo seleccionado para la tarea ${taskName}`);
  },

  setTaskFile: (taskId, file) => {
    set((state) => {
      const updatedTasks = state.tasks.map((task) =>
        task.id === taskId ? { ...task, uploadedFile: file } : task
      );
  
      const updatedPendingUploads = file
        ? { ...state.pendingUploads, [taskId]: file }
        : Object.fromEntries(
            Object.entries(state.pendingUploads).filter(([key]) => +key !== +taskId)
          );
  
      return {
        tasks: updatedTasks,
        pendingUploads: updatedPendingUploads,
      };
    });
  },
  

  /**
   * Confirms and uploads the files for the tasks.
   *
   * This action uploads the files associated with each task from the `pendingUploads` state. It checks
   * if files are selected, uploads them, and displays success or error messages accordingly.
   *
   * @async
   * @function
   * @param {number|string} startedProcedureId - The ID of the started procedure to which the tasks belong.
   * @returns {Promise<void>} A promise that resolves when the uploads are confirmed and completed.
   * @throws {Error} If there is an error uploading any file.
   */
  handleConfirmUploads: async (startedProcedureId) => {
    const { pendingUploads } = get();
    const entries = Object.entries(pendingUploads);
    if (entries.length === 0) {
      toast.error("No se ha seleccionado ningún archivo para subir.");
      return;
    }
    let errorOccurred = false;
    for (const [taskId, file] of entries) {
      try {
        await uploadTaskDocumentService(startedProcedureId, taskId, file);
      } catch (error) {
        const errorMessage =
          error.response?.data?.message || "Error uploading file";
        toast.error(errorMessage);
        errorOccurred = true;
      }
    }
    set({ pendingUploads: {} });
    if (!errorOccurred) {
      toast.success("Subidas confirmadas");
    }
  },

  /**
   * Loads all started tasks for a specific procedure.
   *
   * This action fetches all the tasks that have been started for a particular procedure.
   *
   * @async
   * @function
   * @param {number|string} startedProcedureId - The ID of the started procedure.
   * @returns {Promise<void>} A promise that resolves when the started tasks are loaded.
   * @throws {Error} If there is an error fetching the started tasks.
   */
  loadAllStartedTasks: async (startedProcedureId) => {
    set({ loading: true });
    try {
      const allStartedTasks = await fetchAllStartedTasksService(startedProcedureId);
      console.log("All started tasks:", allStartedTasks);
      set({ allStartedTasks });
    } catch (error) {
      throw error;
    } finally {
      set({ loading: false });
    }
  },

  /**
   * Loads the completed tasks for the current user.
   *
   * This action fetches all tasks that are completed for the current user.
   *
   * @async
   * @function
   * @returns {Promise<void>} A promise that resolves when the completed tasks are loaded.
   * @throws {Error} If there is an error fetching the completed tasks.
   */
  loadMyCompletedTasks: async () => {
    set({ loading: true });
    try {
      const completedTasks = await fetchMyCompletedTasksService();
      set({ completedTasks });
    } catch (error) {
      throw error;
    } finally {
      set({ loading: false });
    }
  },

  /**
   * Loads the pending tasks for the current user.
   *
   * This action fetches all tasks that are pending for the current user.
   *
   * @async
   * @function
   * @returns {Promise<void>} A promise that resolves when the pending tasks are loaded.
   * @throws {Error} If there is an error fetching the pending tasks.
   */
  loadMyPendingTasks: async () => {
    set({ loading: true });
    try {
      const pendingTasks = await fetchMyPendingTasksService();
      set({ pendingTasks });
    } catch (error) {
      throw error;
    } finally {
      set({ loading: false });
    }
  },

  /**
   * Accepts a task by its ID.
   *
   * This action accepts a pending task by its ID and removes it from the list of pending tasks in the store.
   * It also requires the `socketId` for real-time notifications.
   *
   * @async
   * @function
   * @param {number|string} taskId - The ID of the task to accept.
   * @param {string} socketId - The socket ID for real-time notifications.
   * @returns {Promise<void>} A promise that resolves when the task is accepted.
   * @throws {Error} If there is an error accepting the task.
   */
  acceptTaskService: async (taskId, socketId) => {
    try {
      await acceptTaskService(taskId, socketId);
      set((state) => ({
        pendingTasks: state.pendingTasks.filter(
          (task) => task.started_task_id !== taskId
        ),
      }));
    } catch (error) {
      throw error;
    }
  },

  /**
   * Rejects a task by its ID with a reason.
   *
   * This action rejects a pending task by its ID, removing it from the list of pending tasks in the store.
   * It also requires the rejection `reason` and `socketId` for real-time notifications.
   *
   * @async
   * @function
   * @param {number|string} taskId - The ID of the task to reject.
   * @param {string} reason - The reason for rejecting the task.
   * @param {string} socketId - The socket ID for real-time notifications.
   * @returns {Promise<void>} A promise that resolves when the task is rejected.
   * @throws {Error} If there is an error rejecting the task.
   */
  rejectTaskService: async (taskId, reason, socketId) => {
    try {
      await rejectTaskService(taskId, reason, socketId);
      set((state) => ({
        pendingTasks: state.pendingTasks.filter(
          (task) => task.started_task_id !== taskId
        ),
      }));
    } catch (error) {
      throw error;
    }
  },
}));

export default useTaskStore;
