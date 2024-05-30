import instance from "../api/http";

// Upload Fichier
export const AddFile = (data, bucketId) => {
  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };
  return instance.post(`files/save/${bucketId}`, data, config);
};

export const GetFileList = (bucketId) => {
  return instance.get(`files/${bucketId}`);
};
