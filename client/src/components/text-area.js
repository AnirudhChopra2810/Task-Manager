import React, { useContext, useState, useEffect } from "react";
import NavBar from "./nav-bar";
import axios from "axios";
import InputField from "../common-styling/textarea";
import Buttons from "../common-styling/button";
import Lists from "../common-styling/list";
import { Divider } from "../../node_modules/semantic-ui-react";
import Image from "../common-styling/image";
import image from "../shopping-list.svg";
import { CredentialsContext } from "../components/app";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import uuid from "react-uuid";

const TextArea = () => {
  const [credentials] = useContext(CredentialsContext);
  const [todoList, setTodoList] = useState([]);
  const [Todo, setTodoText] = useState("");
  const [Key, setKey] = useState(credentials.id);

  useEffect(async () => {
    const url = `http://localhost:3000/getList`;

    const token = localStorage.getItem("token");
    console.log(token);

    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    const bodyParameters = {
      key: credentials.id,
    };

    console.log("i worked 4");

    if (todoList === undefined) {
      setTodoList([]);
    } else {
      let todoList = await axios.get(url, config).then((res) => {
        setTodoList(res.data.Todo);
      });
    }
  }, []);

  // deleteText = (Key) => {
  //   let todos = this.state.todoList;
  //   todos.map((items) => {
  //     if (Key === items.Key) {
  //       this.setState({
  //         todoList: todos.filter((data) => {
  //           return data.Key !== Key;
  //         }),
  //       });
  //       // axios.post(`http://localhost:3000/deleteList`, { Key: items.Key }).then(
  //       //   (response) => {
  //       //     console.log(response.data);
  //       //   },
  //       //   (error) => {
  //       //     console.log(error);
  //       //   }
  //       // );
  //     }
  //   });

  //   alert("Successfully Deleted");
  //   console.log(this.state.todoList);
  // };

  // editText = (key, text, date) => {
  //   this.setState({
  //     Todo: text,
  //     Date: date,
  //     Key: key,
  //     editText: true,
  //   });
  // };

  const postTodo = (newItem) => {
    const token = localStorage.getItem("token");

    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    axios.post(`http://localhost:3000/addList`, newItem, config).then(
      (response) => {
        console.log(credentials.id);
      },
      (error) => {
        console.log(error);
      }
    );
  };

  const logout = () => {
    localStorage.clear();
  };

  const addItem = (event) => {
    event.preventDefault();

    //for adding new card.

    if (!Todo) {
      return alert("Input Field Or Date Field Is Empty");
    }

    console.log("i worked");

    const newItem = { Todo: Todo, Key: credentials.id };
    console.log(newItem);
    const newTodoList = [...todoList, newItem];
    setTodoList(newTodoList);
    setTodoText("");
    postTodo(newItem);
  };

  return (
    <div>
      <NavBar />
      <div>
        <h3
          style={{
            color: "grey",
            position: "absolute",
            top: "75px",
            left: "20px",
          }}
        >
          Add Your Notes Here!!
        </h3>
      </div>
      <div className="form-group">
        <InputField
          value={Todo}
          className="form-control"
          placeholder="--> Write Something... <--"
          onChange={(el) => {
            setTodoText(el.target.value);
          }}
        ></InputField>
      </div>
      <Buttons type="submit" onClick={addItem}>
        {/* {this.state.editText ? `Save Note` : */} Add Note
      </Buttons>
      <Buttons onClick={logout}>
        {/* {this.state.editText ? `Save Note` : */} Logout
      </Buttons>

      <Lists>
        {todoList.map((items) => {
          console.log(items);
          return (
            <Card
              key={uuid()}
              className="noteCard mx-4 my-4 "
              style={{ width: "700px", backgroundColor: "#a6a6a6" }}
            >
              <Card.Body>
                <Card.Title>Note</Card.Title>
                <hr />
                <Card.Text>{items.Todo}</Card.Text>

                <Button variant="primary">Delete</Button>
                <Button variant="primary mx-2">Edit</Button>
              </Card.Body>
            </Card>
          );
        })}
      </Lists>

      <Divider
        vertical
        style={{
          color: "grey",
          position: "absolute",
          height: "290px",
          left: "450px",
          top: "55%",
          bottom: "40%",
        }}
      >
        <Image
          src={image}
          style={{
            height: "40px",
            position: "relative",
            left: "1px",
            top: "-20px",
          }}
        />
      </Divider>
    </div>
  );
};

// delete={this.deleteText} edit={this.editText}

// {/* <button
//           className="btn btn-primary my-2"
//           type="submit"
//           onClick={this.addItem}
//         >
//           {this.state.editText ? `Save Note` : `Add Note`}
//         </button> */}
//           {/* <input
//           className="dateTime mx-2"
//           name="date"
//           type="datetime-local"
//           id="myDate"
//           value={this.state.date}
//           onChange={this.handleInput}
//         ></input> */}

//   //For editing the text.
//   if (this.state.editText === true) {
//     if (this.state.text !== "") {
//       let todos = this.state.todoList;
//       todos.map((items) => {
//         if (this.state.key === items.key) {
//           const updatedItem = {
//             Todo: this.state.Todo,
//             Date: this.state.Date,
//             Key: this.state.Key,
//           };
//           let indexOf = todos.findIndex((items) => {
//             return items.Key === this.state.Key;
//           });
//           todos[indexOf] = updatedItem;

//           this.setState({
//             todoList: todos,
//             editText: false,
//           });

//
//         }
//       });
//     } else {
//       alert("Input Field Or Date Field Is Empty");
//     }
//   } else

export default TextArea;
