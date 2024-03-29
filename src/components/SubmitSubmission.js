import firebase from "firebase";
import { React, useState } from "react";
import { Button } from "react-bootstrap";
import { db, storageRef } from "../firebase";

const SubmitSubmission = (props) => {
  const user = firebase.auth().currentUser;
  const [currentSubmission, setCurrentSubmission] = useState("");
  const [file, setFile] = useState();
  const userUID = user.uid;

  function showOptions(modInfo) {
    return modInfo.length !== 0
      ? modInfo.map((item, i) => {
          return (
            <>
              <option key={i} value={item.className}>
                {item.className}
              </option>
            </>
          );
        })
      : "";
  }

  const handleSubmit = (event) => {
    var moduleSelect = document.getElementById("submission-class-slt");
    const moduleTarget = moduleSelect.value;
    const timestamp = new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "numeric",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(Date.now());
    console.log("time of submission: " + timestamp.toString());
    console.log(moduleTarget);
    event.preventDefault();
    if (!currentSubmission) {
      alert("Cannot submit empty script!");
      return;
    }
    if (file != undefined) {
      db.collection("submissions")
        .add({
          title: currentSubmissionTitle,
          author: user.displayName,
          userUID: userUID,
          content: currentSubmission,
          school: props.school,
          attachedFileName: file.name,
          moduleName: moduleTarget,
          timeStamp: timestamp,
          good: 0,
          bad: 0,
          neutral: 0,
          totalFeedbacks: 0,
          weightage: "neutral",
        })
        .then((docRef) => {
          db.collection("users")
            .doc(userUID)
            .update({
              posts: firebase.firestore.FieldValue.arrayUnion(docRef.id),
            });
          const fileRef = storageRef.child("" + docRef.id + "/" + file.name);
          fileRef
            .put(file)
            .then(() => {
              console.log("" + file.name + " has been uploaded.");
              window.location.reload(true);
            })
            .catch((error) => console.log("failed to upload", error));
        });
    } else {
      db.collection("submissions")
        .add({
          title: currentSubmissionTitle,
          author: user.displayName,
          userUID: userUID,
          content: currentSubmission,
          school: props.school,
          moduleName: moduleTarget,
          timeStamp: timestamp,
          good: 0,
          bad: 0,
          neutral: 0,
          totalFeedbacks: 0,
          weightage: "neutral",
        })
        .then((docRef) => {
          db.collection("users")
            .doc(userUID)
            .update({
              posts: firebase.firestore.FieldValue.arrayUnion(docRef.id),
            }).then(()=>{window.location.reload(true)})
        });
    }
    setCurrentSubmission("");
    setCurrentSubmissionTitle("");
    handleHide();
  };

  const handleSubmissionAdd = (event) => {
    setCurrentSubmission(event.target.value);
  };

  const handleFileAttachment = (event) => {
    setFile(event.target.files[0]);
  };

  const [currentSubmissionTitle, setCurrentSubmissionTitle] = useState("");

  const handleTitleChange = (event) => {
    setCurrentSubmissionTitle(event.target.value);
  };

  const handleShow = () => {
    var modal = document.getElementById("submission-modal");
    modal.style.display = "contents";
  };
  const handleHide = () => {
    var modal = document.getElementById("submission-modal");
    modal.style.display = "none";
  };

  return (
    <>
      <button className="btnMargin" onClick={handleShow}>
        Add Submission
      </button>
      <div id="submission-modal" className="submission-modal" style={{ marginTop: 30 }}>
        <div className="submission-modal-content">
          <div
            className="submission-modal-body"
            style={{ backgroundColor: "rgba(202, 202, 202, 0.644)", borderRadius: 10 }}
          >
            <form>
              <h2 style={{ margin: 5 }}>Add a new submission:</h2>
              <input
                type="text"
                placeholder="Title..."
                value={currentSubmissionTitle}
                onChange={handleTitleChange}
                style={{
                  marginTop: 5,
                  minHeight: 30,
                  maxHeight: 30,
                  width: "100%",
                  fontFamily: "Helvetica Neue",
                  fontSize: 15,
                }}
              />
              <select
                style={{
                  marginTop: 5,
                  minHeight: 30,
                  maxHeight: 30,
                  width: "100%",
                  fontFamily: "Helvetica Neue",
                  fontSize: 15,
                }}
                className="submission-class-slt"
                id="submission-class-slt"
              >
                {showOptions(props.modules)}
                <option value={"Public"}>Public</option>
              </select>
              <br></br>
              <textarea
                id="script"
                name="script"
                type="text"
                placeholder=" Upload a new script!"
                value={currentSubmission}
                onChange={handleSubmissionAdd}
                style={{
                  marginTop: 5,
                  minHeight: 250,
                  maxHeight: 250,
                  width: "100%",
                  fontFamily: "Helvetica Neue",
                  fontSize: 15,
                }}
              />
              <br></br>
              <input type="file" onChange={handleFileAttachment} />
            </form>
            <div className="center">
              <button onClick={handleSubmit} className="btn">
                Submit
              </button>
              <button onClick={handleHide} className="btn">
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SubmitSubmission;

/*
 */
