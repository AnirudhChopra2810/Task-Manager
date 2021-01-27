import React from "react";
import NavBar from "./nav-bar";
import TextArea from "./text-area";

//app component
class App extends React.Component {
  render() {
    return (
      <div>
        <NavBar />
        <TextArea />
      </div>
    );
  }
}

export default App;
