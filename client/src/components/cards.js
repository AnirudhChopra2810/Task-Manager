import { React, Component } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

class Cards extends Component {
  delete = () => {
    this.props.delete(this.props.name.key);
  };

  edit = () => {
    this.props.edit(
      this.props.name.key,
      this.props.name.text,
      this.props.name.date
    );
  };

  render() {
    return (
      <Card
        className="noteCard mx-4 my-4 "
        bg=""
        border="success"
        style={{ width: "14rem" }}
        key={this.props.name.key}
      >
        <Card.Body>
          <Card.Title>Note</Card.Title>
          <hr />
          <Card.Text>{this.props.name.text}</Card.Text>
          <Card.Text>{this.props.name.date}</Card.Text>
          <Button variant="primary" onClick={this.delete}>
            Delete
          </Button>
          <Button variant="primary mx-2" onClick={this.edit}>
            Edit
          </Button>
        </Card.Body>
      </Card>
    );
  }
}

export default Cards;
