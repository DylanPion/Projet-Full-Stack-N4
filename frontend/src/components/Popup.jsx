import React, { useState } from "react";

const Popup = ({ open, children, onClose, style }) => {
  if (!open) return null;
  return (
    <div className={style}>
      {children}
      <i onClick={onClose} className="bx bx-x"></i>
    </div>
  );
};

export default Popup;
