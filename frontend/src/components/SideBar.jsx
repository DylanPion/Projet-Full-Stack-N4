import React, { useState } from "react";
import Modal from "./Modal";
import Popup from "./Popup";
import { CreateBucket } from "../services/BucketService";

const SideBar = () => {
  const [isOpenPopup, setIsOpenPopup] = useState(false);
  const [isOpenFolderModal, setIsOpenFolderModal] = useState(false);
  const [isOpenFileModal, setIsOpenFileModal] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const formData = new FormData(event.target);
      const data = Object.fromEntries(formData.entries());
      const response = await CreateBucket(data);
      console.log("Bucket crée avec succès");
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
      <Popup open={isOpenPopup} onClose={() => setIsOpenPopup(false)}>
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
      <ul className="side-menu">
        <li>
          <a href="/dashboard">
            <i className="bx bx-home"></i>Accueil
          </a>
        </li>
        <li>
          <a href="#">
            <i className="bx bx-hdd"></i>Mon drive
          </a>
        </li>
        <li className="active">
          <a href="#">
            <i className="bx bx-group"></i>Partagés avec moi
          </a>
        </li>
        <li>
          <a href="#">
            <i className="bx bx-trash"></i>Corbeile
          </a>
        </li>
        <li>
          <a href="#">
            <i className="bx bx-cog"></i>Paramètre
          </a>
        </li>
        <li>
          <a href="#">
            <i className="bx bx-cloud"></i>Espace de stockage
          </a>
        </li>
      </ul>
      <ul className="side-menu">
        <li>
          <a href="#" className="logout">
            <i className="bx bx-log-out-circle"></i>
            Logout
          </a>
        </li>
      </ul>
    </div>
  );
};

export default SideBar;
