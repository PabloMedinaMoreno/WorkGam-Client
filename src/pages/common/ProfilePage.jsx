// src/pages/ProfilePage.jsx
import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import ProfileCard from "../../components/profile/ProfileCard";
import UpdateProfileModal from "../../components/profile/UpdateProfileModal";
import ChangePasswordModal from "../../components/profile/ChangePasswordModal";
import { AnimatePresence, motion } from "framer-motion";

const ProfilePage = () => {
  const { user, updateProfilePic } = useAuth();
  const [isEditOpen, setEditOpen] = useState(false);
  const [isPasswordOpen, setPasswordOpen] = useState(false);

  return (
    <div className="p-8 flex flex-col items-center">
      <motion.h1
        className="text-3xl font-bold mb-6 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Perfil
      </motion.h1>
      <motion.div
        className="w-full max-w-md"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.8 }}
      >
        <ProfileCard
          user={user}
          onEdit={() => setEditOpen(true)}
          onChangePassword={() => setPasswordOpen(true)}
          onProfilePicChange={updateProfilePic}
        />
      </motion.div>
      <AnimatePresence>
        {isEditOpen && (
          <UpdateProfileModal onClose={() => setEditOpen(false)} />
        )}
        {isPasswordOpen && (
          <ChangePasswordModal onClose={() => setPasswordOpen(false)} />
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProfilePage;
