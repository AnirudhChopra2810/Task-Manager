import React from "react";
import Cards from "./cards";
import axios from "axios";

class TextArea extends React.Component {
  state = {
    todoList: [],
    text: "",
    date: "",
    key: Date.now(),
    editText: false,
  };

  async componentDidMount() {
    const api = axios.create({
      baseURL: `http://localhost:3000/getList`,
    });

    let todoList = await api.get(`/`).then((res) => res.data);
    console.log(todoList.data);
    this.setState({
      todoList: todoList.data,
    });
  }

  handleInput = (e) => {
    console.log(this.state.todoList);
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  deleteText = (key) => {
    let todos = this.state.todoList;
    todos.map(async (items) => {
      if (key === items.key) {
        await this.setState({
          todoList: todos.filter((data) => {
            return data.key !== key;
          }),
        });
      }
      console.log(this.state.todoList);
      this.postData();
    });
    alert("Successfully Deleted");
    console.log(this.state.todoList);
  };

  editText = (key, text, date) => {
    this.setState({
      text: text,
      date: date,
      key: key,
      editText: true,
    });
  };

  addItem = (event) => {
    console.log(this.state.key);

    //For editing the text.
    if (this.state.editText === true) {
      if (this.state.text !== "" && this.state.date !== "") {
        let todos = this.state.todoList;
        todos.map((items) => {
          if (this.state.key === items.key) {
            const updatedItem = {
              text: this.state.text,
              date: this.state.date,
              key: this.state.key,
            };
            let indexOf = todos.findIndex((items) => {
              return items.key === this.state.key;
            });
            todos[indexOf] = updatedItem;

            this.setState({
              todoList: todos,
              editText: false,
            });
            this.postData();
          }
        });
      } else {
        alert("Input Field Or Date Field Is Empty");
      }
    } else {
      //for adding new card.
      if (this.state.text !== "" && this.state.date) {
        const newItem = {
          text: this.state.text,
          date: this.state.date,
          key: this.state.key,
        };

        this.setState({
          todoList: [...this.state.todoList, newItem],
          text: "",
          date: "",
          key: Date.now(),
        });
        console.log(this.state.todoList);

        console.log("i worked");
      } else {
        alert("Input Field Or Date Field Is Empty");
      }
    }
    event.preventDefault();
  };

  postData = () => {
    console.log(this.state.todoList);
    let todos = this.state.todoList;
    console.log(todos);
    axios
      .post(`http://localhost:3000/addList`, {
        todoList: this.state.todoList,
      })
      .then(
        (response) => {
          console.log(response.data);
        },
        (error) => {
          console.log(error);
        }
      );
  };

  render() {
    return (
      <div className="contaner my-4">
        <h1 className="headText mx-3">Welcome To Task Manager</h1>
        <div className="cardContainer" id="addCard">
          <div className="card-body my-4">
            <h5 className="card-title ">Add a note</h5>
            <div className="form-group">
              <textarea
                className="form-control"
                name="text"
                value={this.state.text}
                onChange={this.handleInput}
              ></textarea>
            </div>
            <button
              className="btn btn-primary my-2"
              type="submit"
              onClick={this.addItem}
            >
              {this.state.editText ? `Save Note` : `Add Note`}
            </button>
            <input
              className="dateTime mx-2"
              name="date"
              type="datetime-local"
              id="myDate"
              value={this.state.date}
              onChange={this.handleInput}
            ></input>
            <button
              className="btn btn-primary my-30"
              type="submit"
              onClick={this.addItem}
            >
              Submit
            </button>
          </div>
        </div>
        <hr />
        <h1 className="cardArea mx-4">Your Notes</h1>
        <hr />
        {this.state.todoList.map((items) => {
          console.log(items);
          this.postData();
          return (
            <Cards name={items} delete={this.deleteText} edit={this.editText} />
          );
        })}
      </div>
    );
  }
}

export default TextArea;
