import firebase from "firebase";
import { useEffect, useState } from "react";
import AddStudent from "../components/AddStudent";
import Classes from "../components/Classes";
import CreateClass from "../components/CreateClass";
import JoinClass from "../components/JoinClass";
import Navbar from "../components/Navbar";
import Profile from "../components/Profile";
import { db } from "../firebase";

const DashboardPage = () => {
  const { currentUser } = firebase.auth();
  const [modules, setModules] = useState([]);

  useEffect(() => {
    loadOptions();
  }, []);

  async function loadOptions() {
    const userDocRef = await db.collection("users").doc(currentUser.uid).get();
    //undefined field check for users without classes array
    const userClasses =
      userDocRef.data().classes != undefined ? userDocRef.data().classes : [];
    setModules(userClasses);
  }

  console.log(modules);

  return (
    console.log("DashboardPage reached"),
    (
      <>
        <Navbar />

        <div className="profile-component">
          <h1 className="header">My Dashboard</h1>
          <Profile
            name={currentUser.displayName}
            id={currentUser.uid}
          ></Profile>
        </div>

        <Classes></Classes>
        <CreateClass></CreateClass>
        <JoinClass></JoinClass>
        <AddStudent modules={modules}></AddStudent>
      </>
    )
  );
};

export default DashboardPage;
