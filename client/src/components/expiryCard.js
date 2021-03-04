import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

const Expiry = () => {
  return (
    <Card
      bg="danger"
      className="noteCard mx-4 my-4 "
      style={{ width: "700px" }}
    >
      <Card.Body>
        <Card.Title>
          <h3>Expired</h3>
        </Card.Title>
        <Card.Text>
          <h3>Your Card Has Expired</h3>
        </Card.Text>
        <Button variant="primary">Delete</Button>
      </Card.Body>
    </Card>
  );
};

export default Expiry;
