import React, { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
import API from "../services/axios.js";
import {
  signupService,
  loginService,
  profileService,
  updateProfileService,
  updateProfilePicService,
} from "../services/authService.js";
import useRoleStore from "../store/useRoleStore.js";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [socket, setSocket] = useState(null);

  const { loadRoles } = useRoleStore();

  useEffect(() => {
    const checkToken = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        // 1) Si no hay token, no hay nada que hacer. Forzamos el estado de loading a false
        setIsAuthenticated(false);
        setUser(null);
        setLoading(false);
        return;
      }

      API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      try {
        const u = await profileService();
        setUser(u);
        setIsAuthenticated(true);
        await loadRoles();
      } catch (error) {
        // token inválido o expirado → borrarlo y forzar login
        localStorage.removeItem("token");
        setUser(null);
        setIsAuthenticated(false);
      } finally {
        // 2) En cualquier caso, dejamos de cargar para que <ProtectedRoute> pase al siguiente paso
        setLoading(false);
      }
    };

    checkToken();
  }, []);

  const signup = async (data) => {
    setLoading(true);
    try {
      const { user: u, token } = await signupService(data);
      localStorage.setItem("token", token);
      API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      setUser(u);
      setIsAuthenticated(true);
    } finally {
      setLoading(false);
    }
  };

  const login = async (creds) => {
    setLoading(true);
    try {
      const { user: u, token } = await loginService(creds);
      localStorage.setItem("token", token);
      API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      setUser(u);
      setIsAuthenticated(true);
      await loadRoles();
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    localStorage.removeItem("token");
    delete API.defaults.headers.common["Authorization"];
    setUser(null);
    setIsAuthenticated(false);
    setLoading(false);
    if (socket) {
      socket.disconnect();
      setSocket(null);
    }
  };

  const updateProfile = async (profileData) => {
    setLoading(true);
    try {
      const u = await updateProfileService(profileData);
      setUser(u);
    } finally {
      setLoading(false);
    }
  };

  const updateProfilePic = async (file) => {
    setLoading(true);
    try {
      const u = await updateProfilePicService(file);
      setUser(u);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      const socketInstance = io(import.meta.env.VITE_BACKEND_URL, {
        withCredentials: true,
      });
      setSocket(socketInstance);
      return () => socketInstance.disconnect();
    } else if (socket) {
      socket.disconnect();
      setSocket(null);
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
