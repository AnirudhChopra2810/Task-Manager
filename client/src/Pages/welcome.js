import react, { useContext } from "react";
import { Link } from "react-router-dom";
import Center from "../common-styling/center";
import { CredentialsContext } from "../components/app";
import TextArea from "../components/text-area";

export default function Welcome() {
  const [credentials, setCredentials] = useContext(CredentialsContext);
  return (
    <div>
      <Center>
        {!credentials && <h1> Welcome</h1>}
        {!credentials && (
          <Link
            to="/register"
            style={{ position: "absolute", right: "35px", top: "60px" }}
          >
            Register
          </Link>
        )}
        <br />
        {!credentials && (
          <Link
            to="/login"
            style={{ position: "absolute", right: "45px", top: "90px" }}
          >
            Login
          </Link>
        )}
      </Center>
      {credentials && <TextArea />}
    </div>
  );
}
