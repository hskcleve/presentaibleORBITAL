import firebase from "firebase";
import { useEffect, useState } from "react";
import { db } from "../firebase";
import { Card } from "react-bootstrap";

const Classes = (props) => {
  const modInfo = props.modules;

  //should assign each classData to a viewClass component
  const loadClasses = () => {
    return modInfo.map((classData) => (
      <div className="classContainer">
        <h4>Module code: {classData.className}</h4>
        <h5>Tutor: {classData.tutorName}</h5>
        <h5>Class ID: {classData.classId}</h5>
        <h5>{classData.maoxin}</h5>
      </div>
    ));
  };

  return (
    <>
      <Card>{loadClasses()}</Card>
    </>
  );
};

export default Classes;
