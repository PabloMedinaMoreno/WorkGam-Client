import axiosInstance from "./axios";

/**
 * Fetches the tasks for a procedure.
 *
 * Sends a GET request to the `/procedures/{procedureId}/tasks` endpoint to retrieve
 * the list of tasks associated with a given procedure. This is typically used
 * for both admin and client views.
 *
 * @async
 * @function
 * @param {number|string} procedureId - The ID of the procedure to fetch tasks for.
 * @returns {Promise<Array>} A promise that resolves to an array of tasks.
 */
export const fetchTasksService = async (procedureId) => {
  try {
    const response = await axiosInstance.get(
      `/procedures/${procedureId}/tasks`
    );
    return response.data.tasks;
  } catch (error) {
    throw new Error(
      error.response?.data?.message ||
        "Error al obtener las tareas del procedimiento"
    );
  }
};

/**
 * Adds a new task to a procedure.
 *
 * Sends a POST request to the `/procedures/{procedureId}/tasks` endpoint to create a new task
 * for the given procedure.
 *
 * @async
 * @function
 * @param {Object} taskData - The data for the new task.
 * @param {number|string} procedureId - The ID of the procedure to associate the task with.
 * @returns {Promise<Object>} A promise that resolves to the newly created task.
 */
export const createTaskService = async (taskData, procedureId) => {
  try {
    const response = await axiosInstance.post(
      `/procedures/${procedureId}/tasks`,
      taskData
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Error al crear la tarea");
  }
};

/**
 * Updates an existing task.
 *
 * Sends a PUT request to the `/tasks/{taskId}` endpoint to update an existing task with new data.
 *
 * @async
 * @function
 * @param {number|string} taskId - The ID of the task to update.
 * @param {Object} taskData - The updated data for the task.
 * @returns {Promise<Object>} A promise that resolves to the updated task.
 */
export const updateTaskService = async (taskId, taskData) => {
  try {
    const response = await axiosInstance.put(`/tasks/${taskId}`, taskData);
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Error al actualizar la tarea"
    );
  }
};

/**
 * Deletes a task.
 *
 * Sends a DELETE request to the `/tasks/{taskId}` endpoint to remove the specified task.
 *
 * @async
 * @function
 * @param {number|string} taskId - The ID of the task to delete.
 * @returns {Promise<void>} A promise that resolves when the task is deleted.
 */
export const deleteTaskService = async (taskId) => {
  try {
    await axiosInstance.delete(`/tasks/${taskId}`);
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Error al eliminar la tarea"
    );
  }
};

/**
 * Uploads a document for a task.
 *
 * Sends a POST request to the `/tasks/{startedProcedureId}/{taskId}/upload` endpoint with the
 * provided PDF file as form data for the given task.
 *
 * @async
 * @function
 * @param {number|string} startedProcedureId - The ID of the started procedure.
 * @param {number|string} taskId - The ID of the task to upload the document for.
 * @param {File} file - The PDF file to upload.
 * @returns {Promise<Object>} A promise that resolves with the server's response after uploading the document.
 */
export const uploadTaskDocumentService = async (
  startedProcedureId,
  taskId,
  file,
) => {
  try {
    const formData = new FormData();
    formData.append("document", file);
    const response = await axiosInstance.post(
      `/tasks/${startedProcedureId}/${taskId}/upload`,
      formData,
      { headers: { "Content-Type": "multipart/form-data" } }
    );
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error(
      error.response?.data?.message || "Error al subir el documento de la tarea"
    );
  }
};

/**
 * Fetches all tasks that have been started for a procedure.
 *
 * Sends a GET request to the `/procedures/started/{startedProcedureId}/tasks` endpoint to retrieve
 * all tasks that have been started for the given procedure.
 *
 * @async
 * @function
 * @param {number|string} startedProcedureId - The ID of the started procedure to fetch tasks for.
 * @returns {Promise<Array>} A promise that resolves to an array of started tasks.
 */
export const fetchAllStartedTasksService = async (startedProcedureId) => {
  try {
    const response = await axiosInstance.get(
      `/procedures/all-started/${startedProcedureId}/tasks`
    );
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Error al obtener las tareas iniciadas"
    );
  }
};

/**
 * Fetches all completed tasks for an employee.
 *
 * Sends a GET request to the `/tasks/completed` endpoint to retrieve all tasks that have been completed by the employee.
 *
 * @async
 * @function
 * @returns {Promise<Array>} A promise that resolves to an array of completed tasks.
 */
export const fetchMyCompletedTasksService = async () => {
  try {
    const response = await axiosInstance.get("/tasks/completed");
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Error al obtener las tareas completadas"
    );
  }
};

/**
 * Fetches all pending tasks for an employee.
 *
 * Sends a GET request to the `/tasks/pending` endpoint to retrieve all tasks that are still pending for the employee.
 *
 * @async
 * @function
 * @returns {Promise<Array>} A promise that resolves to an array of pending tasks.
 */
export const fetchMyPendingTasksService = async () => {
  try {
    const response = await axiosInstance.get("/tasks/pending");
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Error al obtener las tareas pendientes"
    );
  }
};

/**
 * Accepts a task by an employee.
 *
 * Sends a PUT request to the `/tasks/accept/{taskId}` endpoint to mark the task as accepted by the employee.
 * The `socketId` is sent for real-time notifications to the employee.
 *
 * @async
 * @function
 * @param {number|string} taskId - The ID of the task to accept.
 * @param {string} socketId - The socket ID for real-time notifications.
 * @returns {Promise<void>} A promise that resolves when the task is accepted.
 */
export const acceptTaskService = async (taskId, socketId) => {
  try {
    await axiosInstance.put(`/tasks/accept/${taskId}`, { socketId });
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Error al aceptar la tarea"
    );
  }
};

/**
 * Rejects a task by an employee with a reason.
 *
 * Sends a PUT request to the `/tasks/reject/{taskId}` endpoint to mark the task as rejected by the employee,
 * along with the reason for rejection. The `socketId` is sent for real-time notifications to the employee.
 *
 * @async
 * @function
 * @param {number|string} taskId - The ID of the task to reject.
 * @param {string} reason - The reason for rejecting the task.
 * @param {string} socketId - The socket ID for real-time notifications.
 * @returns {Promise<void>} A promise that resolves when the task is rejected.
 */
export const rejectTaskService = async (taskId, reason, socketId) => {
  try {
    await axiosInstance.put(`/tasks/reject/${taskId}`, { reason, socketId });
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Error al rechazar la tarea"
    );
  }
};


export const fetchClientStartedTasksService = async (startedProcedureId) => {
  try {
    const response = await axiosInstance.get(
      `/procedures/started/${startedProcedureId}/tasks`
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message ||
        "Error al obtener las tareas iniciadas del cliente"
    );
  }
}

export const fetchClientPendingTasksService = async (startedProcedureId) => {
  try {
    const response = await axiosInstance.get(
      `/procedures/started/${startedProcedureId}/tasks/pending`
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message ||
        "Error al obtener las tareas pendientes del cliente"
    );
  }
};