import React from "react";

const Modal = ({ open, children, onClose }) => {
  if (!open) return null;
  return (
    <>
      <div onClick={onClose} className="modal-overlay"></div>
      <div className="modal">
        <i onClick={onClose} id="closeModal" className="bx bx-x"></i>
        {children}
      </div>
    </>
  );
};

export default Modal;
