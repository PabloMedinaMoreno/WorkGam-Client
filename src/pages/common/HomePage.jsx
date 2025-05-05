import React from "react";
import { motion } from "framer-motion";
import { UserCheck, Smartphone, Award } from "lucide-react";

export default function HomePage() {
  return (
    <div className="overflow-hidden text-gray-900">
      {/* Hero Section */}
      <section className="relative min-h-screen">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-800/80 to-yellow-600/70 backdrop-blur-sm" />
        <div className="relative z-10 flex flex-col items-center justify-center h-full px-4 text-center">
          <motion.img
            src="/images/workgam-logo.png"
            alt="WorkGam Logo"
            className="w-32 h-auto mt-8 mb-8 mx-auto"
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

      {/* Planes de Suscripción (espacio superior reducido) */}
      <section className="pt-6 pb-20 bg-gray-100" id="planes">
        <div className="container mx-auto px-4">
          <motion.h2
            className="text-4xl font-bold text-center text-gray-800 mb-12"
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
          >
            Planes de Suscripción
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: "Gratis",
                price: "€0",
                features: [
                  "Gestión básica de tareas",
                  "Seguimiento general de trámites",
                  "Acceso desde múltiples dispositivos",
                ],
                button: "Empezar",
                bg: "bg-gray-100",
              },
              {
                title: "Básico",
                price: "€13.95 / mes",
                features: [
                  "Historial completo de trámites",
                  "Soporte limitado",
                  "Gestión avanzada de tareas",
                ],
                button: "Suscribirse",
                bg: "bg-indigo-50",
              },
              {
                title: "Pro",
                price: "€24.95 / mes",
                features: [
                  "Automatización parcial",
                  "Gamificación avanzada",
                  "Métricas detalladas",
                  "Chat con documentos",
                ],
                button: "Elegir Pro",
                bg: "bg-yellow-50",
              },
              {
                title: "Business",
                price: "€34.95 / mes",
                features: [
                  "Todas las funcionalidades",
                  "Integración con herramientas externas",
                  "Soporte prioritario 24/7",
                  "Analítica predictiva",
                ],
                button: "Empieza Business",
                bg: "bg-indigo-100",
              },
            ].map((plan, idx) => (
              <motion.div
                key={idx}
                className={`${plan.bg} rounded-2xl p-6 shadow-lg flex flex-col justify-between`}
                initial={{ y: 60, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: idx * 0.2 }}
                viewport={{ once: true }}
              >
                <div>
                  <h3 className="text-xl font-bold text-indigo-800 mb-2 text-center">{plan.title}</h3>
                  <p className="text-3xl font-extrabold text-center text-yellow-600 mb-4">{plan.price}</p>
                  <ul className="space-y-2 text-gray-700 text-sm mb-6">
                    {plan.features.map((f, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <span className="text-yellow-500">✔</span> {f}
                      </li>
                    ))}
                  </ul>
                </div>
                <a
                  href="/register"
                  className="block text-center bg-yellow-500 hover:bg-yellow-400 text-white font-semibold py-2 rounded-full transition"
                >
                  {plan.button}
                </a>
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
