import React from "react";
import Feedback from "./Feedback";

const Profile = (props) => {
  const { name, id } = props;
  const { goodFeedbacks, totalFeedbacks } = props;
  const badFeedbacks = totalFeedbacks - goodFeedbacks;
  const feedback = Boolean(totalFeedbacks);

  return (
    <div
      className="profile-container"
      style={{ minWidth: 425}}
    >
       <img
        className="profile-image"
        src="https://image.flaticon.com/icons/png/64/1077/1077012.png"
      ></img>
      <div style={{display:'flex', flexDirection:'column'}}>
      <div className="profile-info">
        <h2>{name}</h2>
        <h6>UserID: {id}</h6>
      </div>
      <Feedback
        feedback={feedback}
        goodFeedbacks={goodFeedbacks}
        badFeedbacks={badFeedbacks}
      ></Feedback>
      </div>
    </div>
  );
};

export default Profile;
