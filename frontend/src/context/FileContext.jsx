import React, { createContext, useState } from "react";

export const FileContext = createContext();

export const FileProvider = ({ children }) => {
  const [files, setFiles] = useState([]);

  const addFile = (newFile) => {
    setFiles((prevFiles) => [newFile, ...prevFiles]);
  };

  return (
    <FileContext.Provider value={{ files, addFile }}>
      {children}
    </FileContext.Provider>
  );
};
