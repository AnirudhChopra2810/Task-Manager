import react, { useContext } from "react";
import { Link } from "react-router-dom";
import Center from "../common-styling/center";
import { CredentialsContext } from "../components/app";
import TextArea from "../components/text-area";

export default function Welcome() {
  const [credentials, setCredentials] = useContext(CredentialsContext);
  console.log(credentials);
  const token = localStorage.getItem("token");

  return (
    <div>
      <Center>
        {token === null && <h1> Welcome</h1>}
        {token === null && (
          <Link
            to="/register"
            style={{ position: "absolute", right: "35px", top: "60px" }}
          >
            Register
          </Link>
        )}
        <br />
        {token === null && (
          <Link
            to="/login"
            style={{ position: "absolute", right: "45px", top: "90px" }}
          >
            Login
          </Link>
        )}
      </Center>
      {token && <TextArea />}
    </div>
  );
}
