import React, { useState, useRef, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { NavLink, useNavigate } from "react-router-dom";
import {
  FaBars,
  FaSignOutAlt,
  FaSignInAlt,
  FaUserPlus,
  FaUser, // Icono de perfil
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

function NavBar({ onToggleSidebar }) {
  const { isAuthenticated, logout, user } = useAuth();
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Muestra el menú al pasar el mouse
  const handleMouseEnter = () => setDropdownOpen(true);
  // Oculta el menú al retirar el mouse
  const handleMouseLeave = () => setDropdownOpen(false);

  // Cierra el dropdown si se hace clic fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleNavigateToProfile = () => {
    navigate("/dashboard/profile");
    setDropdownOpen(false);
  };

  const handleLogin = () => {
    navigate("/login");
    setDropdownOpen(false);
  };

  const handleRegister = () => {
    navigate("/register");
    setDropdownOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-indigo-700 flex justify-between items-center py-4 px-6 shadow-md">
      {/* Sección izquierda: botón del sidebar y título */}
      <div className="flex items-center gap-4">
        {isAuthenticated && (
          <button
            onClick={onToggleSidebar}
            className="text-white text-xl p-2 hover:bg-indigo-600 rounded-md transition cursor-pointer"
            title="Menú lateral"
          >
            <FaBars />
          </button>
        )}
        <h1 className="text-xl font-bold text-white">
          <NavLink to={isAuthenticated ? "/dashboard" : "/"}>
            WorkGam
          </NavLink>
        </h1>
      </div>

      {/* Sección derecha: imagen de perfil y dropdown */}
      <ul className="flex items-center">
        <li
          className="relative"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          ref={dropdownRef}
        >
          {/* Contenedor de la imagen con escala forzada cuando el dropdown está abierto */}
          <div
            className={`w-10 h-10 rounded-full border-2 border-white shadow-md overflow-hidden cursor-pointer transition transform ${
              dropdownOpen ? "scale-105" : "hover:scale-105"
            } focus:outline-none`}
            title="Menú de usuario"
          >
            <img
              src={
                user?.profile_pic ||
                "https://yourteachingmentor.com/wp-content/uploads/2020/12/istockphoto-1223671392-612x612-1.jpg"
              }
              alt="perfil"
              className="w-full h-full object-cover"
            />
          </div>
          <AnimatePresence>
            {dropdownOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-50"
              >
                {isAuthenticated ? (
                  <>
                    <div
                      onClick={handleNavigateToProfile}
                      className="flex items-center gap-2 px-4 py-2 hover:bg-indigo-50 cursor-pointer text-blue-800"
                    >
                      <FaUser />
                      <span>Perfil</span>
                    </div>
                    <div
                      onClick={() => {
                        logout();
                        setDropdownOpen(false);
                      }}
                      className="flex items-center gap-2 px-4 py-2 hover:bg-indigo-50 cursor-pointer text-red-800"
                    >
                      <FaSignOutAlt />
                      <span>Cerrar sesión</span>
                    </div>
                  </>
                ) : (
                  <>
                    <div
                      onClick={handleLogin}
                      className="flex items-center gap-2 px-4 py-2 hover:bg-indigo-50 cursor-pointer text-blue-800"
                    >
                      <FaSignInAlt />
                      <span>Iniciar sesión</span>
                    </div>
                    <div
                      onClick={handleRegister}
                      className="flex items-center gap-2 px-4 py-2 hover:bg-indigo-50 cursor-pointer text-purple-800"
                    >
                      <FaUserPlus />
                      <span>Registrarse</span>
                    </div>
                  </>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
