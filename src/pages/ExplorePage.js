import firebase from "firebase";
import { useState, useEffect, useRef } from "react";
import { db } from "../firebase";
import { useHistory } from "react-router-dom";
import Navbar from "../components/Navbar";
import { Form, Button } from "react-bootstrap";
import Feedback from "../components/Feedback";

const ExplorePage = () => {
  const user = firebase.auth().currentUser;
  const userUID = user.uid;
  const [submissions, setSubmissions] = useState([]);
  const history = useHistory();
  const [school, setSchool] = useState("");
  const [modules, setModules] = useState([]);
  const filterRef = useRef();
  const [currentFilter, setCurrentFilter] = useState("");

  useEffect(() => {
    getSchool();
    getModules();
  }, []); // uses an empty dependency array because it is constant. If dependency array removed useEffect is called
  // continuously, causing multiple API calls to get school non stop.

  useEffect(() => {
    getSchoolSubmissions();
    console.log("getSchoolSubmissions called!, school is: " + school);
    setCurrentFilter("Public");
  }, [school]); // similarly here, useEffect is called whenever school is changed; ie from the getSchool call.

  useEffect(() => {
    getSchoolSubmissions();
  }, [currentFilter]);

  const getSchool = () => {
    console.log("getSchool called!");
    db.collection("users")
      .doc(userUID)
      .get()
      .then((doc) => {
        const data = doc.data();
        setSchool(data.school);
        console.log("getSchool has set school to " + school);
      })
      .catch((error) => {
        console.log("error in getSchool", error);
      });
  };

  const getModules = () => {
    console.log("getModules called!");
    const tempModules = [];
    db.collection("users")
      .doc(userUID)
      .get()
      .then((doc) => {
        const data = doc.data();
        const moduleArray = data.classes;
        moduleArray.forEach((mod) => {
          const className = mod["className"];
          tempModules.push(className);
        });
        setModules(tempModules);
      });
  };

  async function handleFilter(e) {
    e.preventDefault();
    setCurrentFilter(filterRef.current.value);
    console.log("current filter: " + filterRef.current.value);
  }

  const getSchoolSubmissions = () => {
    if (currentFilter === school) {
      db.collection("submissions")
        .where("school", "==", currentFilter)
        .get()
        .then((querySnapshot) => {
          const arr = [];
          querySnapshot.forEach((doc) => {
            const data = doc.data();
            const content = data.content;
            const author = data.author;
            const PostUID = doc.id;
            const title = data.title;
            const timestamp = data.timeStamp;
            const good = data.good;
            const neutral = data.neutral;
            const bad = data.bad;
            const totalFeedbacks = data.totalFeedbacks;
            arr.push([
              author, //0
              content, //1
              PostUID, //2
              title, //3
              timestamp, //4
              good, //5
              neutral, //6
              bad, //7
              totalFeedbacks, //8
            ]);
          });
          setSubmissions(arr);
        });
    } else {
      db.collection("submissions")
        .where("moduleName", "==", currentFilter)
        .get()
        .then((querySnapshot) => {
          const arr = [];
          querySnapshot.forEach((doc) => {
            const data = doc.data();
            const content = data.content;
            const author = data.author;
            const PostUID = doc.id;
            const title = data.title;
            const timestamp = data.timeStamp;
            const good = data.good;
            const neutral = data.neutral;
            const bad = data.bad;
            const totalFeedbacks = data.totalFeedbacks;
            arr.push([
              author,
              content,
              PostUID,
              title,
              timestamp, //4
              good, //5
              neutral, //6
              bad, //7
              totalFeedbacks, //8
            ]);
          });
          setSubmissions(arr);
        });
    }
  };

  const onOpen = ({ submission }) => {
    history.push("/explore/viewpost/" + submission[2]);
  };

  const getColor = () => {
    switch (currentFilter) {
      case "Public":
        return "rgba(41, 194, 166, 0.6)";
      case "SMU":
      case "NTU":
      case "NUS":
        return "rgba(218,165,32,0.7)";
      default:
        return "rgba(237, 81, 14, 0.6)";
    }
  };

  const RenderSubmissions = () => {
    if (submissions.length === 0) {
      return (
        <div
          style={{ textAlign: "center", marginTop: 200, color: "whitesmoke" }}
        >
          <h3>No submissions yet!</h3>
        </div>
      );
    }
    return (
      <div
        className="containerWide"
        style={{
          backgroundColor: "transparent",
          flexWrap: "wrap",
          display: "flex",
          minHeight: 500,
          maxWidth: 1920,
          display: "flex",
          flexWrap: "wrap",
          flexDirection: "row",
          justifyContent: "start",
        }}
      >
        {submissions.map((submission) => (
          <div
            className="submission"
            style={{
              fontSize: 12,
              minWidth: 350,
              maxWidth: 350,
              maxHeight: 390,
              backgroundColor: getColor(),
            }}
          >
            <div>
              <h2>{submission[3]} </h2>
              <div>
                by {submission[0]} on {submission[4]}{" "}
              </div>
              <br></br>
              <div style={{ minHeight: 60 }}>
                {submission[1].split(" ").slice(0, 18).join(" ") + " ..."}
              </div>
              <br></br>
              <div style={{display:'flex', justifyContent:'center'}}>
              <Feedback 
                feedback={submission[8] != 0 && submission[8] != undefined}
                badFeedbacks={submission[7]}
                goodFeedbacks={submission[5]}
                neutral={submission[6]}
              ></Feedback>
              </div>
            </div>
            <div style={{ textAlign: "end" }}>
              <button
                className="btn"
                style={{
                  fontSize: 10,
                  backgroundColor: "transparent",
                  textDecorationLine: "underline",
                }}
                onClick={() => {
                  onOpen({ submission });
                }}
              >
                see more
              </button>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div>
      <Navbar />
      <br></br>
      <div>
        <div
          className="containerWide"
          style={{ display: "flex", alignItems: "center" }}
        >
          <h3>Submissions from:</h3>
          <Form
            onSubmit={handleFilter}
            style={{ marginLeft: 10, display: "flex", alignItems: "center" }}
          >
            <Form.Group id="filter">
              <Form.Control ref={filterRef} as="select">
                <option>Public</option>
                <option>{school}</option>
                {modules.map((mod) => (
                  <option>{mod}</option>
                ))}
              </Form.Control>
            </Form.Group>
            <Button className="btnForFilter" type="submit">
              Filter
            </Button>
          </Form>
        </div>
        <RenderSubmissions />
      </div>
    </div>
  );
};

export default ExplorePage;

//.filter(submission => submission[0]!=user.displayName)
