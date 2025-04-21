// src/components/ui/Footer.jsx
import React from "react";

const Footer = () => {
  return (
    <footer className="bg-indigo-700 text-white text-center p-4">
      <p>Sede Electrónica © {new Date().getFullYear()}</p>
    </footer>
  );
};


export default Footer;
