import firebase from "firebase";
import { useState, useEffect, useRef } from "react";
import { db } from "../firebase";
import { useHistory } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import Feedback from "../components/Feedback";

const ViewSubmissionByClass = (props) => {
  const user = firebase.auth().currentUser;
  const userUID = user.uid;
  const [submissions, setSubmissions] = useState([]);
  const history = useHistory();
  const modules = props.modules;
  const filterRef = useRef();
  const [currentFilter, setCurrentFilter] = useState("None");

  useEffect(() => {
    getSchoolSubmissions();
  }, [currentFilter]);

  async function handleFilter(e) {
    e.preventDefault();
    setCurrentFilter(filterRef.current.value);
    console.log("current filter: " + filterRef.current.value);
  }

  const getSchoolSubmissions = () => {
    if (currentFilter === "None") {
      setSubmissions([]);
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
    }
  };

  const onOpen = ({ submission }) => {
    history.push("/viewpost/" + submission[2]);
  };

  const getColor = () => {
    return "#EAD7C3";
  };

  const RenderSubmissions = () => {
    if (submissions.length === 0) {
      return (
        <div style={{ textAlign: "center", marginTop: 200, color: "whitesmoke" }}>
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
          maxWidth: 800,
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
                {submission[1].split(" ").slice(0, 20).join(" ") + " ..."}
              </div>
              <div style={{ display: "flex", justifyContent: "center" }}>
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
      <br></br>
      <div>
        <div
          className="containerWide"
          style={{
            minWidth: 800,
            maxWidth: 800,
            display: "flex",
            alignItems: "center",
          }}
        >
          <h3>Submissions in:</h3>
          <Form
            onSubmit={handleFilter}
            style={{ marginLeft: 10, display: "flex", alignItems: "center" }}
          >
            <Form.Group id="filter">
              <Form.Control ref={filterRef} as="select">
                <option>None</option>
                {modules.map((mod) => (
                  <option>{mod.className}</option>
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

export default ViewSubmissionByClass;
