import React from "react";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
} from "react-icons/fa";
import { IoIosCall, IoIosMail } from "react-icons/io";

export default function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="mt-16 bg-gradient-to-t from-indigo-800 to-yellow-600 text-white pt-12 pb-6"
    >
      <div className="mx-auto max-w-7xl px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Sección Logo y Redes Sociales */}
        <div className="flex flex-col items-start space-y-4">
          <motion.img
            src="/images/workgam-logo.png"
            alt="WorkGam Logo"
            className="h-12 w-auto cursor-pointer"
            whileHover={{ scale: 1.2 }}
          />
          <motion.span
            className="text-2xl font-extrabold"
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
          >
            WorkGam
          </motion.span>
          <motion.p className="text-sm text-gray-300">
            © {new Date().getFullYear()} WorkGam. Todos los derechos reservados.
          </motion.p>
          <div className="flex space-x-4">
            {[FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram].map(
              (Icon, i) => (
                <motion.a
                  key={i}
                  href="#"
                  className="text-white hover:text-yellow-300"
                  whileHover={{ scale: 1.2 }}
                  transition={{ duration: 0.3 }}
                >
                  <Icon size={20} />
                </motion.a>
              )
            )}
          </div>
        </div>

        {/* Sección Enlaces */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="space-y-4"
        >
          <h4 className="font-semibold text-xl">Enlaces</h4>
          <ul className="space-y-2">
            {["About", "Support", "Blog", "Careers"].map((label, i) => (
              <li key={i}>
                <NavLink
                  to="#"
                  className="text-gray-300 hover:text-yellow-300 transition"
                >
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Sección Contacto */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="space-y-4"
        >
          <h4 className="font-semibold text-xl">Contacto</h4>
          <div className="flex items-center space-x-2 text-gray-300 hover:text-yellow-300 transition">
            <IoIosCall size={20} />
            <span>+34 234 567 890</span>
          </div>
          <div className="flex items-center space-x-2 text-gray-300 hover:text-yellow-300 transition">
            <IoIosMail size={20} />
            <span>contact@workgam.com</span>
          </div>
        </motion.div>
      </div>
    </motion.footer>
  );
}
