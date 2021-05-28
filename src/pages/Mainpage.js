import { useAuth } from "../contexts/AuthContext";
import { AuthProvider } from "../contexts/AuthContext";
import firebase from "firebase";

const Mainpage = ({ username }) => {
  const user = firebase.auth().currentUser;

  return (
    console.log("Mainpage reached ", user.displayName),
    (
      <div className="pagefiller">
        <h1 className="frontPageWelcome">Welcome Back,</h1>
        <h1 className="frontPageWelcome2">
          {user.displayName} from {user.schoolName}.
        </h1>
        <span></span>
      </div>
    )
  );
};

export default Mainpage;
