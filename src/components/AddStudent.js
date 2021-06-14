import { Button, Form, Modal, Popover } from "react-bootstrap";
import firebase from "firebase";
import { db } from "../firebase";
import { useState, useRef, useEffect } from "react";

//higher level component should check if user is a tutor before rendering this
const AddStudent = (props) => {
  const { currentUser } = firebase.auth();
  const [show, setShow] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const studentIdRef = useRef("");
  const classRef = useRef("");

  const handleShow = () => setShow(true);
  const handleHide = () => setShow(false);

  function showOptions(modInfo) {
    return modInfo.modules.map((item, i) => {
      return (
        <option key={i} value={item.className}>
          {item.className}
        </option>
      );
    });
  }

  const handleSubmit = () => {
    const classInfo = getClassInfoByName(classRef.current.value);
    console.log(classInfo);
    const studentId = studentIdRef.current.value;
    addStudentToClass(studentId, classInfo.classId);
    updateStudentData(studentId, classInfo);
    return handleHide();
  };

  async function addStudentToClass(studentId, classId) {
    console.log("student " + studentId + "added to class " + classId);
    const studentName = await getStudentNameById(studentId);
    console.log("we are trying to add Mr. " + studentName);
    db.collection("classes")
      .doc(classId)
      .update({
        students: firebase.firestore.FieldValue.arrayUnion({
          name: studentName,
          submissions: [],
          grade: "",
        }),
      })
      .then((doc) => {
        console.log("student added to /classes");
      })
      .catch((error) => console.log(error));
  }

  function updateStudentData(studentID, classInfo) {
    //classInfo contains classId, className, tutorName
    const classId = classInfo.classId;
    const className = classInfo.className;
    const tutorName = classInfo.tutorName;
    db.collection("users")
      .doc(studentID)
      .update({
        classes: firebase.firestore.FieldValue.arrayUnion({
          classId: classId,
          className: className,
          tutorName: tutorName,
        }),
      })
      .then((doc) => console.log("studentData updated"))
      .catch((error) => console.log(error));
  }

  async function getStudentNameById(studentId) {
    let studentName = "";
    await db
      .collection("users")
      .doc(studentId)
      .get()
      .then((doc) => {
        if (doc.exists) {
          studentName = doc.data().name;
        } else {
          setErrorMessage("No such student, check Id is correct");
        }
      });
    if (studentName === "") {
      setErrorMessage("No such student, check Id is correct");
    } else {
      return studentName;
    }
  }

  function getClassInfoByName(name) {
    console.log(name + " props are " + props.modules);
    return props.modules.filter((mod) => mod.className == name)[0];
  }

  return (
    <>
      <Button onClick={handleShow}>Add Student</Button>
      <Modal show={show} onHide={handleHide} backdrop="static" keyboard={true}>
        <Modal.Body>
          <Form>
            <Form.Label style={{ fontSize: 24 }}>
              <strong>Add Student</strong>
            </Form.Label>
            <br></br>
            <Form.Label style={{ color: "red" }}>{errorMessage}</Form.Label>
            <Form.Group>
              <Form.Label>Student ID *</Form.Label>
              <Form.Control
                id="moduleCodeInfo"
                required
                ref={studentIdRef}
                type="text "
              ></Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>Class to add to</Form.Label>
              <Form.Control
                placeholder="Choose your class"
                ref={classRef}
                as="select"
              >
                {showOptions(props)}
              </Form.Control>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button className="modal-action-btn" onClick={handleSubmit}>
            Add Student
          </Button>
          <Button className="modal-close-btn" onClick={handleHide}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AddStudent;