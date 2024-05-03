import instance from "../api/http";

// Upload Fichier
export const AddFile = (data, bucketId) => {
  return instance.post(`files/save/${bucketId}`, data);
};
