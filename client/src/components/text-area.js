import React, { useContext, useState, useEffect } from "react";
import NavBar from "./nav-bar";
import List from "./list";
import axios from "axios";
import InputField from "../common-styling/textarea";
import Lists from "../common-styling/list";
import { Divider } from "../../node_modules/semantic-ui-react";
import Image from "../common-styling/image";
import image from "../shopping-list.svg";
import { CredentialsContext } from "../components/app";
import Button from "react-bootstrap/Button";
import uuid from "react-uuid";
import Expiry from "./expiryCard";
import "./styles.css";

const TextArea = () => {
  const [credentials, setCredentials] = useContext(CredentialsContext);
  const [todoList, setTodoList] = useState([]);
  const [Todo, setTodoText] = useState("");
  const [edit, setEditText] = useState(false);
  const [editTodo, setEditTodo] = useState("");
  const [Index, setIndex] = useState(0);
  const [date, setDate] = useState("");

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

  const editText = (Todo, date) => {
    //For editing the text.

    setTodoText(Todo);
    setEditTodo(Todo);
    setDate(date);
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

    console.log(date);
    if (Todo === "" || date === "") {
      return alert("Input Field Or Date Field Is Empty");
    }

    if (edit === false) {
      const newItem = { Todo: Todo, Key: credentials.id, Date: date };
      console.log(newItem);
      const newTodoList = [...todoList, newItem];
      setTodoList(newTodoList);
      setTodoText("");
      setDate("");
      postTodo(newItem);
      return;
    } else {
      console.log(todoList);
      const updatedItem = {
        Todo: Todo,
        key: credentials.id,
        Date: date,
      };

      let todos = todoList;
      todos[Index] = updatedItem;
      setTodoList(todos);
      setTodoText("");
      setDate("");

      const token = localStorage.getItem("token");

      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };

      axios
        .post(
          `http://localhost:3000/updateList`,
          {
            Todo: Todo,
            EditTodo: editTodo,
          },
          config
        )
        .then(
          (response) => {
            console.log(credentials.id);
          },
          (error) => {
            console.log(error);
          }
        );
    }
    setEditText(false);
    return;
  };

  return (
    <div>
      <NavBar />
      <div className="animation">
        <h3
          style={{
            position: "absolute",
            top: "75px",
            left: "20px",
          }}
          className="heading"
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
          className="button"
          variant="success"
          type="submit"
          onClick={addItem}
        >
          {edit ? `Save Note` : `Add Note`}
        </Button>
        <input
          style={{
            height: "40px",
            width: "200px",
            backgroundColor: "#464a46",
            position: "absolute",
            top: "180px",
            left: "130px",
            borderRadius: "20px",
            padding: "20px",
            borderColor: "#9c9c9c",
          }}
          onChange={(el) => {
            setDate(el.target.value);
          }}
          type="datetime-local"
        />
      </div>

      <Lists>
        {todoList.map((items) => {
          console.log(items);
          let d1 = new Date(items.Date);
          console.log(d1);
          let d2 = new Date();
          console.log(d2);

          if (d2 >= d1 && d2.getTime() >= d1.getTime()) {
            return (
              <Expiry
                items={items}
                editText={editText}
                deleteText={deleteText}
              />
            );
          }
          return (
            <List
              key={uuid()}
              className="noteCard mx-4 my-4 "
              style={{ width: "700px", backgroundColor: "#3d3e40" }}
              items={items}
              editText={editText}
              deleteText={deleteText}
            />
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
