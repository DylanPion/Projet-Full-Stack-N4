import React from "react";

const BottomData = () => {
  return (
    <div className="bottom-data">
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
                <span className="status completed">Completed</span>
              </td>
            </tr>
            <tr>
              <td>
                <p>John Doe</p>
              </td>
              <td>14-08-2023</td>
              <td>
                <span className="status pending">Pending</span>
              </td>
            </tr>
            <tr>
              <td>
                <p>John Doe</p>
              </td>
              <td>14-08-2023</td>
              <td>
                <span className="status process">Processing</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BottomData;
