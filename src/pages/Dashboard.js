import Classes from "../components/Classes";
import CreateClass from "../components/CreateClass";
import JoinClass from "../components/JoinClass";
import Navbar from "../components/Navbar";
import Posts from "../components/Posts";

const DashboardPage = () => {
  return (
    console.log("DashboardPage reached"),
    (
      <>
        <Navbar />
        <div>
          <h1 className="header">My Dashboard</h1>

          <h1 className="containerForSubmission">
            <h3>My Submissions</h3>
            <Classes></Classes>
            <CreateClass></CreateClass>
            <JoinClass></JoinClass>
          </h1>
        </div>
      </>
    )
  );
};

export default DashboardPage;
