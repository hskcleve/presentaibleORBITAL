import React, { useState, useEffect, useRef } from "react";
import { db } from "../firebase";
import firebase from "firebase";

const SubmitComment = (props) => {
  const user = firebase.auth().currentUser;
  const [comment, setComment] = useState("");
  const postUID = String(window.location.pathname.substring(18, window.location.pathname.length));
  const [updated, setUpdated] = useState(false);
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": " application/json" },
    body: JSON.stringify({ content: comment.toLowerCase() }),
  };
  const uid = user.uid;
  const { goodFeedbacks, badFeedbacks, neutral } = props;
  const [currentFeedback, setCurrentFeedback] = useState("");

  useEffect(() => {
    console.log(comment);
    if (updated) {
      fetch("https://presentaible.herokuapp.com/post", requestOptions)
        .then((response) => response.json())
        .then((data) => {
          //update currentFeedback
          setCurrentFeedback(data.message);
          //update database
          updatePostWeightage(postUID, data);
          //cause a reload of the page
          console.log(data);
          //add comment to db
          db.collection("comments").add({
            PostUID: postUID,
            author: user.displayName,
            content: comment,
            rating: data.message,
          });
        });
      console.log("updated has a value of ", updated);

      setUpdated(false);
      setComment("");
      //update post weightage
    }
    //add rating of this comment to submissions db
  }, [updated]);

  function updatePostWeightage(postUID, data) {
    const currentFeedback = data.message;
    const max = findNewWeightage(data.message);
    db.collection("submissions")
      .doc(postUID)
      .update({
        [data.message]: firebase.firestore.FieldValue.increment(1),
        totalFeedbacks: firebase.firestore.FieldValue.increment(1),
        weightage: max,
      });
  }

  function findNewWeightage(review) {
    let good = goodFeedbacks;
    let bad = badFeedbacks;
    if (review === "good") {
      good = good + 1;
    } else if (review === "bad") {
      bad = bad + 1;
    }
    if (good > bad) {
      return "good";
    } else if (bad > good) {
      return "bad";
    } else {
      return "neutral";
    }
  }

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
          <button style={{ backgroundColor: "goldenrod" }} onClick={onSubmit} className="btn">
            Feedback
          </button>
        </div>
      </form>
    </div>
  );
};

export default SubmitComment;
