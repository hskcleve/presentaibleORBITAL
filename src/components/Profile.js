import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import Feedback from "./Feedback";
import ProfilePic from "./tempImages/user.png"

const Profile = (props) => {
  const { name, id, tutorRole } = props;
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
    <div className='containerProfile' style={{minWidth: 425}}>
      <div style={{display:'flex', flexDirection:'column'}}>
      <div style={{display:'flex'}}>
      <div><img src={ProfilePic} alt="profilePic"></img></div>
      <div style={{ marginLeft:20, marginTop:4, display: "flex", flexDirection: "column" }}>
          <h2>{name}</h2>
          <h6>UserID: {id}</h6>
      </div>
      </div>
        {feedback && (
          <div className='center' style={{marginTop:40}}>
          <div><Feedback
            feedback={feedback}
            goodFeedbacks={goodFeedbacks}
            badFeedbacks={badFeedbacks}
            neutral={neutralFeedbacks}
            tutorRole={feedback}
          ></Feedback></div>
          </div>
        )}{" "}
      </div>
    </div>
  );
};

export default Profile;
