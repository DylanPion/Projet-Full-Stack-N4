import React, { useEffect, useState } from "react";
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
  const [isOpenPopup, setIsOpenPopup] = useState(false);
  const [isOpenEditFolder, setIsOpenEditFolder] = useState(false);
  const [editingBucketId, setEditingBucketId] = useState(null); // État pour stocker l'ID du dossier en cours d'édition
  const [isOpenDeleteFolder, setIsOpenDeleteFolder] = useState(false);
  const [deletingBucketId, setDeletingBucketId] = useState(null);
  const [isFileOver, setIsFileOver] = useState(false); // Etat pour stocker si un fichier est survolé

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
      window.location.reload();
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
      console.log(formData);
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
            onDragLeave={handleDragLeave} // Ajouter le gestionnaire d'événement DragLeave
            className={isFileOver ? "file-over" : ""} // Utiliser l'état pour conditionner le style
          >
            <Link key={bucket.id} to={`/dashboard/file/${bucket.id}`}>
              <i className="bx bxs-folder"></i>
              <h3>{bucket.label}</h3>
            </Link>

            <i
              className="bx bx-dots-vertical-rounded"
              onClick={() => {
                setIsOpenPopup(true);
                setEditingBucketId(bucket.id); // Définir l'ID du dossier en cours de modification lors du clic sur l'icône
              }}
            ></i>
            <Popup open={isOpenPopup} onClose={() => setIsOpenPopup(false)}>
              <ul className="infos-bucket">
                <li onClick={() => setIsOpenEditFolder(true)}>
                  Modification du dossier
                </li>
                <Modal
                  open={isOpenEditFolder}
                  onClose={() => setIsOpenEditFolder(false)}
                >
                  <form
                    className="form-modal"
                    onSubmit={
                      (event) => handleEditSubmit(event, editingBucketId) // Passer l'ID du dossier en cours de modification à la fonction handleEditSubmit
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
                <li onClick={() => setIsOpenDeleteFolder(true)}>
                  Suppression du dossier
                </li>
                <Modal
                  open={isOpenDeleteFolder}
                  onClose={() => setIsOpenDeletingFolder(false)}
                >
                  <form
                    className="form-modal"
                    onSubmit={
                      (event) => handleDeleteSubmit(deletingBucketId) // Passer l'ID du dossier en cours de suppression à la fonction handleEditSubmit
                    }
                  >
                    <h2>Voulez vous vraiment supprimer le dossier ?</h2>
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
