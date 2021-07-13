import React, { useState, useEffect } from "react";
import { db } from "../firebase";

const EditClass = (props) => {
  const { isTutor, classData } = props;
  const classId = classData.classId;
  const [studentInfo, setstudentInfo] = useState([]);
  const [moduleDelete, setModuleDelete] = useState(false);
  const [initialInfo, setInitialInfo] = useState([]);
  const handleRealDelete = props.handleDelete;

  useEffect(() => {
    const docInfo = db
      .collection("classes")
      .doc(classId)
      .get()
      .then((doc) => {
        if (doc.exists) {
          setstudentInfo(doc.data().students);
          setInitialInfo(doc.data().students);
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
    setModuleDelete(false);
  };
  //todo -> update database after discussing with cleve
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
        <div className="classContainer" style={{display:'flex', justifyContent:'space-between'}} key={index}>
          <div>
            {capitalize(studentData.name)}
            <h6>Student ID :{studentData.studentId}</h6>
          </div>
          <div><button onClick={() => handleKick(studentData.studentId)} className="kick-button">
            <i class="fa fa-trash"></i>
          </button></div>
        </div>
      ))
    );
  };

  const capitalize = (s) => (s && s[0].toUpperCase() + s.slice(1)) || "";
  const handleDelete = () => setModuleDelete(!moduleDelete);
  const handleConfirm = () => {
    console.log("confirm clicked");
    handleHide();
    if (moduleDelete) {
      handleRealDelete();
    }
    /*
    replace array with current studentInfo array in the db
    */
  };
  const handleRevert = () => {
    setModuleDelete(false);
    setstudentInfo(initialInfo);
  };

  function loadButton(isTutor, classData) {
    if (isTutor) {
      return (
        <>
          <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
          ></link>
          <button onClick={handleShow} className="btn" style={{fontSize:12, padding:0, textDecorationLine:'underline', backgroundColor:'transparent'}}>
            Edit
          </button>
          <div id={"module-modal" + classId} className="module-modal">
            <div className="module-modal-content">
              <div className="module-modal-body">
              <div style={{display:'flex', justifyContent:'space-between', margin:10, marginBottom:30}}>
                <h1>
                  {classData.className}
                  <div className="underline"></div>
                </h1>
                <div style={{display:'flex'}}>
                
                  <button onClick={handleRevert} className="revert-module">
                    <i class="fa fa-refresh"></i> Revert
                  </button>
                  <button onClick={handleDelete} className="delete-module">
                    <i class="fa fa-close"></i>
                    {"  "}Delete
                  </button>
                
                </div>
                </div>

                {loadStudents()}
                {moduleDelete && (
                  <div style={{textAlign:'center', fontSize:15, color:'maroon'}}>
                      Click confirm for module deletion. This action is irreversible!
                  </div>
                )}
                {!moduleDelete && (
                  <div style={{textAlign:'center', fontSize:15, color:'transparent'}}>
                    .
              </div>
                )} 
                <div className="center">
                  <button onClick={handleConfirm} className="btn">
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
