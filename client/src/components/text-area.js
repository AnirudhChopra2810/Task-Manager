import React from "react";
import Cards from "./cards";

class TextArea extends React.Component {
  state = {
    todoList: [],
    text: "",
    date: "",
    key: Date.now(),
    editText: false,
  };

  handleInput = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  deleteText = (key) => {
    let items = this.state.todoList;
    items.map((items) => {
      if (key === items.key)
        this.setState({
          todoList: this.state.todoList.filter((data) => {
            return data.key !== key;
          }),
        });
    });
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
    event.preventDefault();
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
      } else {
        alert("Input Field Or Date Field Is Empty");
      }
    }
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
          </div>
        </div>
        <hr />
        <h1 className="cardArea mx-4">Your Notes</h1>
        <hr />
        {this.state.todoList.map((items) => {
          console.log(items);
          return (
            <Cards name={items} delete={this.deleteText} edit={this.editText} />
          );
        })}
      </div>
    );
  }
}

// function postData(Todos) {
//   let todoList = {
//     todoList: Todos,
//   };

//   fetch("http://localhost:3000/addList", {
//     method: "POST",
//     body: JSON.stringify(todoList),
//     headers: {
//       "Content-type": "application/json",
//     },
//   })
//     .then((data) => data.json())
//     .then((json) => console.log(json));
// }

export default TextArea;
