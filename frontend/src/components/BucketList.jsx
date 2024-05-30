import React, { useContext, useEffect, useState } from "react";
import {
  DeleteBucket,
  GetBucketList,
  UpdateBucket,
} from "../services/BucketService";
import { AddFile } from "../services/FileService";
import Popup from "./Popup";
import Modal from "./Modal";
import { Link } from "react-router-dom";

const BucketList = ({ onDragOver, onDragLeave }) => {
  const [bucketList, setBucketList] = useState([]);
  const [openBucketId, setOpenBucketId] = useState(null); // État pour stocker l'ID du bucket dont le menu est ouvert
  const [isOpenEditFolder, setIsOpenEditFolder] = useState(false);
  const [editingBucketId, setEditingBucketId] = useState(null);
  const [isOpenDeleteFolder, setIsOpenDeleteFolder] = useState(false);
  const [deletingBucketId, setDeletingBucketId] = useState(null);
  const [isFileOver, setIsFileOver] = useState(false);

  // Get
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await GetBucketList();
        setBucketList(response.data);
      } catch (error) {
        console.error("Erreur lors de la requête :", error);
      }
    };

    fetchData();
  }, []);

  // Edit
  const handleEditSubmit = async (event, bucketId) => {
    event.preventDefault();
    try {
      const formData = new FormData(event.target);
      const data = Object.fromEntries(formData.entries());
      await UpdateBucket(data, bucketId);
      console.log("Bucket modifié avec succès");
      setIsOpenEditFolder(false);
      // Mettre à jour la liste des dossiers sans recharger la page
      const updatedBucketList = bucketList.map((bucket) =>
        bucket.id === bucketId ? { ...bucket, ...data } : bucket
      );
      setBucketList(updatedBucketList);
    } catch (error) {
      console.error("Erreur lors de la modification du bucket :", error);
    }
  };

  // Delete
  const handleDeleteSubmit = async (bucketId) => {
    try {
      await DeleteBucket(bucketId);
      console.log("Bucket supprimé avec succès");
      setIsOpenDeleteFolder(false);
      window.location.reload();
    } catch (error) {
      console.error("Erreur lors de la suppression du bucket :", error);
    }
  };

  const handleDrop = async (event, bucketId) => {
    event.preventDefault();
    try {
      console.log(event.dataTransfer.files[0]);
      const formData = new FormData();
      formData.append("file", event.dataTransfer.files[0]);
      console.log("test" + formData);
      await AddFile(formData, bucketId); // Télécharger le fichier
    } catch (error) {
      console.error("Erreur lors du glisser-déposer des fichiers :", error);
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    setIsFileOver(true); // Un fichier est actuellement survolé
    if (onDragOver) {
      onDragOver(); // Appel du callback fourni par Main
    }
  };

  // Modifier le gestionnaire d'événement handleDragLeave pour mettre à jour l'état
  const handleDragLeave = () => {
    setIsFileOver(false); // Plus de fichier survolé
    if (onDragLeave) {
      onDragLeave();
    }
  };

  const togglePopup = (bucketId) => {
    setOpenBucketId(bucketId === openBucketId ? null : bucketId);
  };

  return (
    <>
      <div className="bucket-list-title">
        <div className="bucket-list-title">
          <h1>Mon drive</h1>
        </div>
      </div>
      <ul className="bucketList">
        {bucketList.map((bucket) => (
          <li
            key={bucket.id}
            onDrop={(event) => handleDrop(event, bucket.id)}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            className={`link ${isFileOver ? "file-over" : ""}`}
          >
            <Link to={`/dashboard/file/${bucket.id}`}>
              <i className="bx bxs-folder"></i>
              <h3>{bucket.label}</h3>
            </Link>

            <i
              className="bx bx-dots-vertical-rounded"
              onClick={() => togglePopup(bucket.id)}
            ></i>
            <Popup
              open={openBucketId === bucket.id}
              onClose={() => setOpenBucketId(null)}
              style="popup-bucket"
            >
              <ul className="infos-bucket">
                <li
                  onClick={() => {
                    setIsOpenEditFolder(true);
                    setEditingBucketId(bucket.id);
                  }}
                >
                  <i className="bx bxs-edit"></i>
                  <span>Modification du dossier</span>
                </li>
                <div className="separator"></div>
                <Modal
                  open={isOpenEditFolder}
                  onClose={() => setIsOpenEditFolder(false)}
                >
                  <form
                    className="form-modal"
                    onSubmit={(event) =>
                      handleEditSubmit(event, editingBucketId)
                    }
                  >
                    <h2>Modifier le dossier</h2>
                    <input
                      type="text"
                      name="label"
                      defaultValue={bucket.label}
                    />
                    <button type="submit">Modifier le document</button>
                  </form>
                </Modal>
                <li
                  onClick={() => {
                    setIsOpenDeleteFolder(true);
                    setDeletingBucketId(bucket.id);
                  }}
                >
                  <i className="bx bx-trash"></i>
                  <span>Suppression du dossier</span>
                </li>
                <Modal
                  open={isOpenDeleteFolder}
                  onClose={() => setIsOpenDeleteFolder(false)}
                >
                  <form
                    className="form-modal"
                    onSubmit={(event) => handleDeleteSubmit(deletingBucketId)}
                  >
                    <h2>Voulez-vous vraiment supprimer le dossier ?</h2>
                    <button onClick={() => setIsOpenDeleteFolder(false)}>
                      Annuler
                    </button>
                    <button type="submit">Supprimer</button>
                  </form>
                </Modal>
              </ul>
            </Popup>
          </li>
        ))}
      </ul>
      {isFileOver && (
        <div className="message-dragover">
          <p>Déposer des fichiers pour les importer dans :</p>
        </div>
      )}
    </>
  );
};

export default BucketList;
