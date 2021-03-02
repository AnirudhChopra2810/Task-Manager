import { React, useContext } from "react";
import Background from "../common-styling/background";
import Button from "react-bootstrap/Button";
import { CredentialsContext } from "../components/app";

const NavBar = () => {
  const [, setCredentials] = useContext(CredentialsContext);
  const logout = () => {
    setCredentials(null);
    localStorage.clear();
  };

  return (
    <nav
      className="navbar navbar-expand-lg navbar-dark "
      style={{ backgroundColor: "#403f3d", height: "50px" }}
    >
      <h1
        className="navbar-brand "
        style={{ position: "absolute", top: "12px" }}
      >
        Task Manager
      </h1>
      <Button
        variant="secondary"
        type="submit"
        style={{ position: "absolute", right: "30px", height: "30px" }}
        onClick={logout}
      >
        Log Out
      </Button>
    </nav>
  );
};

export default NavBar;
