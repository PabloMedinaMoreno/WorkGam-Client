// src/components/common/CountdownTimer.jsx
import React, { useEffect, useState } from "react";

/**
 * Componente para mostrar un temporizador con cuenta regresiva.
 * Muestra el tiempo restante en formato días, horas, minutos y segundos.
 */
const CountdownTimer = ({ initialTimeLeftMs }) => {
  const [timeLeftMs, setTimeLeftMs] = useState(initialTimeLeftMs);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeftMs((prev) => prev - 1000);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const isOverdue = timeLeftMs < 0;
  const displayMs = Math.abs(timeLeftMs);
  const days = Math.floor(displayMs / (1000 * 60 * 60 * 24));
  const hours = Math.floor((displayMs / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((displayMs / (1000 * 60)) % 60);
  const seconds = Math.floor((displayMs / 1000) % 60);

  return (
    <span className={isOverdue ? "text-red-600" : "text-green-600"}>
      {isOverdue
        ? `Retrasada por ${days}d ${hours}h ${minutes}m ${seconds}s`
        : `Quedan ${days}d ${hours}h ${minutes}m ${seconds}s`}
    </span>
  );
};

export default CountdownTimer;
