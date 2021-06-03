import {React} from "react";

const Mainpage = ({userName}) => {

  return (
    console.log("Mainpage reached ", userName),
    (
      <div>
      <h1 className="frontPageWelcome" style={{color:'GhostWhite'}}>Welcome Back,</h1>
      <h1 className="frontPageWelcome2" style={{color:'Beige'}}>{userName}.</h1>
      </div>
    )
  );
};

export default Mainpage;
