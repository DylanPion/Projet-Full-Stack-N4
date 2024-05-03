import React, { useState } from "react";
import Modal from "./Modal";
import Popup from "./Popup";
import { CreateBucket } from "../services/BucketService";

const Header = () => {
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
    <div className="header">
      <div className="left">
        <h1>Mon drive</h1>
      </div>
      <div className="report">
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
    </div>
  );
};

export default Header;
