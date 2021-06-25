import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import Feedback from "./Feedback";

const Profile = (props) => {
  const { name, id, isStudent } = props;
  const [goodFeedbacks, setGoodFeedbacks] = useState(0);
  const [badFeedbacks, setBadFeedbacks] = useState(0);
  const [neutralFeedbacks, setNeutralFeedbacks] = useState(0);
  const [feedback, setFeedback] = useState(false);

  useEffect(() => {
    db.collection("submissions")
      .where("userUID", "==", id)
      .get()
      .then((querySnapshot) => {
        const weightageArray = [];
        querySnapshot.forEach((doc) =>
          weightageArray.push(doc.data().weightage)
        );
        console.log(weightageArray);
        const goodCount = weightageArray.filter((x) => x === "good");
        const badCount = weightageArray.filter((x) => x === "bad");
        const neutralCount = weightageArray.filter((x) => x === "neutral");
        setGoodFeedbacks(goodCount.length);
        setBadFeedbacks(badCount.length);
        setNeutralFeedbacks(neutralCount.length);
        setFeedback(weightageArray.length != 0);
      });
  }, []);

  return (
    <div
      className="profile-container"
      style={{ minWidth: 425, minHeight: 300 }}
    >
      <title>Profile</title>

      <img
        className="profile-image"
        src="https://image.flaticon.com/icons/png/64/1077/1077012.png"
      ></img>
      <Feedback
        feedback={feedback}
        goodFeedbacks={goodFeedbacks}
        badFeedbacks={badFeedbacks}
        neutral={neutralFeedbacks}
        isStudent={isStudent}
      ></Feedback>

      <div className="profile-info">
        <h2>{name}</h2>
        <h3>{id}</h3>
        <button className="profile-edit-btn">Edit profile</button>
      </div>
    </div>
  );
};

export default Profile;
