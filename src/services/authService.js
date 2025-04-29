import axiosInstance from "./axios";

/**
 * Registers a new user.
 *
 * Sends a POST request to the `/auth/signup` endpoint with the user's data
 * to create a new account.
 *
 * @async
 * @function
 * @param {Object} userData - An object containing the new user's data.
 * @param {string} userData.email - The email address of the new user.
 * @param {string} userData.password - The password for the new user.
 * @param {string} [userData.phone] - The optional phone number of the new user.
 * @param {string} userData.username - The username of the new user.
 * @param {string} userData.gender - The gender of the new user ('male' or 'female').
 * @returns {Promise<Object>} The registered user data from the API, including user information.
 */
export const signupService = async (userData) => {
  try {
    const response = await axiosInstance.post("/auth/signup", userData);
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Error al registrar el usuario"
    );
  }
};

/**
 * Logs in a user with the provided credentials.
 *
 * Sends a POST request to the `/auth/login` endpoint with the user's email and password
 * to authenticate the user and return a token.
 *
 * @async
 * @function
 * @param {Object} userData - An object containing the user's email and password.
 * @param {string} userData.email - The email address of the user.
 * @param {string} userData.password - The password for the user.
 * @returns {Promise<Object>} The logged-in user data from the API, including authentication token.
 */
export const loginService = async (userData) => {
  try {
    const response = await axiosInstance.post("/auth/login", userData);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Error al iniciar sesión");
  }
};
/**
 * Retrieves the authenticated user's profile.
 *
 * Sends a GET request to the `/auth/profile` endpoint to retrieve the user's profile information.
 *
 * @async
 * @function
 * @returns {Promise<Object>} The profile data of the user, including fields like username, email, and other profile details.
 */
export const profileService = async () => {
  try {
    const response = await axiosInstance.get("/auth/profile");
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Error al obtener el perfil"
    );
  }
};

/**
 * Updates the authenticated user's profile with the provided data.
 *
 * Sends a PUT request to the `/auth/profile` endpoint with the user's updated profile information.
 *
 * @async
 * @function
 * @param {Object} profileData - An object containing the updated profile fields.
 * @param {string} profileData.username - The updated username of the user.
 * @param {string} profileData.email - The updated email address of the user.
 * @param {string} [profileData.phone] - The updated phone number of the user (optional).
 * @returns {Promise<Object>} The updated user data from the API.
 */
export const updateProfileService = async (profileData) => {
  try {
    const response = await axiosInstance.put("/auth/profile", profileData);
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Error al actualizar el perfil"
    );
  }
};

/**
 * Updates the authenticated user's profile picture.
 *
 * Sends a PUT request to the `/auth/profile/uploadPic` endpoint with the user's new profile picture.
 * The image is sent as form data.
 *
 * @async
 * @function
 * @param {File} file - The new profile picture file to be uploaded.
 * @returns {Promise<Object>} The updated user data, including the new profile picture URL.
 */
export const updateProfilePicService = async (file) => {
  try {
    const formData = new FormData();
    formData.append("profilePic", file); // The backend expects "profilePic"
    const response = await axiosInstance.put(
      "auth/profile/uploadPic",
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Error al actualizar la foto de perfil"
    );
  }
};

/**
 * Changes the password of the authenticated user.
 *
 * Sends a PUT request to the `/auth/changePassword` endpoint with the user's old and new password data.
 *
 * @async
 * @function
 * @param {Object} passwordData - An object containing the old and new passwords.
 * @param {string} passwordData.oldPassword - The current password of the user.
 * @param {string} passwordData.newPassword - The new password the user wants to set.
 * @param {string} passwordData.confirmPassword - The confirmation of the new password.
 * @returns {Promise<Object>} The response data from the API, including a success message or error.
 */
export const changePasswordService = async (passwordData) => {
  try {
    const response = await axiosInstance.put(
      "/auth/changePassword",
      passwordData
    );
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Error al cambiar la contraseña"
    );
  }
};

/**
 * Sends a password reset email to the user.
 *
 * Sends a POST request to the `/auth/forgot-password` endpoint with the user's email address.
 *
 * @async
 * @function
 * @param {string} email - The email address of the user requesting a password reset.
 * @returns {Promise<Object>} The response data from the API, including a success message or error.
 */
export const forgotPasswordService = async (email) => {
  try {
    const response = await axiosInstance.post("/auth/forgot-password", {
      email,
    });
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Error al enviar el correo"
    );
  }
};

/**
 * Resets the password for the user using a token.
 *
 * Sends a POST request to the `/auth/reset-password/:token` endpoint with the new password.
 *
 * @async
 * @function
 * @param {string} token - The token received in the password reset email.
 * @param {string} password - The new password to set for the user.
 * @returns {Promise<Object>} The response data from the API, including a success message or error.
 */
export const resetPasswordService = async (token, password) => {
  try {
    const response = await axiosInstance.post(`/auth/reset-password/${token}`, {
      password,
    });
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Error al restablecer la contraseña"
    );
  }
};

/**
 * Logs out the authenticated user.
 *
 * Sends a POST request to the `/auth/logout` endpoint to log out the user.
 *
 * @async
 * @function
 * @returns {Promise<void>} A promise that resolves when the logout request is successful.
 */
export const logoutService = async () => {
  try {
    await axiosInstance.post("/auth/logout");
  } catch (error) {
    throw new Error(error.response?.data?.message || "Error al cerrar sesión");
  }
};
