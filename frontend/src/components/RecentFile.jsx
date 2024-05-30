import React, { useContext, useEffect } from "react";
import { FileContext } from "../context/FileContext";
const RecentFile = () => {
  // Créer une méthode qui affiche les fichiers les plus récent
  // Mettre à jour celle-ci quand un nouveau fichier et présent
  // Rediriger vers les fichiers quand je clique dessus
  // Paginations 10 éléments par page
  // const test = useContext(FileContext);

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
              <th>Statut</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <p>John Doe</p>
              </td>
              <td>14-08-2023</td>
              <td>
                <span className="status">Completed</span>
              </td>
            </tr>
            <tr>
              <td>
                <p>John Doe</p>
              </td>
              <td>14-08-2023</td>
              <td>
                <span className="status">Pending</span>
              </td>
            </tr>
            <tr>
              <td>
                <p>John Doe</p>
              </td>
              <td>14-08-2023</td>
              <td>
                <span className="status">Processing</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentFile;
