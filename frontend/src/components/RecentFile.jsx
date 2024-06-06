import React, { useEffect, useState } from "react";
import { GetRecentFileList } from "../services/FileService";
const RecentFile = () => {
  const [recentFileList, setRecentFileList] = useState([]);
  useEffect(() => {
    const getRecentFileList = async () => {
      try {
        const responseRecentFileList = await GetRecentFileList();
        setRecentFileList(responseRecentFileList.data);
        console.log(responseRecentFileList.data);
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des fichiers récent :",
          error
        );
      }
    };

    getRecentFileList();
  }, []);

  // Fonction pour formater la date au format "DD-MM-YYYY"
  const formatDate = (dateTimeString) => {
    const dateTime = new Date(dateTimeString);
    return `${dateTime.getDate().toString().padStart(2, "0")}-${(
      dateTime.getMonth() + 1
    )
      .toString()
      .padStart(2, "0")}-${dateTime.getFullYear()}`;
  };

  // Fonction pour formater l'heure au format "HH:MM:SS"
  const formatTime = (dateTimeString) => {
    const dateTime = new Date(dateTimeString);
    return `${dateTime.getHours().toString().padStart(2, "0")}:${dateTime
      .getMinutes()
      .toString()
      .padStart(2, "0")}:${dateTime.getSeconds().toString().padStart(2, "0")}`;
  };

  return (
    <div className="recent-file">
      <div className="orders">
        <div className="header">
          <i className="bx bx-receipt"></i>
          <h3>Fichier récent</h3>
          <i className="bx bx-filter"></i>
          <i className="bx bx-search"></i>
        </div>
        <table>
          <thead>
            <tr>
              <th>Nom du fichier</th>
              <th>Date</th>
              <th>Heure</th>
              <th>Version</th>
            </tr>
          </thead>
          <tbody>
            {recentFileList.map((file) => (
              <tr key={file.id}>
                <td>{file.fileName}</td>
                <td>{formatDate(file.localDateTime)}</td>
                <td>{formatTime(file.localDateTime)}</td>
                <td>{file.version}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentFile;
