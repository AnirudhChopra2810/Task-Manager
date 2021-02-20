import React, { useContext, useState } from "react";
import Registration from "../common-styling/register";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { CredentialsContext } from "../components/app";

const Register = () => {
  const [Email, setUsername] = useState("");
  const [Password, setPassword] = useState("");
  const [, setCredentials] = useContext(CredentialsContext);

  const register = (e) => {
    e.preventDefault();
    axios
      .post(`http://localhost:3000/signUp`, {
        Email: Email,
        Password: Password,
      })
      .then((response) => {
        alert("You are successfully registered");
        localStorage.setItem(
          "login",
          JSON.stringify({ Email: Email, Password: Password })
        );

        localStorage.setItem("token", JSON.stringify(response.data.token));

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

  const history = useHistory();

  return (
    <Registration>
      <h3> Register Here </h3>
      <form onSubmit={register}>
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
        <button type="submit">Register</button>
      </form>
    </Registration>
  );
};

export default Register;
