import axiosInstance from "./axios";

/**
 * Fetches all workers.
 * 
 * Sends a GET request to the `/workers` endpoint to retrieve a list of all workers.
 * 
 * @async
 * @function
 * @returns {Promise<Object[]>} A promise that resolves to an array of worker objects.
 * Each worker object contains details such as their ID, name, role, and other relevant information.
 */
export const fetchWorkers = async () => {
  const response = await axiosInstance.get("/workers");
  return response.data;
};

/**
 * Adds a new worker.
 * 
 * Sends a POST request to the `/workers` endpoint to create a new worker with the provided data.
 * 
 * @async
 * @function
 * @param {Object} workerData - The data for the new worker.
 * @param {string} workerData.username - The username of the worker.
 * @param {string} workerData.email - The email of the worker.
 * @param {string} workerData.role - The role assigned to the worker.
 * @param {string} workerData.password - The password for the worker.
 * @returns {Promise<Object>} A promise that resolves to the data of the newly created worker.
 */
export const addWorker = async (workerData) => {
  const response = await axiosInstance.post("/workers", workerData);
  return response.data;
};

/**
 * Updates an existing worker.
 * 
 * Sends a PUT request to the `/workers/{workerId}` endpoint to update the data of an existing worker.
 * 
 * @async
 * @function
 * @param {number|string} workerId - The ID of the worker to update.
 * @param {Object} workerData - The updated data for the worker.
 * @param {string} workerData.username - The updated username of the worker.
 * @param {string} workerData.email - The updated email of the worker.
 * @param {string} workerData.role - The updated role of the worker.
 * @returns {Promise<Object>} A promise that resolves to the updated worker's data.
 */
export const updateWorker = async (workerId, workerData) => {
  const response = await axiosInstance.put(
    `/workers/${workerId}`,
    workerData
  );
  return response.data;
};

/**
 * Deletes a worker.
 * 
 * Sends a DELETE request to the `/workers/{workerId}` endpoint to delete the specified worker.
 * 
 * @async
 * @function
 * @param {number|string} workerId - The ID of the worker to delete.
 * @returns {Promise<Object>} A promise that resolves to the response data from the API, typically confirming the deletion.
 */
export const deleteWorkerRequest = async (workerId) => {
  const response = await axiosInstance.delete(`/workers/${workerId}`);
  return response.data;
};
