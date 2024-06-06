import React, { useEffect } from "react";

const Toast = ({ open, toast, onClose }) => {
  useEffect(() => {
    if (open) {
      const timer = setTimeout(onClose, 2500);
      return () => clearTimeout(timer);
    }
  }, [open, onClose]);

  if (!open) return null;

  const getColor = (toastValue) => {
    switch (toastValue) {
      case "bucketEdit":
        return "blue";
      case "fileDelete":
      case "bucketDelete":
        return "red";
      case "fileCreate":
      case "bucketCreate":
        return "green";
      default:
        return "gray";
    }
  };

  const getMessage = (toastValue) => {
    switch (toastValue) {
      case "bucketCreate":
        return "Le bucket a bien été créé";
      case "fileCreate":
        return "Le fichier a bien été créé";
      case "bucketEdit":
        return "Le bucket a bien été modifié";
      case "bucketDelete":
        return "Le bucket a bien été supprimé";
      case "fileDelete":
        return "Le fichier a bien été supprimé";
      default:
        return "Null";
    }
  };

  const getIcon = (toastValue) => {
    switch (toastValue) {
      case "bucketEdit":
        return "bx bxs-edit";
      case "fileDelete":
      case "bucketDelete":
        return "bx bx-trash";
      case "fileCreate":
      case "bucketCreate":
        return "bx bx-check";
      default:
        return "bx bx-error";
    }
  };

  const color = getColor(toast);
  const message = getMessage(toast);
  const icon = getIcon(toast);

  return (
    <div className="wrapper">
      <div className={`toast ${color}`}>
        <i className={icon}></i>
        <p>{message}</p>
        <i onClick={onClose} id="closeModal" className="bx bx-x"></i>
      </div>
    </div>
  );
};

export default Toast;
