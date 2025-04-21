import React, { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { io } from "socket.io-client";
import {
  signupRequest,
  loginRequest,
  getProfile,
  updateProfileRequest,
  updateProfilePicRequest,
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

  console.log(user)

  const signup = async (userData) => {
    try {
      const user = await signupRequest(userData);
      setUser(user);
      setIsAuthenticated(true);
    } catch (error) {
      throw new Error(error.response?.data?.message || "Error en el registro");
    } finally {
      setLoading(false);
    }
  };

  const login = async (userData) => {
    try {
      const user = await loginRequest(userData);
      setUser(user);
      setIsAuthenticated(true);
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Error en el inicio de sesión"
      );
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    Cookies.remove("token");
    setUser(null);
    setIsAuthenticated(false);
    setLoading(false);
    if (socket) socket.disconnect(); // Disconnect WebSocket when logging out
  };

  const updateProfile = async (profileData) => {
    try {
      const user = await updateProfileRequest(profileData);
      setUser(user);
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Error al actualizar el perfil"
      );
    } finally {
      setLoading(false);
    }
  };

  const updateProfilePic = async (file) => {
    try {
      const user = await updateProfilePicRequest(file);
      setUser(user);
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Error al actualizar la foto de perfil"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const checkLogin = async () => {
      const token = Cookies.get("token");
      if (!token) {
        setIsAuthenticated(false);
        setLoading(false);
        return;
      }
      try {
        const user = await getProfile();
        setUser(user);
        setIsAuthenticated(true);
      } catch (error) {
        setIsAuthenticated(false);
        setUser(null);
        Cookies.remove("token");
        throw new Error(
          error.response?.data?.message || "Error al verificar la autenticación"
        );
      } finally {
        setLoading(false);
      }
    };
    checkLogin();
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

      const socketInstance = io(BACKEND_URL, {
        withCredentials: true,
      });

      socketInstance.on("connect", () => {
        console.log(`Socket connected: ${socketInstance.id}`);
        socketInstance.emit("join", user.id); // User joins a specific room
      });
      socketInstance.on("disconnect", () => {
        console.log("Socket disconnected");
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
