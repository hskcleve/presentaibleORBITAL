import firebase from "firebase";
import { React, useState, useEffect } from "react";
import { db, storageRef } from "../firebase";

const SubmitSubmission = () => {
  const user = firebase.auth().currentUser;
  const uid = user.uid;
  const [currentSubmission, setCurrentSubmission] = useState("");
  const [school, setSchool] = useState("");
  const [file, setFile] = useState();
  const UniqueIdentifier = Math.floor(Math.random() * (1000000 - 1 + 1)) + 1;

  useEffect(() => {
    getSchool();
  }, []);

  const getSchool = () => {
    console.log("getSchool called!");
    db.collection("users")
      .where("name", "==", user.displayName)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          setSchool(data.school);
        });
      });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    if (!currentSubmission) {
      alert("Cannot submit empty script!");
      return;
    }
    getSchool();

    addSubmissionToDB(uid, currentSubmission, school, file);

    setCurrentSubmission("");
    if (file != undefined) {
      const fileRef = storageRef.child("" + UniqueIdentifier + "/" + file.name);
      fileRef
        .put(file)
        .then(() => {
          console.log("" + file.name + " has been uploaded.");
        })
        .catch((error) => console.log("failed to upload", error));
    }
    console.log("submission submitted with school set to: " + school);
  };

  function addSubmissionToDB(uid, content, school, file) {
    const fileName = file != undefined ? file.name : "";
    console.log("tried to add submissions db");
    db.collection("submissions")
      .add({
        author: uid,
        content: content,
        school: school,
        attachedFileName: fileName,
      })
      .then((doc) => {
        const postId = doc.path;
        updateUserPostsArray(uid, postId);
      });
  }

  function updateUserPostsArray(uid, postId) {
    console.log("tried to update user's posts field, post id was " + postId);
    db.collection("users")
      .doc(uid)
      .update({ posts: firebase.firestore.FieldValue.arrayUnion(postId) });
  }

  const handleSubmissionAdd = (event) => {
    setCurrentSubmission(event.target.value);
  };

  const handleFileAttachment = (event) => {
    setFile(event.target.files[0]);
  };

  return (
    <div style={{ marginTop: 30 }}>
      <form onSubmit={onSubmit}>
        Add a new submission:
        <textarea
          id="script"
          name="script"
          type="text"
          placeholder=" Upload a new script!"
          value={currentSubmission}
          onChange={handleSubmissionAdd}
          style={{
            minHeight: 250,
            maxHeight: 250,
            minWidth: 435,
            maxWidth: 435,
            fontFamily: "Helvetica Neue",
            fontSize: 15,
          }}
        />
        <br></br>
        <input type="file" onChange={handleFileAttachment} />
        <div className="center">
          <input className="btn" type="submit" value="Add Submission" />
        </div>
      </form>
    </div>
  );
};

export default SubmitSubmission;
