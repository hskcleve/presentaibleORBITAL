import firebase from "firebase";
import { useEffect, useState } from "react";
import { db } from "../firebase";

const Classes = () => {
  const { currentUser } = firebase.auth();
  const uid = currentUser.uid;
  const [userDoc, setUserDoc] = useState({});

  //should assign each classData to a viewClass component
  const loadClasses = () => {
    if (classes === undefined) {
      return <h3>no classes yet</h3>;
    } else {
      return classes.map((classData) => (
        <div>
          <h4>{classData.className}</h4>
          <h5>{classData.tutorName}</h5>
          <h5>{classData.maoxin}</h5>
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
  const classes = userDoc.classes;
  console.log(classes);

  return (
    <>
      <h2>{loadClasses()}</h2>
    </>
  );
};

export default Classes;
