import React, { useContext, useState } from "react";
import Registration from "../common-styling/register";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { CredentialsContext } from "../components/app";

const Login = () => {
  const [Email, setUsername] = useState("");
  const [Password, setPassword] = useState("");
  const [, setCredentials] = useContext(CredentialsContext);
  const history = useHistory();

  const Login = (e) => {
    e.preventDefault();
    axios
      .post(`http://localhost:3000/logIn`, { Email, Password })
      .then((response) => {
        alert("You are successfully LoggedIn");
        console.log(response.data);
        localStorage.setItem(
          "login",
          JSON.stringify({ Email: Email, Password: Password })
        );
        setCredentials({
          Email: Email,
          Password: Password,
          id: response.data.id,
        });
        history.push("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Registration>
      <h3> Login Here </h3>
      <form onSubmit={Login}>
        <input
          placeholder="Email"
          name="Email"
          onChange={(el) => setUsername(el.target.value)}
        />
        <br />
        <input
          type="password"
          placeholder="password"
          name="Password"
          onChange={(el) => setPassword(el.target.value)}
        />
        <br />
        <button type="submit">Login</button>
      </form>
    </Registration>
  );
};

export default Login;
