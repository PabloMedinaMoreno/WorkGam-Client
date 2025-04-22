import React, { useState, useRef, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { FaBars, FaTimes, FaSignOutAlt, FaSignInAlt, FaUserPlus, FaUser } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';

export default function NavBar({ sidebarOpen, onToggleSidebar }) {
  const { isAuthenticated, logout, user } = useAuth();
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const onClickOutside = e => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', onClickOutside);
    return () => document.removeEventListener('mousedown', onClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    setDropdownOpen(false);
    navigate('/');
  };

  const navLinks = [
    { to: '/', label: 'Inicio' },
    isAuthenticated ? { to: '/dashboard', label: 'Dashboard' } : { to: '/login', label: 'Iniciar sesión' },
    !isAuthenticated && { to: '/register', label: 'Registrarse' },
  ].filter(Boolean);

  return (
    <motion.header
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 120, damping: 15 }}
      className="fixed top-0 inset-x-0 z-50 bg-gradient-to-r from-indigo-700 to-yellow-600 text-white shadow-xl backdrop-blur-lg"
    >
      <div className="mx-auto max-w-7xl flex h-16 items-center justify-between px-6">
        <div className="flex items-center space-x-4">
          {isAuthenticated && (
            <motion.button
              onClick={onToggleSidebar}
              whileTap={{ scale: 0.9 }}
              className="p-2 hover:bg-indigo-600 rounded-md transition"
            >
              {sidebarOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
            </motion.button>
          )}
          <NavLink to={isAuthenticated ? '/dashboard' : '/'} className="flex items-center space-x-2">
            <motion.img
              src="/images/workgam-logo.png"
              alt="WorkGam"
              className="h-8 w-8"
              whileHover={{ rotate: 360 }}
              transition={{ duration: 1 }}
            />
            <motion.span
              className="text-2xl font-extrabold tracking-wider"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >WorkGam</motion.span>
          </NavLink>
        </div>

        <nav className="hidden md:flex space-x-8">
          {navLinks.map(({ to, label }) => (
            <NavLink key={to} to={to} className="relative">
              {({ isActive }) => (
                <>
                  <motion.span
                    className="py-2 text-lg font-medium"
                    initial={{ color: '#ffffff' }}
                    animate={{ color: isActive ? '#fbbf24' : '#ffffff' }}
                    transition={{ duration: 0.3 }}
                  >
                    {label}
                  </motion.span>
                  {isActive && (
                    <motion.div
                      layoutId="underline"
                      className="absolute bottom-0 left-0 h-1 w-full bg-yellow-400 rounded"
                    />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center space-x-4">
          {isAuthenticated ? (
            <div
              ref={dropdownRef}
              className="relative"
              onMouseEnter={() => setDropdownOpen(true)} // Hover para abrir el dropdown
              onMouseLeave={() => setDropdownOpen(false)} // Hover para cerrar el dropdown
            >
              <motion.button
                className="h-10 w-10 rounded-full border-2 border-white overflow-hidden shadow-lg"
              >
                <img src={user?.profile_pic || '/images/default-profile.png'} alt="Perfil" className="h-full w-full object-cover" />
              </motion.button>
              <AnimatePresence>
                {dropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 mt-2 w-48 bg-white text-gray-800 rounded-lg shadow-2xl overflow-hidden"
                  >
                    <motion.button
                      onClick={() => { navigate('/dashboard/profile'); setDropdownOpen(false); }}
                      whileHover={{ scale: 1.02 }}
                      className="flex w-full items-center gap-2 px-4 py-3 hover:bg-gray-100"
                    ><FaUser />Perfil</motion.button>
                    <motion.button
                      onClick={handleLogout}
                      whileHover={{ scale: 1.02 }}
                      className="flex w-full items-center gap-2 px-4 py-3 hover:bg-gray-100 text-red-600"
                    ><FaSignOutAlt />Cerrar sesión</motion.button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <motion.button
              onClick={() => navigate('/login')}
              whileHover={{ scale: 1.05 }}
              className="hidden md:flex items-center gap-2 rounded-full bg-yellow-400 text-indigo-700 px-5 py-2 font-semibold shadow-lg"
            ><FaSignInAlt />Iniciar sesión</motion.button>
          )}

          <motion.button
            onClick={() => setMobileMenuOpen(o => !o)}
            className="md:hidden p-2 hover:bg-indigo-600 rounded-md"
          >
            {mobileMenuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
          </motion.button>
        </div>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden bg-indigo-600 text-white overflow-hidden"
          >
            <div className="flex flex-col space-y-4 px-6 py-4">
              {navLinks.map(({ to, label }) => (
                <NavLink
                  key={to}
                  to={to}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-lg font-medium hover:text-yellow-300 transition"
                >{label}</NavLink>
              ))}
              {!isAuthenticated && (
                <motion.button
                  onClick={() => { navigate('/register'); setMobileMenuOpen(false); }}
                  whileHover={{ scale: 1.05 }}
                  className="mt-4 flex w-full justify-center rounded-full bg-yellow-400 text-indigo-700 px-4 py-2 font-semibold"
                >Registrarse</motion.button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
