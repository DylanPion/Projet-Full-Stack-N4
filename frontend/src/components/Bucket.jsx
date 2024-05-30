import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { GetBucketById } from "../services/BucketService";
import { GetFileList } from "../services/FileService";

const Bucket = () => {
  const [bucket, setBucket] = useState({});
  const [fileList, setFileList] = useState([]);
  const { bucketId } = useParams();

  useEffect(() => {
    const getData = async (bucketId) => {
      try {
        const responseBucket = await GetBucketById(bucketId);
        const responseFileList = await GetFileList(bucketId);
        setBucket(responseBucket.data);
        setFileList(responseFileList.data);
        console.log(responseFileList.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des fichiers :", error);
      }
    };

    getData(bucketId);
  }, [bucketId]);

  // Fonction pour obtenir l'icône en fonction du type de fichier
  const getFileIcon = (fileName) => {
    const extension = fileName.split(".").pop(); // Récupère l'extension du fichier
    console.log(extension);
    switch (extension.toLowerCase()) {
      case "pdf":
        return <i className="bx bxs-file-pdf"></i>;
      case "doc":
        return <i className="bx bxs-file-doc"></i>;
      case "html":
        return <i className="bx bxs-file-html"></i>;
      case "css":
        return <i className="bx bxs-file-css"></i>;
      case "js":
        return <i className="bx bxs-file-js"></i>;
      case "json":
        return <i className="bx bxs-file-json"></i>;
      case "md":
        return <i className="bx bxs-file-md"></i>;
      case "txt":
        return <i className="bx bxs-file-txt"></i>;
      case "png":
        return <i className="bx bxs-file-png"></i>;
      case "jpg":
        return <i className="bx bxs-file-jpg"></i>;
      default:
        return <i className="bx bxs-file"></i>;
    }
  };

  return (
    <main>
      <div className="file-title">
        <h1>
          <Link to={`/dashboard/drive`}>Mon drive</Link>
          <span>&gt;</span> {bucket.label}
        </h1>
      </div>
      <div className="files-grid">
        {fileList.map((file) => (
          <div className="file-item" key={file.id}>
            {getFileIcon(file.label)}{" "}
            {/* Affiche l'icône en fonction du type de fichier */}
            <h3>{file.fileName.split(".").slice(0, -1).join(".")}</h3>
            {/* Affiche le nom du fichier sans l'extension */}
            <i className="bx bx-dots-vertical-rounded"></i>
          </div>
        ))}
      </div>
    </main>
  );
};

export default Bucket;
