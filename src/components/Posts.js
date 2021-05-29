import React from "react";
import { Card, CardColumns } from "react-bootstrap";
import Post from "./Post";
import firebase from "firebase";
import { Button } from "react-bootstrap";
import vidOne from "./tempImages/vidOne.jpg";
import vidTwo from "./tempImages/vidTwo.jpg";

const Posts = () => {
  const { currentUser } = firebase.auth();
  console.log(currentUser);
  return (
    <CardColumns>
      <Card style={{ fontSize: 24 }}>
        <Post
          key="1"
          id={"1"}
          vidUrl={vidOne}
          content={"Marketing Presentation"}
          comments={["No comments yet"]}
        ></Post>
        <Post
          key="2"
          id={"2"}
          vidUrl={vidTwo}
          content={"Client demo video"}
          comments={[
            "The video quality is good",
            "In slide 3, the picture used is distracting",
          ]}
        ></Post>
      </Card>
    </CardColumns>
  );
};

export default Posts;
