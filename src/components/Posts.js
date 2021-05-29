import React from "react";
import { Card, CardColumns } from "react-bootstrap";
import Post from "./Post";
import firebase from "firebase";
import { Button } from "react-bootstrap";

const Posts = () => {
  const { currentUser } = firebase.auth();
  console.log(currentUser);
  return (
    <CardColumns>
      <Card>
        <Post
          key="1"
          content={"this is just some random text 01"}
          comments={[""]}
        ></Post>
        <Post
          key="2"
          content={"I am running out of ideas of what to type here"}
          comments={["hello maoxin", "hi cleve"]}
        ></Post>
        <Button variant="info">Poke</Button>
      </Card>
    </CardColumns>
  );
};

export default Posts;
