import React from "react";
import SideBar from "../components/SideBar";
import NavBar from "../components/NavBar";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <SideBar />
      <div className="content">
        <NavBar />
      </div>
      <div className="outlet">
        <Outlet />
      </div>
    </>
  );
};

export default Layout;
