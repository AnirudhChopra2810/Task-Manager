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
  const [credentials, setCredentials] = useContext(CredentialsContext);
  const [todoList, setTodoList] = useState([]);
  const [Todo, setTodoText] = useState("");
  const [edit, setEditText] = useState(false);
  const [editId] = useState(0);
  const [Index, setIndex] = useState(0);

  useEffect(async () => {
    const url = `http://localhost:3000/getList`;

    const token = localStorage.getItem("token");
    console.log(token);

    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    if (todoList === undefined) {
      setTodoList([]);
    } else {
      let todoList = await axios.get(url, config).then((res) => {
        console.log(res.data.id);
        setCredentials({ id: res.data.id });
        setTodoList(res.data.Todo);
      });
    }
  }, []);

  const deleteText = (Todo) => {
    console.log(Todo);

    todoList.map((items) => {
      if (Todo === items.Todo) {
        setTodoList(
          todoList.filter((data) => {
            return data.Todo !== Todo;
          })
        );

        const token = localStorage.getItem("token");

        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        axios
          .post(
            `http://localhost:3000/DeleteList`,
            {
              Key: credentials.id,
              Todo: items.Todo,
            },
            config
          )
          .then(
            (response) => {
              console.log(response.data);
            },
            (error) => {
              console.log(error);
            }
          );
      }
    });

    alert("Successfully Deleted");
  };

  const editText = (Todo) => {
    //For editing the text.

    setTodoText(Todo);

    setEditText(true);
    todoList.map((items) => {
      if (Todo === items.Todo) {
        setIndex(
          todoList.findIndex((items) => {
            return items.Todo === Todo;
          })
        );
      }
    });
  };

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

  const addItem = (e) => {
    e.preventDefault();
    //for adding new card.

    if (!Todo) {
      return alert("Input Field Or Date Field Is Empty");
    }

    if (edit === false) {
      console.log("i worked");

      const newItem = { Todo: Todo, Key: credentials.id };
      console.log(newItem);
      const newTodoList = [...todoList, newItem];
      setTodoList(newTodoList);
      setTodoText("");
      postTodo(newItem);
      return;
    } else {
      if (Todo !== "") {
        console.log(todoList);
        const updatedItem = {
          Todo: Todo,
          key: credentials.id,
        };

        let todos = todoList;
        todos[Index] = updatedItem;
        setTodoList(todos);
        setTodoText("");

        const token = localStorage.getItem("token");

        const config = {
          headers: { Authorization: `Bearer ${token}` },
        };

        axios
          .post(`http://localhost:3000/updateList`, updatedItem, config)
          .then(
            (response) => {
              console.log(credentials.id);
            },
            (error) => {
              console.log(error);
            }
          );
      } else {
        alert("Input Field Or Date Field Is Empty");
      }
      setEditText(false);
    }
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

      <div>
        <Button
          style={{
            height: "40px",
            width: "100px",
            position: "absolute",
            top: "180px",
            left: "20px",
          }}
          type="submit"
          variant="secondary"
          onClick={addItem}
        >
          {edit ? `Save Note` : `Add Note`}
        </Button>
      </div>

      <Lists>
        {todoList.map((items) => {
          console.log(items);
          return (
            <Card
              key={uuid()}
              className="noteCard mx-4 my-4 "
              style={{ width: "700px", backgroundColor: "#3d3e40" }}
              name={Todo}
            >
              <Card.Body>
                <Card.Title style={{ color: "white" }}>Note</Card.Title>
                <hr />
                <Card.Text style={{ color: "white" }}>{items.Todo}</Card.Text>

                <Button
                  variant="secondary"
                  onClick={(e) => {
                    e.preventDefault();
                    let name = items.Todo;
                    deleteText(name);
                  }}
                >
                  Delete
                </Button>
                <Button
                  variant="secondary mx-3"
                  style={{ width: "70px" }}
                  onClick={(e) => {
                    e.preventDefault();
                    let name = items.Todo;
                    editText(name);
                  }}
                >
                  Edit
                </Button>
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

export default TextArea;
