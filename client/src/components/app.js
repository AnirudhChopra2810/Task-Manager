import React from "react";
import NavBar from "./nav-bar";
import TextArea from "./text-area";

// fetch("http://localhost:3001/getList")
//   .then((data) => data.json())
//   .then((json) => {
//     todos = json.data;
//   })
//   .catch((error) => console.log(error));

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
