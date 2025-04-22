import { create } from "zustand";
import {
  fetchRolesService,
  createRoleService,
  updateRoleService,
  deleteRoleService,
} from "../services/roleService.js";

/**
 * Zustand store for managing roles-related state.
 *
 * This store handles the list of roles, as well as actions for loading, adding, updating,
 * and deleting roles. It provides a loading state to track when data is being fetched or modified.
 *
 * @typedef {Object} RoleStore
 * @property {Array} roles - The list of all roles.
 * @property {Array} employeeRoles - The list of role names assigned to employees.
 * @property {boolean} loading - A boolean indicating if data is currently being loaded.
 * @property {Function} loadRoles - Loads all roles from the API and updates the store.
 * @property {Function} addOrupdateRoleService - Adds a new role or updates an existing one.
 * @property {Function} deleteRole - Deletes a role by its ID.
 */

/**
 * Creates and manages the role store.
 *
 * This store holds the list of roles and manages the state for adding, updating, deleting,
 * and loading roles. It provides an easy-to-use interface for managing roles in the application.
 *
 * @returns {RoleStore} The Zustand store for roles.
 */
const useRoleStore = create((set, get) => ({
  roles: [],
  employeeRoles: [],
  loading: false,

  /**
   * Loads the roles from the backend.
   *
   * This action fetches all roles and updates the store with the data. It sets the `loading`
   * state to `true` during the fetch request and `false` once it is complete.
   *
   * @async
   * @function
   * @returns {Promise<void>} A promise that resolves when the roles have been successfully loaded.
   * @throws {Error} If there is an error fetching the roles.
   */
  loadRoles: async () => {
    set({ loading: true });
    try {
      const roles = await fetchRolesService();
      set({ roles, employeeRoles: roles.map((role) => role.name) });
    } catch (error) {
      throw error;
    } finally {
      set({ loading: false });
    }
  },

  /**
   * Adds or updates a role.
   *
   * This action either adds a new role or updates an existing role. It will refresh the list of
   * roles in the store after the role is saved.
   *
   * @async
   * @function
   * @param {Object} roleData - The data of the role to add or update.
   * @param {Object} [selectedRole] - The role to update, if any.
   * @returns {Promise<void>} A promise that resolves when the role has been added or updated.
   * @throws {Error} If there is an error adding or updating the role.
   */
  addOrupdateRoleService: async (roleData, selectedRole) => {
    try {
      if (selectedRole) {
        await updateRoleService(selectedRole.id, roleData);
      } else {
        await createRoleService(roleData);
      }
      await get().loadRoles();
    } catch (error) {
      throw error;
    }
  },

  /**
   * Deletes a role by its ID.
   *
   * This action deletes a role from the backend and updates the list of roles in the store.
   *
   * @async
   * @function
   * @param {number|string} roleId - The ID of the role to delete.
   * @returns {Promise<void>} A promise that resolves when the role has been deleted.
   * @throws {Error} If there is an error deleting the role.
   */
  deleteRole: async (roleId) => {
    try {
      await deleteRoleService(roleId);
      await get().loadRoles();
    } catch (error) {
      throw error;
    }
  },
}));

export default useRoleStore;
