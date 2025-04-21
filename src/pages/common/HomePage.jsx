// src/pages/HomePage.jsx
import { Link } from "react-router-dom";

function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-3xl text-center p-8">
        <h1 className="text-5xl font-bold text-gray-900 mb-4">
          Bienvenido a Sede Electrónica
        </h1>
        <p className="text-lg text-gray-700 mb-8">
          Descubre una nueva forma de gestionar trámites y servicios de manera
          ágil y sencilla. Únete a nosotros y mejora tu experiencia digital.
        </p>
        <Link
          to="/login"
          className="inline-block bg-indigo-700 hover:bg-indigo-600 text-white px-6 py-3 rounded-md transition-all transform hover:scale-105 duration-300 shadow-lg hover:shadow-2xl"
        >
          Get Started
        </Link>
      </div>
    </div>
  );
}

export default HomePage;
