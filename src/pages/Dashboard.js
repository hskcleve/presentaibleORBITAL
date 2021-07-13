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
import TutorSubmission from "../components/TutorSubmissions";

const DashboardPage = () => {
  const { currentUser } = firebase.auth();
  const [modules, setModules] = useState([]);
  const [userSchool, setUserSchool] = useState();
  const [schoolModules, setSchoolModules] = useState([]);
  const [userRole, setUserRole] = useState(false);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    loadOptions();
  }, []);

  useEffect(() => {
    loadSchoolModules();
  }, [userSchool]);

  async function loadOptions() {
    const userDocRef = await db.collection("users").doc(currentUser.uid).get();
    //undefined field check for users without classes array
    const userClasses = userDocRef.data().classes != undefined ? userDocRef.data().classes : [];
    const roleInfo = userDocRef.data().role;
    //filters out deleted mods
    setModules(userClasses.filter((x) => x.deleted != true));
    setUserSchool(userDocRef.data().school);
    setUserRole(roleInfo.tutor);
    //todo - get feedback from user profile
  }

  async function loadSchoolModules() {
    console.log(userSchool);
    const schoolModulesRef = await db
      .collection("schools")
      .doc(userSchool)
      .get()
      .then((doc) => {
        if (doc.exists) {
          setSchoolModules(doc.data().Modules);
        }
      });
    console.log(schoolModules);
    setLoading(false);
  }

  function renderButtons(tutorRole) {
    return (
      <div style={{ display: "flex", justifyContent: "space-around" }}>
        {renderCreateClass(tutorRole)}
        {renderJoinClass(tutorRole)}
        {renderAddStudent(tutorRole)}
        {renderSubmitSubmission(tutorRole)}
      </div>
    );
  }

  function renderCreateClass(tutorRole) {
    return <>{tutorRole && <CreateClass school={userSchool}></CreateClass>}</>;
  }

  function renderJoinClass(tutorRole) {
    return <>{!tutorRole && <JoinClass modules={schoolModules}></JoinClass>}</>;
  }

  function renderAddStudent(tutorRole) {
    return <>{tutorRole && <AddStudent modules={modules}></AddStudent>}</>;
  }

  function renderSubmitSubmission(tutorRole) {
    return (
      <>
        {!tutorRole && <SubmitSubmission modules={modules} school={userSchool}></SubmitSubmission>}
      </>
    );
  }

  function renderSubmissions(tutorRole) {
    return (
      <>
        {renderStudentSubmissions(tutorRole)}
        {renderTutorSubmissions(tutorRole)}
      </>
    );
  }

  function renderStudentSubmissions(tutorRole) {
    return <>{!tutorRole && <SubmissionsPage></SubmissionsPage>}</>;
  }

  function renderTutorSubmissions(tutorRole) {
    return <>{tutorRole && <TutorSubmission modules={modules}></TutorSubmission>}</>;
  }

  return (
    <>
      <Navbar />
      <div className="dashboard-wrapper">
        <br></br>
        <section
          style={{
            display: "flex",
            alignItems: "flex-start",
            marginLeft: 20,
            justifyContent: "space-evenly",
            flexFlow: "wrap",
          }}
        >
          <div
            className="profile-component"
            style={{
              display: "flex",
              flexFlow: "column wrap",
            }}
          >
            <Profile
              name={currentUser.displayName}
              id={currentUser.uid}
              tutorRole={userRole}
            ></Profile>

            {!loading && (
              <>
                <div className="dashboardSidebar">
                  <Classes tutorRole={userRole} modules={modules}></Classes>
                  {renderButtons(userRole)}
                </div>
              </>
            )}
          </div>
          <div className="container-submissions">{renderSubmissions(userRole)}</div>
        </section>
      </div>
    </>
  );
};

export default DashboardPage;
