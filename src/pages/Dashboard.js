import Classes from "../components/Classes";
import CreateClass from "../components/CreateClass";
import JoinClass from "../components/JoinClass";
import Navbar from "../components/Navbar";
import Posts from "../components/Posts";
import AddStudent from "../components/AddStudent";
import { db } from "../firebase";
import firebase from "firebase";
import { useState, useEffect } from "react";

const DashboardPage = () => {
  const { currentUser } = firebase.auth();
  const [modules, setModules] = useState([]);

  useEffect(() => {
    loadOptions();
  }, []);

  async function loadOptions() {
    const userDocRef = await db.collection("users").doc(currentUser.uid).get();
    setModules(userDocRef.data().classes);
  }

  console.log(modules);

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
            <AddStudent modules={modules}></AddStudent>
          </h1>
        </div>
      </>
    )
  );
};

export default DashboardPage;
