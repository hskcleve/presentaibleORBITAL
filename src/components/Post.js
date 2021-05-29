import React from "react";
import { Card, Button, ListGroup } from "react-bootstrap";
import Comments from "./Comments";

const Post = (props) => {
  return (
    <Card
      className="postcard"
      border="danger"
      bg="info"
      text="white"
      style={{ margin: "10px", width: "30rem", textAlign: "center" }}
    >
      <Card.Title>{"   "}</Card.Title>
      <Card.Img variant="top" src={props.vidUrl} width="300" height="190" m-5 />
      <Card.Body>
        <Card.Title>
          <strong>Presentation {props.id}</strong>
        </Card.Title>
        <Card.Text>{props.content}</Card.Text>
        <Button variant="warning" onClick={postCardClicked}>
          Check tutor feedback
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
    <Card style={{ margin: "10px", width: "30rem", textAlign: "left" }}>
      <Card.Title>
        <strong>
          <h2>Comment Section</h2>
        </strong>
      </Card.Title>
      <ListGroup variant="flush">
        {commentArray.length !== 0 ? (
          <Comments comments={commentArray}></Comments>
        ) : (
          <ListGroup.Item>{"No comment yet :("}</ListGroup.Item>
        )}
      </ListGroup>
    </Card>
  );
}

export default Post;
