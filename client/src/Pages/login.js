import React, { useContext, useState } from "react";
import Registration from "../common-styling/register";
import axios from "axios";
import { useHistory } from "react-router-dom";
import "../Pages/styles.css";
import { CredentialsContext } from "../components/app";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./styles.css";

const Login = () => {
  const [Email, setUsername] = useState("");
  const [Password, setPassword] = useState("");
  const [credentials, setCredentials] = useContext(CredentialsContext);
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

        localStorage.setItem("token", JSON.stringify(response.data.token));
        localStorage.setItem("id", JSON.stringify(response.data.id));
        setCredentials({
          id: response.data.id,
        });
        history.push("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="container">
      <div className="welcome">
        <h1>Welcome To Login Page</h1>
      </div>
      <div className="title">
        <h3>Login</h3>
      </div>
      <Form onSubmit={Login}>
        <Form.Group controlId="formBasicEmail">
          <Form.Label
            style={{ color: "#8f8989", fontFamily: "Arial, sans-serif" }}
          >
            {" "}
            Email Address
          </Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            onChange={(el) => setUsername(el.target.value)}
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label
            style={{ color: "#8f8989", fontFamily: "Arial, sans-serif" }}
          >
            Password
          </Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            onChange={(el) => setPassword(el.target.value)}
          />
        </Form.Group>

        <Button variant="success" type="submit">
          Login
        </Button>
      </Form>
    </div>
  );
};

export default Login;
