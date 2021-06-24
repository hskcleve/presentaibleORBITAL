import React, { useState, useEffect, useRef } from "react";
import { db } from "../firebase";
import firebase from "firebase";

const SubmitComment = () => {
  const user = firebase.auth().currentUser;
  const [comment, setComment] = useState("");
  const postUID = String(
    window.location.pathname.substring(10, window.location.pathname.length)
  );
  const [updated, setUpdated] = useState(false);
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": " application/json" },
    body: JSON.stringify({ content: comment }),
  };
  const uid = user.uid;

  useEffect(() => {
    console.log(comment);
    if (updated) {
      fetch("/post", requestOptions)
        .then((response) => response.json())
        .then((data) => {
          //todo -----
          //update database
          db.collection("submissions")
            .doc(postUID)
            .update({
              [data.message]: firebase.firestore.FieldValue.increment(1),
              totalFeedbacks: firebase.firestore.FieldValue.increment(1),
            });
          //cause a reload of the page
          console.log(data);
        });
      console.log("updated has a value of ", updated);
      //add comment to db
      db.collection("comments").add({
        PostUID: postUID,
        author: user.displayName,
        content: comment,
      });
      setUpdated(false);
      setComment("");
    }
    //add rating of this comment to submissions db
  }, [updated]);

  const onSubmit = (event) => {
    event.preventDefault();
    if (comment != "") {
      setUpdated(true);
    } else {
      alert("Leave a feedback!");
    }
  };

  const handleCommentAdd = (event) => {
    setComment(event.target.value);
  };

  return (
    <div>
      <form>
        Leave a feedback:
        <br></br>
        <textarea
          id="comment"
          name="comment"
          type="text"
          placeholder=" ..."
          value={comment}
          onChange={handleCommentAdd}
          style={{
            minHeight: 120,
            maxHeight: 120,
            minWidth: 435,
            maxWidth: 435,
            fontFamily: "Helvetica Neue",
            fontSize: 15,
          }}
        />
        <div className="center">
          <button
            style={{ backgroundColor: "goldenrod" }}
            onClick={onSubmit}
            className="btn"
          >
            Feedback
          </button>
        </div>
      </form>
    </div>
  );
};

export default SubmitComment;
