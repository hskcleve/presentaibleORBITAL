import firebase from "firebase";
import { useEffect, useState } from "react";
import { db } from "../firebase";
import { Card } from "react-bootstrap";

const Classes = () => {
  const { currentUser } = firebase.auth();
  const uid = currentUser.uid;
  const [userDoc, setUserDoc] = useState({});
  const classes = userDoc.classes;

  //should assign each classData to a viewClass component
  const loadClasses = () => {
    if (classes === undefined) {
      return <h3>no classes yet</h3>;
    } else {
      return classes.map((classData) => (
        <div className="classes-wrap">
          <h4>Module code: {classData.className}</h4>
          <h5>Tutor: {classData.tutorName}</h5>
          <h5>Class ID: {classData.classId}</h5>
          <h5>{classData.maoxin}</h5>
          <h5>Number of Students: {classData.students}</h5>
        </div>
      ));
    }
  };

  useEffect(() => {
    const setDoc = db
      .collection("users")
      .doc(uid)
      .get()
      .then((doc) => setUserDoc(doc.data()));
  }, []);
  //contains the array of class objects(json) from users/uid

  console.log(classes);

  return (
    <>
      <Card>{loadClasses()}</Card>
    </>
  );
};

export default Classes;
