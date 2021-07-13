import firebase from "firebase";
import { useEffect, useState } from "react";
import { db } from "../firebase";
import { Card } from "react-bootstrap";
import EditClass from "./EditClass";

const Classes = (props) => {
  const [modInfo, setModInfo] = useState(props.modules);
  const isTutor = props.tutorRole;
  console.log("debugging classes", modInfo);
  const school = props.school;

  const handleDelete = (classId, className) => {
    const currentModInfo = modInfo;
    const remaindingModInfo = modInfo.filter((x) => x.classId !== classId);
    setModInfo(remaindingModInfo);
    //deleting for each student and tutor in classes
    const classDocRef = db.collection("classes").doc(classId);
    classDocRef.get().then((queryResult) => {
      const studentInfoArray = queryResult.data().students;
      let temp = [];
      temp = studentInfoArray.map((x) => x.studentId);
      temp.push(queryResult.data().tutorId);
      console.log("student info array", temp);
      temp.forEach((studentId) => {
        db.collection("users")
          .doc(studentId)
          .get()
          .then((queryResult) => {
            //read db
            var tempClassesArray = queryResult.data().classes;
            //high level plays
            //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/flatMap#for_adding_and_removing_items_during_a_map
            //https://stackoverflow.com/questions/38922998/add-property-to-an-array-of-objects
            var newClassesArray = tempClassesArray.flatMap((x) =>
              x.classId === classId ? [x].map((y) => ({ ...y, deleted: true })) : [x],
            );
            console.log("newclassesarray ", newClassesArray);
            //finally update db
            db.collection("users").doc(studentId).update({ classes: newClassesArray });
          });
      });
      //removing class from database
      db.collection("classes").doc(classId).delete();
      db.collection("schools")
        .doc(school)
        .update({
          Modules: firebase.firestore.FieldValue.arrayRemove({
            classId: classId,
            className: className,
          }),
        });
      db.collection("schools").doc(school).collection("Modules").doc(className).delete();
    });
  };

  //should assign each classData to a viewClass component
  const loadClasses = () => {
    return modInfo.map((classData, index) => (
      <div
        key={index}
        className="classContainer"
        style={{ display: "flex", justifyContent: "space-between" }}
      >
        <div>
          <h4>Module code: {classData.className}</h4>
          <h5>Tutor: {classData.tutorName}</h5>
        </div>
        <div style={{ marginRight: 7 }}>
          {
            <EditClass
              handleDelete={() => handleDelete(classData.classId, classData.className)}
              isTutor={isTutor}
              classData={classData}
            ></EditClass>
          }
        </div>
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
