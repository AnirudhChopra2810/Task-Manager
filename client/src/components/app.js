import React, { useState } from "react";
import NavBar from "./nav-bar";
import TextArea from "./text-area";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Register from "../Pages/register";
import Login from "../Pages/login";
import Welcome from "../Pages/welcome";
export const CredentialsContext = React.createContext();

//app component
const App = () => {
  let login = localStorage.getItem("login");
  const credentialsState = useState(login);

  return (
    <div>
      <CredentialsContext.Provider value={credentialsState}>
        <Router>
          <Switch>
            <Route exact path="/register">
              <Register />
            </Route>
            <Route exact path="/login">
              <Login />
            </Route>
            <Route exact path="/">
              <Welcome />
            </Route>
          </Switch>
        </Router>
      </CredentialsContext.Provider>
    </div>
  );
};

export default App;
