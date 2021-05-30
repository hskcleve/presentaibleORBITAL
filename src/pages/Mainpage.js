import firebase from "firebase";
import {React} from "react";

const Mainpage = () => {

  const user = firebase.auth().currentUser;

  return (
    console.log("Mainpage reached ", user.displayName),
    (
      <div className="pagefiller">
      <h1 className="frontPageWelcome">Welcome Back,</h1>
      <h1 className="frontPageWelcome2">{user.displayName}.</h1>
      </div>
    )
  );
};

export default Mainpage;
