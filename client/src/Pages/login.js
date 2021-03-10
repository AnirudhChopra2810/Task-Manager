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
  const [error, setError] = useState("");
  const [credentials, setCredentials] = useContext(CredentialsContext);
  const history = useHistory();

  const Login = (e) => {
    e.preventDefault();

    if (Email === "" || Password === "") {
      alert("Username Or Password Field Cannot Be Empty");
      return;
    }

    axios
      .post(`http://localhost:3000/logIn`, { Email, Password })
      .then((response) => {
        // if (!response) {
        //   alert("wtf");
        //   return;
        //   // const { message } = await response.json();
        //   // throw Error(message);
        // }

        console.log(response);

        localStorage.setItem("token", JSON.stringify(response.data.token));
        localStorage.setItem("id", JSON.stringify(response.data.id));
        setCredentials({
          token: response.data.token,
        });
        history.push("/");
      })
      .catch((error) => {
        alert("username or password invalid");
        console.log(error);
        setError(error.message);
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
