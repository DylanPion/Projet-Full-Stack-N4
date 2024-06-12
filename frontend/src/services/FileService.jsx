import instance from "../api/http";

export const AddFile = (data, bucketId) => {
  const config = {
    headers: {
      "Content-Type": "multipart/form-data", // Indique le type de média du fichier envoyé
    },
  };
  return instance.post(`files/save/${bucketId}`, data, config);
};

export const DeleteFile = (fileId) => {
  return instance.delete(`files/${fileId}`);
};

export const GetFileList = (bucketId) => {
  return instance.get(`files/${bucketId}`);
};

export const GetRecentFileList = () => {
  return instance.get("files/recent");
};

/*
Transfer-Encoding: chunked est automatiquement géré par Axios et le navigateur lors du téléchargement de fichiers en utilisant multipart/form-data.En utilisant multipart/form-data. Les en-têtes Content-Length et Transfer-Encoding
*/
