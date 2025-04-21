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
export const signupRequest = async (userData) => {
  const response = await axiosInstance.post("/auth/signup", userData);
  return response.data;
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
export const loginRequest = async (userData) => {
  const response = await axiosInstance.post("/auth/login", userData);
  return response.data;
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
export const getProfile = async () => {
  const response = await axiosInstance.get("/auth/profile");
  return response.data;
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
export const updateProfileRequest = async (profileData) => {
  const response = await axiosInstance.put("/auth/profile", profileData);
  return response.data;
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
export const updateProfilePicRequest = async (file) => {
  const formData = new FormData();
  formData.append("profilePic", file); // The backend expects "profilePic"
  const response = await axiosInstance.put("auth/profile/uploadPic", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
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
export const changePasswordRequest = async (passwordData) => {
  const response = await axiosInstance.put(
    "/auth/changePassword",
    passwordData
  );
  return response.data;
};

export const forgotPasswordService = async (email) => {
  try {
    const response = await axios.post("/forgot-password", { email });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Error al enviar el correo");
  }
};

export const resetPasswordService = async (token, password) => {
  try {
    const response = await axios.post(`/reset-password/${token}`, { password });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Error al restablecer la contraseña");
  }
};
