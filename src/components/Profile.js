import React from "react";

const Profile = (props) => {
  const { name, id } = props;
  return (
    <div className="profile-container" style={{minWidth:425, minHeight:300}}>
      <title>Profile</title>
      <div>
        <img
          className="profile-image"
          src="https://image.flaticon.com/icons/png/64/1077/1077012.png"
        ></img>
        <div className="profile-info">
          <h2>{name}</h2>
          <h3>{id}</h3>
          <button className="profile-edit-btn">Edit profile</button>
        </div>
      </div>
      <p>lorem lorem lorem lorem</p>
    </div>
  );
};

export default Profile;
