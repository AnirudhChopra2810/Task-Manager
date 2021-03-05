import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

const Expiry = (props) => {
  return (
    <Card
      bg="danger"
      className="noteCard mx-4 my-4 "
      style={{ width: "700px" }}
    >
      <Card.Body>
        <Card.Title>
          <h3 style={{ color: "white" }}>Expired</h3>
        </Card.Title>
        <Card.Text style={{ color: "white" }}>
          <h3>Your Card Has Expired</h3>
        </Card.Text>
        <Button
          variant="primary"
          onClick={(e) => {
            e.preventDefault();
            let todo = props.items.Todo;
            props.deleteText(todo);
          }}
        >
          Delete
        </Button>
        <Button
          variant="primary mx-3"
          onClick={(e) => {
            e.preventDefault();
            e.preventDefault();
            let todo = props.items.Todo;
            let date = props.items.Date;
            props.editText(todo, date);
          }}
        >
          edit
        </Button>
      </Card.Body>
    </Card>
  );
};

export default Expiry;
