import firebase from "firebase";
import { useEffect, useState } from "react";
import { db } from "../firebase";
import { Card } from "react-bootstrap";
import EditClass from "./EditClass";

const Classes = (props) => {
  const [modInfo, setModInfo] = useState(props.modules);
  const isTutor = props.tutorRole;
  console.log("debugging classes", modInfo);

  const handleDelete = (classId) => {
    const currentModInfo = modInfo;
    const remaindingModInfo = modInfo.filter((x) => x.classId !== classId);
    setModInfo(remaindingModInfo);
  };

  //should assign each classData to a viewClass component
  const loadClasses = () => {
    return modInfo.map((classData, index) => (
      <div key={index} className="classContainer" style={{display:'flex', justifyContent:'space-between'}}>
        <div><h4>Module code: {classData.className}</h4>
        <h5>Tutor: {classData.tutorName}</h5></div>
        <div style={{marginRight:7}}>{
          <EditClass
            handleDelete={() => handleDelete(classData.classId)}
            isTutor={isTutor}
            classData={classData}
          ></EditClass>
        }</div>
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
