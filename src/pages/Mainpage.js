import { useAuth } from "../contexts/AuthContext";
import { AuthProvider } from "../contexts/AuthContext";

const Mainpage = ({username}) => {

  return (
    console.log("Mainpage reached"),
    (
      <div className="pagefiller">
        <h1 className="frontPageWelcome">Welcome Back,</h1>

        <h2 className="frontPageWelcome2">{username}.</h2>
      </div>
    )
  );
};

export default Mainpage;
