// src/components/ConfettiPortal.jsx
import React from "react";
import ReactDOM from "react-dom";
import ReactCanvasConfetti from "react-canvas-confetti";

const canvasStyles = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  pointerEvents: "none",
  zIndex: 999999, // SUPER ALTO
};

const ConfettiPortal = React.forwardRef((props, ref) => {
  return ReactDOM.createPortal(
    <ReactCanvasConfetti refConfetti={ref} style={canvasStyles} />,
    document.body
  );
});

export default ConfettiPortal;
