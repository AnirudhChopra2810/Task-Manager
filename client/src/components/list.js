import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import uuid from "react-uuid";

const List = (props) => {
  console.log("i worked");

  return (
    <Card
      key={uuid()}
      className="noteCard mx-4 my-4 "
      style={{ width: "700px", backgroundColor: "#3d3e40" }}
      name={props.items.Todo}
    >
      <Card.Body>
        <Card.Title style={{ color: "white" }}>Note</Card.Title>
        <hr />
        <Card.Text style={{ color: "white" }}>{props.items.Todo}</Card.Text>
        <Card.Text style={{ color: "white" }}>{props.items.Date}</Card.Text>
        <Button
          variant="danger"
          onClick={(e) => {
            e.preventDefault();
            let name = props.items.Todo;
            let date = props.items.Date;
            props.deleteText(name, date);
          }}
        >
          Delete
        </Button>
        <Button
          variant="primary mx-3"
          style={{ width: "70px" }}
          onClick={(e) => {
            e.preventDefault();
            let name = props.items.Todo;
            let date = props.items.Date;
            props.editText(name, date);
          }}
        >
          Edit
        </Button>
      </Card.Body>
    </Card>
  );
  //   const editText = (Todo) => {
  //     //For editing the text.
  //     // setTodoText(Todo);
  //     // setEditTodo(Todo);
  //     // setEditText(true);
  //     // todoList.map((items) => {
  //     //   if (Todo === items.Todo) {
  //     //     setIndex(
  //     //       todoList.findIndex((items) => {
  //     //         return items.Todo === Todo;
  //     //       })
  //     //     );
  //     //   }
  //     // });
  //   };
};

export default List;
