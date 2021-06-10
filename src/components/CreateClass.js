import { Button, Form, Modal, Popover } from "react-bootstrap";
import firebase from "firebase";
import { db } from "../firebase";
import { useState, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

//higher level component should check if user is a tutor before rendering this
const CreateClass = () => {
  const { currentUser } = firebase.auth();
  const [show, setShow] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const moduleRef = useRef("");
  const passRef = useRef("");

  function createClass() {
    const moduleName = moduleRef.current.value;
    db.collection("classes")
      .add({
        name: moduleName,
        password: passRef.current.value,
        students: [],
        tutorId: currentUser.uid,
        tutorName: currentUser.displayName,
      })
      .then((docu) => {
        console.log("a class is created at " + docu.path);
        updateUserClassesField(moduleName, docu.path);
      })
      .catch((error) => console.log(error));
  }

  function updateUserClassesField(className, path) {
    const docuPath = path.split("/");
    console.log(docuPath[1]);
    db.collection("users")
      .doc(currentUser.uid)
      .update({
        classes: firebase.firestore.FieldValue.arrayUnion({
          className: className,
          tutorName: currentUser.displayName,
          classId: docuPath[1],
        }),
      });
  }

  const handleShow = () => setShow(true);
  const handleHide = () => setShow(false);
  const handleSubmit = () => {
    setErrorMessage("");
    console.log(moduleRef.current.value);
    if (moduleRef.current.value !== "") {
      createClass();
      handleHide();
    } else {
      setErrorMessage("Need to fill up Module Code");
    }
    return moduleRef.current.value !== "" ? handleHide : handleShow;
  };

  return (
    <>
      <Button onClick={handleShow}>Create Class</Button>
      <Modal show={show} onHide={handleHide} backdrop="static" keyboard={true}>
        <Modal.Body>
          <Form>
            <Form.Label style={{ fontSize: 24 }}>
              <strong>Create Class</strong>
            </Form.Label>
            <br></br>
            <Form.Label style={{ color: "red" }}>{errorMessage}</Form.Label>
            <Form.Group>
              <Form.Label>Module Code *</Form.Label>
              <Form.Control
                id="moduleCodeInfo"
                required
                ref={moduleRef}
                type="text "
              ></Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>Set a password</Form.Label>
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
            Create Class
          </Button>
          <Button variant="danger" onClick={handleHide}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default CreateClass;
