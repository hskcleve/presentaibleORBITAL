import {React} from "react";

const Mainpage = ({userName}) => {

  return (
    console.log("Mainpage reached ", userName),
    (
      <div className="pagefiller">
      <h1 className="frontPageWelcome">Welcome Back,</h1>
      <h1 className="frontPageWelcome2">{userName}.</h1>
      </div>
    )
  );
};

export default Mainpage;
