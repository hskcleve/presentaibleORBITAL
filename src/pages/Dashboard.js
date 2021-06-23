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
  const [goodFeedbacks, setGoodFeedbacks] = useState(0);
  const [totalFeedbacks, setTotalFeedbacks] = useState(0);

  useEffect(() => {
    loadOptions();
  }, []);

  useEffect(() => {
    loadSchoolModules();
  }, [userSchool]);

  async function loadOptions() {
    const userDocRef = await db.collection("users").doc(currentUser.uid).get();
    //undefined field check for users without classes array
    const userClasses =
      userDocRef.data().classes != undefined ? userDocRef.data().classes : [];
    const roleInfo = userDocRef.data().role;
    setModules(userClasses);
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
      <div className="user-conditional-btns">
        {renderCreateClass(tutorRole)}
        {renderJoinClass(tutorRole)}
        {renderAddStudent(tutorRole)}
        {renderSubmitSubmission(tutorRole)}
      </div>
    );
  }

  function renderCreateClass(tutorRole) {
    return (
      <div>{tutorRole && <CreateClass school={userSchool}></CreateClass>}</div>
    );
  }

  function renderJoinClass(tutorRole) {
    return (
      <div>{!tutorRole && <JoinClass modules={schoolModules}></JoinClass>}</div>
    );
  }

  function renderAddStudent(tutorRole) {
    return (
      <div>{tutorRole && <AddStudent modules={modules}></AddStudent>}</div>
    );
  }

  function renderSubmitSubmission(tutorRole) {
    return (
      <div>
        {!tutorRole && (
          <SubmitSubmission
            modules={modules}
            school={userSchool}
          ></SubmitSubmission>
        )}
      </div>
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
    return (
      <>{tutorRole && <TutorSubmission modules={modules}></TutorSubmission>}</>
    );
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
          }}
        >
          <div className="profile-component">
            <Profile
              name={currentUser.displayName}
              id={currentUser.uid}
              goodFeedbacks={goodFeedbacks}
              totalFeedbacks={totalFeedbacks}
            ></Profile>

            {!loading && (
              <>
                <div className="dashboardSidebar">
                  <Classes modules={modules}></Classes>
                  {renderButtons(userRole)}
                </div>
              </>
            )}
          </div>
          <div className="container-submissions">
            {!loading && renderSubmissions(userRole)}
          </div>
        </section>
      </div>
    </>
  );
};

export default DashboardPage;
