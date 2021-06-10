import { Button, Form, Modal, Popover } from "react-bootstrap";
import firebase from "firebase";
import { db } from "../firebase";
import { useState, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

//higher level component should check if user is a tutor before rendering this
const JoinClass = () => {
  const { currentUser } = firebase.auth();
  const [show, setShow] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const classIdRef = useRef("");
  const passRef = useRef("");

  async function joinClass(classId) {
    console.log("joinClass called");
    db.collection("classes")
      .doc(classId)
      .update({
        students: firebase.firestore.FieldValue.arrayUnion({
          name: currentUser.displayName,
          submissions: [],
          grade: "",
        }),
      })
      .then((doc) => {
        console.log("student added to /classes");
      })
      .catch((error) => console.log(error));
  }

  async function passwordCorrect(classId, password) {
    console.log("checking password");
    let isCorrect = false;
    await db
      .collection("classes")
      .doc(classId)
      .get()
      .then((doc) => {
        if (doc.exists) {
          console.log(doc.data().password === password);
          isCorrect = doc.data().password == password;
        } else {
          console.log("doc doesnt exists");
        }
      })
      .catch((error) => console.log(error));
    return isCorrect;
  }

  async function updateUserClassesField(classId) {
    db.collection("classes")
      .doc(classId)
      .get()
      .then((doc) => {
        const name = doc.data().name;
        const tutorName = doc.data().tutorName;
        db.collection("users")
          .doc(currentUser.uid)
          .update({
            classes: firebase.firestore.FieldValue.arrayUnion({
              classId: classId,
              className: name,
              tutorName: tutorName,
            }),
          });
      })
      .catch((error) => console.log(error));
    console.log("successfully updated user class field");
  }

  const handleShow = () => setShow(true);
  const handleHide = () => setShow(false);

  async function handleSubmit() {
    const classId = classIdRef.current.value;
    setErrorMessage("");
    if (await passwordCorrect(classId, passRef.current.value)) {
      console.log("join class successfully");
      joinClass(classId);
      updateUserClassesField(classId);
      handleHide();
    } else if (classIdRef.current.value === "") {
      setErrorMessage("Class ID required");
    } else {
      setErrorMessage("Class ID or password incorrect, contact your tutor");
    }
    return classIdRef.current.value !== "" ? handleHide : handleShow;
  }

  return (
    <>
      <Button variant="secondary" onClick={handleShow}>
        Join Class
      </Button>
      <Modal show={show} onHide={handleHide} backdrop="static" keyboard={true}>
        <Modal.Body>
          <Form>
            <Form.Label style={{ fontSize: 24 }}>
              <strong>Join Class</strong>
            </Form.Label>
            <br></br>
            <Form.Label style={{ color: "red" }}>{errorMessage}</Form.Label>
            <Form.Group>
              <Form.Label>Class ID *</Form.Label>
              <Form.Control
                id="moduleCodeInfo"
                required
                ref={classIdRef}
                type="text "
              ></Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>Enter the password</Form.Label>
              <Form.Control
                id="passwordInfo"
                required
                ref={passRef}
                type="text"
              ></Form.Control>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="info" onClick={handleSubmit}>
            Join Class
          </Button>
          <Button variant="danger" onClick={handleHide}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default JoinClass;
