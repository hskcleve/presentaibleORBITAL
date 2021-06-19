import firebase from "firebase";
import { useEffect, useState } from "react";
import AddStudent from "../components/AddStudent";
import Classes from "../components/Classes";
import CreateClass from "../components/CreateClass";
import JoinClass from "../components/JoinClass";
import Navbar from "../components/Navbar";
import Profile from "../components/Profile";
import SubmitSubmission from "../components/SubmitSubmission";
import { db } from "../firebase";
import SubmissionsPage from "./SubmissionsPage";

const DashboardPage = () => {
  const { currentUser } = firebase.auth();
  const [modules, setModules] = useState([]);
  const [userSchool, setUserSchool] = useState();

  useEffect(() => {
    loadOptions();
  }, []);

  async function loadOptions() {
    const userDocRef = await db.collection("users").doc(currentUser.uid).get();
    //undefined field check for users without classes array
    const userClasses =
      userDocRef.data().classes != undefined ? userDocRef.data().classes : [];
    setModules(userClasses);
    setUserSchool(userDocRef.data().school);
  }

  console.log(modules);

  return (
    console.log("DashboardPage reached"),
    (
      <>
        <Navbar />
        <br></br>
        <div style={{display:'flex', alignItems:'flex-start', marginLeft:20, justifyContent: 'space-evenly'}}>
        <div className="profile-component">
          <Profile
            name={currentUser.displayName}
            id={currentUser.uid}
          ></Profile>
          <div className="dashboardSidebar">
        <Classes></Classes>
        <CreateClass school={userSchool}></CreateClass>
        <JoinClass></JoinClass>
        <AddStudent modules={modules}></AddStudent>
        <SubmitSubmission
          modules={modules}
          school={userSchool}
        ></SubmitSubmission>
        </div>
        </div>
        <SubmissionsPage />
        </div>
      </>
    )
  );
};

export default DashboardPage;
