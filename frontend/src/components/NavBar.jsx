import React from "react";
import logo from "../assets/logo.png";

const NavBar = () => {
  return (
    <nav>
      <form action="#">
        <div className="form-input">
          <input type="search" placeholder="Rechercher dans le drive.." />
          <button className="search-btn" type="submit">
            <i className="bx bx-search"></i>
          </button>
        </div>
      </form>
      <input type="checkbox" id="theme-toggle" hidden />
      <a href="#" className="notif">
        <i className="bx bx-bell"></i>
        <span className="count">12</span>
      </a>
      <a href="#" className="profile">
        <img src={logo} alt="profile" />
      </a>
    </nav>
  );
};

export default NavBar;
