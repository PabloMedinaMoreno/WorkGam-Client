import axiosInstance from "./axios.js";

/**
 * Fetches all available procedures.
 *
 * Sends a GET request to the `/procedures` endpoint to retrieve a list of all available procedures.
 *
 * @async
 * @function
 * @returns {Promise<Object>} The API response containing the list of procedures.
 */
export const fetchProceduresService = async () => {
  try {
    const response = await axiosInstance.get("/procedures");
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Error al obtener los procedimientos"
    );
  }
};

/**
 * Fetches the procedures started by the authenticated user.
 *
 * Sends a GET request to the `/procedures/started` endpoint to retrieve a list of procedures
 * that have been started by the authenticated user.
 *
 * @async
 * @function
 * @returns {Promise<Object>} The API response containing the list of procedures started by the user.
 */
export const fetchMyStartedProceduresService = async () => {
  try {
    const response = await axiosInstance.get("/procedures/started");
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message ||
        "Error al obtener los procedimientos iniciados"
    );
  }
};

/**
 * Fetches all started procedures.
 *
 * This function is used in the admin panel to retrieve a list of all started procedures.
 * Sends a GET request to the `/procedures/all-started` endpoint.
 *
 * @async
 * @function
 * @returns {Promise<Object>} The API response containing the list of all started procedures.
 */
export const fetchAllStartedProceduresService = async () => {
  try {
    const response = await axiosInstance.get("/procedures/all-started");
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message ||
        "Error al obtener los procedimientos iniciados"
    );
  }
};

/**
 * Adds a new procedure.
 *
 * Sends a POST request to the `/procedures` endpoint with the provided procedure data.
 *
 * @async
 * @function
 * @param {Object} procedureData - The data for the new procedure to be created.
 * @param {string} procedureData.name - The name of the procedure.
 * @param {string} procedureData.description - The description of the procedure.
 * @returns {Promise<Object>} The API response containing the created procedure data.
 */
export const createProcedureService = async (procedureData) => {
  try {
    const response = await axiosInstance.post("/procedures", procedureData);
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Error al crear el procedimiento"
    );
  }
};

/**
 * Updates an existing procedure.
 *
 * Sends a PUT request to the `/procedures/{procedureId}` endpoint with the updated procedure data.
 *
 * @async
 * @function
 * @param {number|string} procedureId - The ID of the procedure to update.
 * @param {Object} procedureData - The new data for the procedure.
 * @param {string} procedureData.name - The updated name of the procedure.
 * @param {string} procedureData.description - The updated description of the procedure.
 * @returns {Promise<Object>} The API response containing the updated procedure data.
 */
export const updateProcedureService = async (procedureId, procedureData) => {
  try {
    const response = await axiosInstance.put(
      `/procedures/${procedureId}`,
      procedureData
    );
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Error al actualizar el procedimiento"
    );
  }
};

/**
 * Deletes a procedure.
 *
 * Sends a DELETE request to the `/procedures/{procedureId}` endpoint to delete the specified procedure.
 *
 * @async
 * @function
 * @param {number|string} procedureId - The ID of the procedure to delete.
 * @returns {Promise<void>} This function does not return any data upon success.
 */
export const deleteProcedureService = async (procedureId) => {
  try {
    await axiosInstance.delete(`/procedures/${procedureId}`);
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Error al eliminar el procedimiento"
    );
  }
};

/**
 * Starts a procedure.
 *
 * Sends a POST request to the `/procedures/{procedureId}/start` endpoint to start the specified procedure.
 * The `socketId` is sent to enable real-time notifications for the client.
 *
 * @async
 * @function
 * @param {number|string} procedureId - The ID of the procedure to start.
 * @param {string} socketId - The socket ID for real-time notifications to the client.
 * @returns {Promise<Object>} The API response containing the started procedure data.
 */
export const startProcedureService = async (procedureId, socketId) => {
  try {
    const response = await axiosInstance.post(
      `/procedures/${procedureId}/start`,
      { socketId }
    );
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Error al iniciar el procedimiento"
    );
  }
};

/**
 * Cancels a started procedure.
 *
 * Sends a PUT request to the `/procedures/{procedureId}/cancel` endpoint to cancel a started procedure.
 * The `socketId` is sent for real-time notifications to inform the client.
 *
 * @async
 * @function
 * @param {number|string} procedureId - The ID of the procedure to cancel.
 * @param {string} socketId - The socket ID for real-time notifications to the client.
 * @returns {Promise<void>} This function does not return any data upon success.
 */
export const cancelStartedProcedureProcedure = async (
  procedureId,
  socketId
) => {
  try {
    await axiosInstance.put(`/procedures/${procedureId}/cancel`, { socketId });
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Error al cancelar el procedimiento"
    );
  }
};
