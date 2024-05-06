import React, { useState } from "react";

const Popup = ({ open, children, onClose }) => {
  if (!open) return null;
  return (
    <div className="popup">
      {children}
      <i onClick={onClose} className="bx bx-x closePopup"></i>
    </div>
  );
};

export default Popup;
