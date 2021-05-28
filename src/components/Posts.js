import React from "react";
import { Card, CardColumns } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import Post from "./Post";

const Posts = () => {
  //const { currentUser } = useAuth();
  return (
    <CardColumns>
      <Card>
        <Post content={"this is just some random text 01"} comments={[]}></Post>
        <Post
          content={"I am running out of ideas of what to type here"}
          comments={["hello maoxin", "hi cleve"]}
        ></Post>
      </Card>
    </CardColumns>
  );
};

export default Posts;
