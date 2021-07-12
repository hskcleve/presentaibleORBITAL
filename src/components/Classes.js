import firebase from "firebase";
import { useEffect, useState } from "react";
import { db } from "../firebase";
import { Card } from "react-bootstrap";
import EditClass from "./EditClass";

const Classes = (props) => {
  const modInfo = props.modules;
  const isTutor = props.tutorRole;
  console.log("debugging classes", modInfo);

  //should assign each classData to a viewClass component
  const loadClasses = () => {
    return modInfo.map((classData, index) => (
      <div key={index} className="classContainer">
        <h4>Module code: {classData.className}</h4>
        <h5>Tutor: {classData.tutorName}</h5>
        {<EditClass isTutor={isTutor} classData={classData}></EditClass>}
      </div>
    ));
  };

  return (
    <>
      <div>{loadClasses()}</div>
    </>
  );
};

export default Classes;
