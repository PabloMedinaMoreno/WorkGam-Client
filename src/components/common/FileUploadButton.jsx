// src/components/ui/FileUploadButton.jsx
import React, { useRef } from "react";
import { FaUpload } from "react-icons/fa";

const FileUploadButton = ({ onFileSelect, label = "Adjuntar PDF" }) => {
  const fileInputRef = useRef(null);

  const handleClick = () => {
    fileInputRef.current.click();
  };

  const handleChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      onFileSelect(file);
    }
  };

  return (
    <div>
      <input
        type="file"
        accept="application/pdf"
        ref={fileInputRef}
        onChange={handleChange}
        className="hidden"
      />
      <button
        type="button"
        onClick={handleClick}
        className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-md transition-colors"
      >
        <FaUpload />
        {label}
      </button>
    </div>
  );
};

export default FileUploadButton;
