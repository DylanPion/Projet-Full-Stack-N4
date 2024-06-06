import React, { useState } from "react";
import Modal from "./Modal";
import Popup from "./Popup";
import { CreateBucket } from "../services/BucketService";
import { NavLink } from "react-router-dom";
import Toast from "./Toast";

const SideBar = () => {
  const [isOpenPopup, setIsOpenPopup] = useState(false);
  const [isOpenFolderModal, setIsOpenFolderModal] = useState(false);
  const [isOpenFileModal, setIsOpenFileModal] = useState(false);
  const [toastOpen, setToastOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const formData = new FormData(event.target);
      const data = Object.fromEntries(formData.entries());
      const response = await CreateBucket(data);
      setToastMessage("bucketCreate");
      setToastOpen(true);
      window.location.reload();
    } catch (error) {
      console.error("Erreur lors de la création du bucket :", error);
    }
  };
  return (
    <div className="sidebar">
      <a href="#" className="logo">
        <i className="bx bx-code-alt"></i>
        <div className="logo-name">
          <span>Next-u</span> Drive
        </div>
      </a>
      <div className="newButton">
        <i className="bx bx-plus"></i>
        <span onClick={() => setIsOpenPopup(true)}> Nouveau</span>
      </div>
      <ul className="side-menu">
        <li>
          <NavLink to="/dashboard/drive" className="link">
            <i className="bx bx-hdd"></i>Mon drive
          </NavLink>
        </li>
        <li>
          <NavLink to="/dashboard/shared" className="link">
            <i className="bx bx-group"></i>Partagés avec moi
          </NavLink>
        </li>
        <li>
          <NavLink to="/dashboard/trash" className="link">
            <i className="bx bx-trash"></i>Corbeile
          </NavLink>
        </li>
        <li>
          <NavLink to="/dashboard/setting" className="link">
            <i className="bx bx-cog"></i>Paramètre
          </NavLink>
        </li>
        <li>
          <NavLink to="/dashboard/storage" className="link">
            <i className="bx bx-cloud"></i>Espace de stockage
          </NavLink>
        </li>
      </ul>
      <ul className="side-menu">
        <li>
          <NavLink to="/logout" className="link logout">
            <i className="bx bx-log-out-circle"></i>
            Logout
          </NavLink>
        </li>
      </ul>
      <Popup
        open={isOpenPopup}
        onClose={() => setIsOpenPopup(false)}
        style="popup"
      >
        <ul>
          <li>
            <i className="bx bx-folder-plus"></i>
            <span onClick={() => setIsOpenFolderModal(true)}>
              Créer un dossier
            </span>
            <Modal
              open={isOpenFolderModal}
              onClose={() => setIsOpenFolderModal(false)}
            >
              <form className="form-modal" onSubmit={handleSubmit}>
                <h2>Nouveau dossier</h2>
                <input
                  type="text"
                  name="label"
                  defaultValue="Document sans titre"
                />
                <button type="submit">Créer le document</button>
              </form>
            </Modal>
          </li>
          <div className="separator"></div>
          <li>
            <i className="bx bxs-file-plus"></i>
            <span onClick={() => setIsOpenFileModal(true)}>
              Ajouter un fichier
            </span>
            <Modal
              open={isOpenFileModal}
              onClose={() => setIsOpenFileModal(false)}
            >
              <form className="form-modal">
                <h2>Nouveau fichier</h2>
                <input type="file" />
                <button type="submit">Ajouter le fichier</button>
              </form>
            </Modal>
          </li>
        </ul>
      </Popup>
      <Toast
        open={toastOpen}
        onClose={() => setToastOpen(false)}
        toast={toastMessage}
      />
    </div>
  );
};

export default SideBar;
