import React, { useState, useEffect } from "react";
import { db } from "../firebase";

const EditClass = (props) => {
  const { isTutor, classData } = props;
  const classId = classData.classId;
  const [studentInfo, setstudentInfo] = useState([]);

  useEffect(() => {
    const docInfo = db
      .collection("classes")
      .doc(classId)
      .get()
      .then((doc) => {
        if (doc.exists) {
          setstudentInfo(doc.data().students);
        }
      });
    console.log("student info are", studentInfo);
  }, []);

  const handleShow = () => {
    var modal = document.getElementById("module-modal" + classId);
    modal.style.display = "contents";
  };
  const handleHide = () => {
    var modal = document.getElementById("module-modal" + classId);
    modal.style.display = "none";
  };
  const handleKick = (studentId) => {
    const currentStudentInfo = studentInfo;
    const remaindingStudentInfo = studentInfo.filter((x) => x.studentId !== studentId);
    console.log("kicked one now left", remaindingStudentInfo);
    setstudentInfo(remaindingStudentInfo);
  };
  const loadStudents = () => {
    return studentInfo.length === 0 ? (
      <div className="no-students">No students yet</div>
    ) : (
      studentInfo.map((studentData, index) => (
        <div className="classContainer" key={index}>
          <div>
            {capitalize(studentData.name)}
            <h6>Student ID :{studentData.studentId}</h6>
          </div>
          <button onClick={() => handleKick(studentData.studentId)} className="kick-button">
            <i class="fa fa-trash"></i>
          </button>
        </div>
      ))
    );
  };

  const capitalize = (s) => (s && s[0].toUpperCase() + s.slice(1)) || "";

  function loadButton(isTutor, classData) {
    if (isTutor) {
      return (
        <>
          <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
          ></link>
          <button onClick={handleShow} className="edit-class-button">
            Edit
          </button>
          <div id={"module-modal" + classId} className="module-modal">
            <div className="module-modal-content">
              <div className="module-modal-body">
                <h1>
                  {classData.className}
                  <div className="underline"></div>
                </h1>
                {loadStudents()}
                <div className="center">
                  <button onClick={() => console.log(classData)} className="btn">
                    Confirm
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
    } else {
      return <></>;
    }
  }

  return <>{loadButton(isTutor, classData)}</>;
};

export default EditClass;