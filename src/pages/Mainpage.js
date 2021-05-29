import firebase from "firebase";
import React from "react";
import { useHistory } from "react-router-dom";

const Mainpage = () => {
  const user = firebase.auth().currentUser;
  const history = useHistory();
  const onClick = () => {
    history.push("testPage");
  }

  return (
    console.log("Mainpage reached ", user.displayName),
    (
      <div className="pagefiller">
        <h1 className="frontPageWelcome">Welcome Back,</h1>
        <h1 className="frontPageWelcome2">{user.displayName}.</h1>
        <div className="center">
        <button className='btn' onClick={onClick}>See all users</button>
        </div>
      </div>
    )
  );
};

export default Mainpage;
