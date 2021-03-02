import React, { useContext, useState } from "react";
import Registration from "../common-styling/register";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { CredentialsContext } from "../components/app";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./styles.css";

const Register = () => {
  const [Email, setUsername] = useState("");
  const [Password, setPassword] = useState("");
  const [, setCredentials] = useContext(CredentialsContext);

  const register = (e) => {
    e.preventDefault();
    if (Email === "" && Password === "") {
      alert("Email Or Password Field Cannot Be Empty!!  ");
      return;
    }
    axios
      .post(`http://localhost:3000/signUp`, {
        Email: Email,
        Password: Password,
      })
      .then((response) => {
        alert("You are successfully registered");

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
    <div className="container">
      <div className="title">
        <h3>Register</h3>
      </div>
      <Form onSubmit={register}>
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

        <Button variant="secondary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default Register;

{
  /* <form onSubmit={register}>
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
</form> */
}
