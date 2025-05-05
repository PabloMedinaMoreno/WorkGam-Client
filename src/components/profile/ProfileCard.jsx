// src/components/profile/ProfileCard.jsx
import React, { useRef } from "react";
import IconButton from "../common/IconButton";
import { FaUserEdit, FaLock } from "react-icons/fa";
import { Tooltip } from "@mui/material";

const ProfileCard = ({
  user,
  onEdit,
  onChangePassword,
  onProfilePicChange,
}) => {
  const fileInputRef = useRef(null);

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) onProfilePicChange?.(file);
  };

  return (
    <div className="w-full max-w-lg shadow-2xl rounded-3xl p-6 bg-white">
      <div className="flex justify-center relative">
        <Tooltip title="Cambiar imagen de perfil" arrow>
          <img
            src={user.profile_pic || "https://tse1.mm.bing.net/th?id=OIP.ul21MarTuYknn6vFmQxOywHaHa&pid=Api&P=0&h=180" }
            alt="Profile"
            className="w-40 h-40 rounded-full border-4 border-gray-300 shadow-lg object-cover cursor-pointer"
            onClick={handleImageClick}
          />
        </Tooltip>
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
        />
      </div>

      <div className="text-center mt-6">
        <h2 className="text-2xl font-bold text-gray-900">{user.username}</h2>
        <p className="text-gray-500">{user.email}</p>
      </div>

      <div className="mt-6 space-y-4 text-gray-700">
        <div className="flex justify-between border-b pb-2">
          <span className="font-medium">Teléfono:</span>
          <span className="text-gray-500">{user.phone || "N/A"}</span>
        </div>
        <div className="flex justify-between border-b pb-2">
          <span className="font-medium">Rol:</span>
          <span className="text-gray-500">{user.role}</span>
        </div>
        {user.role !== "Cliente" && (
          <div className="flex justify-between border-b pb-2">
            <span className="font-medium">Empresa:</span>
            <span className="text-gray-500">{user.company || "WorkGam"}</span>
          </div>
        )}
      </div>

      <div className="mt-6 flex flex-col sm:flex-row gap-4">
        <IconButton
          variant="primary"
          label="Actualizar Perfil"
          onClick={onEdit}
          className="w-full"
        >
          <FaUserEdit />
        </IconButton>

        <IconButton
          variant="primary"
          label="Cambiar Contraseña"
          onClick={onChangePassword}
          className="w-full"
        >
          <FaLock />
        </IconButton>
      </div>
    </div>
  );
};

export default ProfileCard;
