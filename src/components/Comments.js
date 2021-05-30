import React from "react";
import { Card } from "react-bootstrap";
import { useState } from "react";

const Comments = (props) => {
  const [comments, setComments] = useState(props.comments);
  const [newCommentText, setNewCommentText] = useState("");

  function loadComments(loadcomments) {
    console.log(loadcomments);
    return loadcomments.map((comment) => (
      <Card
        style={{ width: "70rem", textAlign: "left" }}
        bg={"primary"}
        text={"white"}
      >
        <Card.Title></Card.Title>
        <Card.Body>{comment}</Card.Body>
      </Card>
    ));
  }

  function handleNewComment(event) {
    // React honours default browser behavior and the
    // default behaviour for a form submission is to
    // submit AND refresh the page. So we override the
    // default behaviour here as we don't want to refresh
    event.preventDefault();
    let newCommentArr = [].concat(comments);
    newCommentArr.push(newCommentText);
    setComments(newCommentArr);
    setNewCommentText("");
  }

  return (
    <React.Fragment>
      {loadComments(comments)}
      <div>
        <form onSubmit={handleNewComment}>
          <label>
            <input
              style={{ margin: "0 1rem", fontSize: 17 }}
              type="text"
              value={newCommentText}
              // how do you know it's event.target.value? it just is.
              // search it up on MDN, and view react code samples
              // See: https://reactjs.org/docs/forms.html
              onChange={(event) => setNewCommentText(event.target.value)}
            />
          </label>
          <input type="submit" value="comment" />
        </form>
      </div>
    </React.Fragment>
  );
};

export default Comments;
