import React, { useEffect, useReducer } from "react";
import {
  DeleteBucket,
  GetBucketList,
  UpdateBucket,
} from "../services/BucketService";
import { AddFile } from "../services/FileService";
import Popup from "./Popup";
import Modal from "./Modal";
import Toast from "./Toast";
import { Link } from "react-router-dom";

const initialState = {
  bucketList: [],
  openBucketId: null,
  isOpenEditFolder: false,
  editingBucketId: null,
  isOpenDeleteFolder: false,
  deletingBucketId: null,
  isFileOver: false,
  toastOpen: false,
  toastMessage: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "SET_BUCKET_LIST":
      return { ...state, bucketList: action.payload };
    case "SET_OPEN_BUCKET_ID":
      return { ...state, openBucketId: action.payload };
    case "SET_IS_OPEN_EDIT_FOLDER":
      return { ...state, isOpenEditFolder: action.payload };
    case "SET_EDITING_BUCKET_ID":
      return { ...state, editingBucketId: action.payload };
    case "SET_IS_OPEN_DELETE_FOLDER":
      return { ...state, isOpenDeleteFolder: action.payload };
    case "SET_DELETING_BUCKET_ID":
      return { ...state, deletingBucketId: action.payload };
    case "SET_IS_FILE_OVER":
      return { ...state, isFileOver: action.payload };
    case "SET_TOAST_OPEN":
      return { ...state, toastOpen: action.payload };
    case "SET_TOAST_MESSAGE":
      return { ...state, toastMessage: action.payload };
    default:
      return state;
  }
}

const BucketList = ({ onDragOver, onDragLeave }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Récupère la liste des Buckets
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await GetBucketList();
        dispatch({ type: "SET_BUCKET_LIST", payload: response.data });
      } catch (error) {
        console.error("Erreur lors de la requête :", error);
        setToastMessage("Erreur lors de la récupération des données");
        setToastOpen(true);
      }
    };
    fetchData();
  }, []);

  // Modification du Bucket
  const handleEditSubmit = async (event, bucketId) => {
    event.preventDefault();
    try {
      const formData = new FormData(event.target);
      const data = Object.fromEntries(formData.entries());
      await UpdateBucket(data, bucketId);
      dispatch({ type: "SET_IS_OPEN_EDIT_FOLDER", payload: false });
      dispatch({ type: "SET_TOAST_MESSAGE", payload: "bucketEdit" });
      dispatch({ type: "SET_TOAST_OPEN", payload: true });
      const updatedBucketList = state.bucketList.map((bucket) =>
        bucket.id === bucketId ? { ...bucket, ...data } : bucket
      );
      dispatch({ type: "SET_BUCKET_LIST", payload: updatedBucketList });
    } catch (error) {
      console.error("Erreur lors de la modification du bucket :", error);
    }
  };

  // Suppression du Bucket
  const handleDeleteSubmit = async (bucketId) => {
    try {
      await DeleteBucket(bucketId);
      dispatch({ type: "SET_IS_OPEN_DELETE_FOLDER", payload: false });
      dispatch({ type: "SET_TOAST_MESSAGE", payload: "bucketDelete" });
      dispatch({ type: "SET_TOAST_OPEN", payload: true });
      const updatedBucketList = state.bucketList.filter(
        (bucket) => bucket.id !== bucketId
      );
      dispatch({ type: "SET_BUCKET_LIST", payload: updatedBucketList });
    } catch (error) {
      console.error("Erreur lors de la suppression du bucket :", error);
    }
  };

  // Début gesion Drag And Drop du Fichier
  const handleDrop = async (event, bucketId) => {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append("file", event.dataTransfer.files[0]);
      await AddFile(formData, bucketId);
      onDragLeave(); // Quitte le drag and drop pour enlever le style drag car le fichier est sauvegatder
      dispatch({ type: "SET_IS_FILE_OVER", payload: false });
      dispatch({ type: "SET_TOAST_MESSAGE", payload: "fileCreate" });
      dispatch({ type: "SET_TOAST_OPEN", payload: true });
    } catch (error) {
      console.error("Erreur lors du glisser-déposer des fichiers :", error);
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    dispatch({ type: "SET_IS_FILE_OVER", payload: true });
    console.log("1");
    if (onDragOver) {
      onDragOver();
    }
  };

  const handleDragLeave = () => {
    dispatch({ type: "SET_IS_FILE_OVER", payload: false });
    console.log("2");
    if (onDragLeave) {
      onDragLeave();
    }
  };
  // Fin gesion Drag And Drop du Fichier

  const togglePopup = (bucketId) => {
    dispatch({
      type: "SET_OPEN_BUCKET_ID",
      payload: bucketId === state.openBucketId ? null : bucketId,
    });
  };

  return (
    <>
      <div className="bucket-list-title">
        <h1>Mon drive</h1>
      </div>
      <ul className="bucketList">
        {state.bucketList.map((bucket) => (
          <li
            key={bucket.id}
            onDrop={(event) => handleDrop(event, bucket.id)}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            className={`link ${state.isFileOver ? "file-over" : ""}`}
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
              open={state.openBucketId === bucket.id}
              onClose={() =>
                dispatch({ type: "SET_OPEN_BUCKET_ID", payload: null })
              }
              style="popup-bucket"
            >
              <ul className="infos-bucket">
                <li
                  onClick={() => {
                    dispatch({
                      type: "SET_IS_OPEN_EDIT_FOLDER",
                      payload: true,
                    });
                    dispatch({
                      type: "SET_EDITING_BUCKET_ID",
                      payload: bucket.id,
                    });
                  }}
                >
                  <i className="bx bxs-edit"></i>
                  <span>Modification du dossier</span>
                </li>
                <div className="separator"></div>
                <Modal
                  open={state.isOpenEditFolder}
                  onClose={() =>
                    dispatch({
                      type: "SET_IS_OPEN_EDIT_FOLDER",
                      payload: false,
                    })
                  }
                >
                  <form
                    className="form-modal"
                    onSubmit={(event) =>
                      handleEditSubmit(event, state.editingBucketId)
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
                    dispatch({
                      type: "SET_IS_OPEN_DELETE_FOLDER",
                      payload: true,
                    });
                    dispatch({
                      type: "SET_DELETING_BUCKET_ID",
                      payload: bucket.id,
                    });
                  }}
                >
                  <i className="bx bx-trash"></i>
                  <span>Suppression du dossier</span>
                </li>
                <Modal
                  open={state.isOpenDeleteFolder}
                  onClose={() =>
                    dispatch({
                      type: "SET_IS_OPEN_DELETE_FOLDER",
                      payload: false,
                    })
                  }
                >
                  <form
                    className="form-modal"
                    onSubmit={(event) =>
                      handleDeleteSubmit(state.deletingBucketId)
                    }
                  >
                    <h2>Voulez-vous vraiment supprimer le dossier ?</h2>
                    <button type="submit">Supprimer</button>
                    <button
                      onClick={() =>
                        dispatch({
                          type: "SET_IS_OPEN_DELETE_FOLDER",
                          payload: false,
                        })
                      }
                    >
                      Annuler
                    </button>
                  </form>
                </Modal>
              </ul>
            </Popup>
          </li>
        ))}
      </ul>
      {state.isFileOver && (
        <div className="message-dragover">
          <p>Déposer des fichiers pour les importer dans :</p>
        </div>
      )}
      <Toast
        open={state.toastOpen}
        onClose={() => dispatch({ type: "SET_TOAST_OPEN", payload: false })}
        toast={state.toastMessage}
      />
    </>
  );
};

export default BucketList;
