import axiosInstance from "./axios.js";

/**
 * Fetches all roles available in the system.
 *
 * This function sends a GET request to the ` /roles` endpoint to retrieve the list of roles.
 *
 * @async
 * @function
 * @returns {Promise<Object[]>} A promise that resolves to an array of roles. Each role object contains details such as the role name, description, and ID.
 */
export const fetchRolesService = async () => {
  try {
    const response = await axiosInstance.get("/roles");
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Error al obtener los roles"
    );
  }
};

/**
 * Adds a new role to the system.
 *
 * This function sends a POST request to the ` /roles` endpoint with the role data to create a new role.
 *
 * @async
 * @function
 * @param {Object} roleData - The data of the role to add.
 * @param {string} roleData.name - The name of the role.
 * @param {string} roleData.description - A description of the role.
 * @returns {Promise<Object>} A promise that resolves to the created role object, including its ID and details.
 */
export const createRoleService = async (roleData) => {
  try {
    const response = await axiosInstance.post("/roles", roleData);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Error al crear el rol");
  }
};

/**
 * Updates an existing role in the system.
 *
 * This function sends a PUT request to the ` /roles/{roleId}` endpoint with the updated role data.
 *
 * @async
 * @function
 * @param {number|string} roleId - The ID of the role to update.
 * @param {Object} roleData - The new data for the role.
 * @param {string} roleData.name - The updated name of the role.
 * @param {string} roleData.description - The updated description of the role.
 * @returns {Promise<Object>} A promise that resolves to the updated role object.
 */
export const updateRoleService = async (roleId, roleData) => {
  try {
    const response = await axiosInstance.put(`/roles/${roleId}`, roleData);
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Error al actualizar el rol"
    );
  }
};

/**
 * Deletes a role from the system.
 *
 * This function sends a DELETE request to the ` /roles/{roleId}` endpoint to remove the specified role.
 *
 * @async
 * @function
 * @param {number|string} roleId - The ID of the role to delete.
 * @returns {Promise<Object>} A promise that resolves to the response data from the API, usually confirming the deletion.
 */
export const deleteRoleService = async (roleId) => {
  try {
    console.log(roleId);
    await axiosInstance.delete(`/roles/${roleId}`);
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Error al eliminar el rol"
    ); 
  }
};
