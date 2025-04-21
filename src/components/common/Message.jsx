// src/components/ui/Message.jsx
import React from "react";

const Message = ({ message }) => {
  return (
    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
      {message}
    </div>
  );
};

export default Message;
