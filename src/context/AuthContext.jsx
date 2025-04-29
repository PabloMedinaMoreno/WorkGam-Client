import React, { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
import API from "../services/axios.js";             
import {
  signupService,
  loginService,
  profileService,
  updateProfileService,
  updateProfilePicService,
  logoutService,
} from "../services/authService.js";

/**
 * Context for managing authentication and user-related state.
 *
 * This context provides functions for signing up, logging in, logging out, updating the profile,
 * and managing the WebSocket connection for real-time communication.
 * It also provides the current user, authentication status, and loading state to any component
 * that needs to access this information.
 *
 * @typedef {Object} AuthContextType
 * @property {Object|null} user - The currently authenticated user or null if not authenticated.
 * @property {boolean} isAuthenticated - Whether the user is authenticated.
 * @property {boolean} loading - Whether the authentication status is still being loaded.
 * @property {Object|null} socket - The WebSocket instance for real-time notifications.
 * @property {Function} signup - Function to handle user signup.
 * @property {Function} login - Function to handle user login.
 * @property {Function} logout - Function to handle user logout.
 * @property {Function} updateProfile - Function to update the authenticated user's profile.
 * @property {Function} updateProfilePic - Function to update the authenticated user's profile picture.
 */

/**
 * Creates and manages the authentication context.
 *
 * This context holds and manages the authentication status, user data, and WebSocket connection.
 * It provides actions to handle login, signup, logout, profile updates, and profile picture updates.
 * It also tracks the authentication state and handles WebSocket connections for real-time notifications.
 *
 * @returns {AuthContextType} The AuthContext provider and state.
 */
const AuthContext = createContext();

/**
 * Custom hook to access the authentication context.
 *
 * @returns {AuthContextType} The current authentication context value.
 * @throws {Error} If the hook is used outside of the AuthProvider.
 */
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};

/**
 * The AuthProvider component provides authentication state and actions to its children.
 *
 * This provider manages the user session, including login, signup, logout, and profile updates.
 * It also manages the WebSocket connection for real-time notifications and other related tasks.
 *
 * @param {Object} children - The child components to wrap in the provider.
 * @returns {JSX.Element} The AuthProvider component wrapping its children.
 */
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [socket, setSocket] = useState(null);

   // Initialize auth from stored token
   useEffect(() => {
    const token = localStorage.getItem("token");
    console.log("Token from localStorage:", token);
    if (token) {
      API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, []);

  /** @param {Object} data */
  const signup = async (data) => {
    setLoading(true);
    try {
      const { user: u, token } = await signupService(data);
      localStorage.setItem("token", token);
      console.log("Token from signup:", token);
      API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      setUser(u);
      setIsAuthenticated(true);
    } finally {
      setLoading(false);
    }
  };

  /** @param {{ email: string, password: string }} creds */
  const login = async (creds) => {
    setLoading(true);
    try {
      const { user: u, token } = await loginService(creds);
      localStorage.setItem("token", token);
      console.log("Token from login:", token);
      API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      setUser(u);
      setIsAuthenticated(true);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    await logoutService();
    localStorage.removeItem("token");
    console.log("Token removed from localStorage");
    delete API.defaults.headers.common["Authorization"];
    setUser(null);
    setIsAuthenticated(false);
    setLoading(false);
    if (socket) {
      socket.disconnect();
      setSocket(null);
    }
  };

  /** @param {Object} profileData */
  const updateProfile = async (profileData) => {
    setLoading(true);
    try {
      const u = await updateProfileService(profileData);
      setUser(u);
    } finally {
      setLoading(false);
    }
  };

  /** @param {File} file */
  const updateProfilePic = async (file) => {
    setLoading(true);
    try {
      const u = await updateProfilePicService(file);
      setUser(u);
    } finally {
      setLoading(false);
    }
  };

  // Fetch current profile after login state
  useEffect(() => {
    const loadProfile = async () => {
      setLoading(true);
      try {
        const u = await profileService();
        setUser(u);
        setIsAuthenticated(true);
      } catch {
        setUser(null);
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };
    if (isAuthenticated) loadProfile();
  }, [isAuthenticated]);

  useEffect(() => {
    if (isAuthenticated) {
      const socketInstance = io(import.meta.env.VITE_BACKEND_URL, {
        withCredentials: true,
      });

      setSocket(socketInstance);

      return () => {
        if (socketInstance) socketInstance.disconnect();
      };
    } else {
      if (socket) {
        socket.disconnect();
        setSocket(null);
      }
    }
  }, [isAuthenticated]);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        loading,
        socket,
        signup,
        login,
        logout,
        updateProfile,
        updateProfilePic,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
