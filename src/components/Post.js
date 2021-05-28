import React from "react";
import { Card, Button, Form, ListGroup } from "react-bootstrap";

const Post = (props) => {
  return (
    <Card style={{ width: "18rem" }}>
      <Card.Img
        variant="top"
        src="https://wompampsupport.azureedge.net/fetchimage?siteId=7575&v=2&jpgQuality=100&width=700&url=https%3A%2F%2Fi.kym-cdn.com%2Fentries%2Ficons%2Foriginal%2F000%2F013%2F564%2Fdoge.jpg"
      />
      <Card.Body>
        <Card.Title>Card Title</Card.Title>
        <Card.Text>{props.content}</Card.Text>
        <Button variant="warning" onClick={postCardClicked}>
          Leave Feedback
        </Button>
      </Card.Body>
      {displayComments(props.comments)}
    </Card>
  );
};

function postCardClicked() {
  //show form
  return <div></div>;
}

function displayComments(commentArray) {
  //commentArray = ["what a great speach", "you remind me of MLK"];
  return (
    <Card style={{ width: "18rem" }}>
      <Card.Title>
        <strong>
          <h2>Comment Section</h2>
        </strong>
      </Card.Title>
      <ListGroup variant="flush">
        {commentArray.length != 0 ? (
          commentArray.map((comment) => (
            <ListGroup.Item>{comment}</ListGroup.Item>
          ))
        ) : (
          <ListGroup.Item>{"No comment yet :("}</ListGroup.Item>
        )}
      </ListGroup>
    </Card>
  );
}

export default Post;
