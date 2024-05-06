import React, { createContext, useContext, useState } from "react";
import { GetBucketList } from "../services/BucketService";

const BucketContext = createContext();

// Fournisseur de context

// Fournisseur de contexte
const BucketProvider = ({ children }) => {
  const [bucketList, setBucketList] = useState([]);

  useEffect(() => {
    getBucketList();
  }, []);

  const getBucketList = async () => {
    try {
      const response = await GetBucketList();
      setBucketList(response.data);
    } catch (error) {
      console.error("Erreur lors de la requête :", error);
    }
  };

  const createBucket = async (event) => {
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
    <DataContext.Provider value={{ getBucketList, createBucket }}>
      {children}
    </DataContext.Provider>
  );
};
