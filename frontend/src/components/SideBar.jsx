import React from "react";

const SideBar = () => {
  return (
    <div className="sidebar">
      <a href="#" className="logo">
        <i className="bx bx-code-alt"></i>
        <div className="logo-name">
          <span>Next-u</span> Drive
        </div>
      </a>
      <ul className="side-menu">
        <li>
          <a href="/dashboard">
            <i className="bx bx-home"></i>Accueil
          </a>
        </li>
        <li>
          <a href="#">
            <i className="bx bx-hdd"></i>Mon drive
          </a>
        </li>
        <li className="active">
          <a href="#">
            <i className="bx bx-group"></i>Partagés avec moi
          </a>
        </li>
        <li>
          <a href="#">
            <i className="bx bx-trash"></i>Corbeile
          </a>
        </li>
        <li>
          <a href="#">
            <i className="bx bx-cog"></i>Paramètre
          </a>
        </li>
        <li>
          <a href="#">
            <i className="bx bx-cloud"></i>Espace de stockage
          </a>
        </li>
      </ul>
      <ul className="side-menu">
        <li>
          <a href="#" className="logout">
            <i className="bx bx-log-out-circle"></i>
            Logout
          </a>
        </li>
      </ul>
    </div>
  );
};

export default SideBar;
