// src/components/ui/Label.jsx
import React from "react";

const Label = ({ children, className = "", ...props }) => {
  return (
    <label className={`block text-gray-700 font-medium ${className}`} {...props}>
      {children}
    </label>
  );
};

export default Label;
