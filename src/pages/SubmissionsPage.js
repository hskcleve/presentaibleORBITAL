import firebase from "firebase";
import { React, useState, useEffect, useRef } from "react";
import { db, storageRef } from "../firebase";
import { useHistory } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import Feedback from "../components/Feedback";

const SubmissionsPage = (props) => {
  const user = firebase.auth().currentUser;
  const userUID = user.uid;
  const history = useHistory();
  const [submissions, setSubmissions] = useState([]);
  const [modules, setModules] = useState([]);
  const filterRef = useRef();
  const [currentFilter, setCurrentFilter] = useState("");

  async function handleFilter(e) {
    e.preventDefault();
    setCurrentFilter(filterRef.current.value);
    console.log("current filter: " + filterRef.current.value);
  }

  useEffect(() => {
    getUserSubmissions();
    getModules();
    setCurrentFilter("All Classes");
  }, []);

  useEffect(() => {
    if (currentFilter === "All Classes") {
      getUserSubmissions();
      return;
    }
    db.collection("submissions")
      .where("userUID", "==", userUID)
      .get()
      .then((querySnapshot) => {
        const arr = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          const content = data.content;
          const postUID = doc.id;
          const postTitle = data.title;
          const timestamp = data.timeStamp;
          const good = data.good;
          const neutral = data.neutral;
          const bad = data.bad;
          const totalFeedbacks = data.totalFeedbacks;
          const modulename = data.moduleName;
          if (modulename === currentFilter) {
            arr.push([
              postUID, //0
              content, //1
              postTitle, //2
              timestamp, //3
              good, //4
              neutral, //5
              bad, //6
              totalFeedbacks, //7
            ]);
          }
        });
        setSubmissions(arr);
      });
  }, [currentFilter]);

  const getColor = () => {
    switch (currentFilter) {
      case "All Classes":
        return "rgba(41, 194, 166, 0.6)";
      default:
        return "rgba(237, 81, 14, 0.6)";
    }
  };

  const getModules = () => {
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

  const getUserSubmissions = () => {
    db.collection("submissions")
      .where("userUID", "==", userUID)
      .get()
      .then((querySnapshot) => {
        const arr = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          const content = data.content;
          const postUID = doc.id;
          const postTitle = data.title;
          const timestamp = data.timeStamp;
          const good = data.good;
          const neutral = data.neutral;
          const bad = data.bad;
          const totalFeedbacks = data.totalFeedbacks;
          arr.push([
            postUID, //0
            content, //1
            postTitle, //2
            timestamp, //3
            good, //4
            neutral, //5
            bad, //6
            totalFeedbacks, //7
          ]);
        });
        setSubmissions(arr);
      });
  };

  const onOpen = ({ submission }) => {
    history.push("/viewpost/" + submission[0]);
  };

  const onDelete = ({ submission }) => {
    db.collection("submissions")
      .doc(submission[0])
      .get()
      .then((doc) => {
        const data = doc.data();
        const richMedia = data.attachedFileName;
        const attachedFileRef = storageRef.child(
          "" + submission[0] + "/" + richMedia
        );
        attachedFileRef
          .delete()
          .then(() => {
            console.log("file deleted from cloud storage");
          })
          .catch((error) => console.log("failed to delete", error));
      })
      .catch((error) => console.log("failed to delete", error));

    db.collection("submissions").doc(submission[0]).delete();

    db.collection("comments")
      .where("PostUID", "==", submission[0])
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const docID = doc.id;
          db.collection("comments").doc(docID).delete();
        });
      });

    db.collection("users")
      .doc(userUID)
      .update({
        posts: firebase.firestore.FieldValue.arrayRemove(submission[0]),
      });
  };

  return (
    <div>
      <div
        className="containerWide"
        style={{ marginRight: 10, minWidth: 770}}
      >
        <h1>My Submissions</h1>
        <button
          className="btn"
          style={{
            backgroundColor: "transparent",
            textDecorationLine: "underline",
            fontStyle: "italic",
            fontSize: 12,
            padding: 0,
            margin: 0,
          }}
          onClick={() => {
            getUserSubmissions();
          }}
        >
          Refresh Submissions
        </button>
        <div style={{ display: "flex", alignItems: "center", marginTop: 30 , maxWidth:700}}>
          <p>Showing submissions from:</p>
          <Form
            onSubmit={handleFilter}
            style={{ marginLeft: 10, display: "flex", alignItems: "center" }}
          >
            <Form.Group id="filter">
              <Form.Control ref={filterRef} as="select">
                <option>All Classes</option>
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
        <div className="container-all-submissions">
          {submissions.map((submission, i) => (
            <div
              id={i}
              key={i}
              className="submissionLong"
              style={{
                fontSize: 12,
                minWidth: 700,
                maxWidth: 700,
                minHeight: 50,
                maxHeight: 400,
                backgroundColor: getColor(),
              }}
            >
              <div>
                <h2>{submission[2]}</h2>
                <div>Posted: {submission[3]}</div>
                <br></br>
                {submission[1].split(" ").slice(0, 30).join(" ") + " ..."}
              </div>

              <div
                style={{
                  textAlign: "center",
                  display: "flex",
                  flexDirection: "row",
                }}
              >
                <div className="dashboard-submission-feedback">
                  <Feedback
                    feedback={submission[7] != 0 && submission[7] != undefined}
                    badFeedbacks={submission[6]}
                    goodFeedbacks={submission[4]}
                    neutral={submission[5]}
                    isPost={true}
                  ></Feedback>
                </div>
                <div
                  style={{
                    textAlign: "center",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <button
                    className="btn"
                    style={{ fontSize: 10 }}
                    onClick={() => {
                      onOpen({ submission });
                    }}
                  >
                    Open
                  </button>
                  <button
                    className="btn"
                    style={{ fontSize: 10 }}
                    onClick={() => {
                      onDelete({ submission });
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SubmissionsPage;

/*

*/
