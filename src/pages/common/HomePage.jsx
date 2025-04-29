import React from "react";
import { motion } from "framer-motion";
import { UserCheck, Smartphone, Award } from "lucide-react";

export default function HomePage() {
  return (
    <div className="overflow-hidden text-gray-900">
      <section className="relative min-h-screen">
        {/* Overlay degradado */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-800/80 to-yellow-600/70 backdrop-blur-sm" />
        <div className="relative z-10 flex flex-col items-center justify-center h-full px-4 text-center">
          <motion.img
            src="/images/workgam-logo.png" // Asegúrate de que la ruta sea correcta
            alt="WorkGam Logo"
            className="w-32 h-auto mt-8 mb-8 mx-auto" // Centrado horizontal con mx-auto
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          />
          <motion.h1
            className="text-6xl sm:text-7xl lg:text-8xl font-extrabold text-white drop-shadow-lg"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            Bienvenido a <span className="text-yellow-500">WorkGam</span>
          </motion.h1>
          <motion.p
            className="mt-4 max-w-2xl text-lg sm:text-xl text-indigo-200"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            Revoluciona tu workflow y motiva a tu equipo con gamificación
            inteligente.
          </motion.p>
          <motion.a
            href="#features"
            className="mt-8 inline-block rounded-full bg-yellow-500 px-8 py-4 text-white font-semibold shadow-xl hover:bg-yellow-400 hover:shadow-2xl transform hover:scale-105 transition"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            Descubre más
          </motion.a>
        </div>
        {/* SVG Wave */}
        <div className="absolute bottom-0 w-full">
          <svg viewBox="0 0 1440 120" className="block w-full h-20">
            <path fill="#f8fafc" d="M0,96L1440,32L1440,120L0,120Z" />
          </svg>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-gray-100">
        <div className="container mx-auto px-4">
          <motion.h2
            className="text-4xl font-bold text-center text-gray-800 mb-12"
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
          >
            Características destacadas
          </motion.h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Smartphone className="h-10 w-10 text-yellow-500" />,  
                title: "Accesibilidad",
                desc: "Gestiona trámites desde cualquier dispositivo, en cualquier lugar y momento.",
              },
              {
                icon: <UserCheck className="h-10 w-10 text-yellow-500" />,  
                title: "Workflow Inteligente",
                desc: "Automatiza la asignación de tareas según roles y propaga estados en tiempo real.",
              },
              {
                icon: <Award className="h-10 w-10 text-yellow-500" />,  
                title: "Gamificación",
                desc: "Puntos, niveles y rankings que incentivan la productividad y la competencia sana.",
              },
            ].map((feature, i) => (
              <motion.div
                key={i}
                className="bg-white p-6 rounded-2xl shadow-md flex flex-col items-center text-center"
                initial={{ y: 60, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: i * 0.2 }}
                viewport={{ once: true }}
              >
                {feature.icon}
                <h4 className="mt-4 text-xl font-semibold text-gray-800">
                  {feature.title}
                </h4>
                <p className="mt-2 text-gray-600">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call-to-Action */}
      <section className="py-20 bg-gradient-to-b from-indigo-800 to-yellow-600 text-white text-center">
  <motion.h2
    className="text-3xl font-bold mb-4"
    initial={{ x: -50, opacity: 0 }}
    animate={{ x: 0, opacity: 1 }}
    transition={{ duration: 0.8 }}
  >
    ¿Listo para transformar tu workflow?
  </motion.h2>
  <motion.p
    className="text-lg mb-8"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: 0.3, duration: 0.8 }}
  >
    Únete a WorkGam hoy y lleva la gestión de trámites a otro nivel.
  </motion.p>
  <motion.a
    href="/register"
    className="inline-block rounded-full bg-white px-10 py-4 text-indigo-600 font-semibold shadow-xl hover:shadow-2xl transform hover:scale-105 transition"
    whileHover={{ scale: 1.05 }}
    transition={{ type: "spring", stiffness: 200 }}
  >
    Comenzar ahora
  </motion.a>
</section>

    </div>
  );
}
