import React from "react";
import Background from "../common-styling/background";

const NavBar = () => {
  return (
    <nav
      className="navbar navbar-expand-lg navbar-dark "
      style={{ backgroundColor: "#403f3d" }}
    >
      <h1 className="navbar-brand mx-4 ">Task Manager</h1>
    </nav>
  );
};

export default NavBar;
