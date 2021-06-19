import { Button, Form, Modal, Popover } from "react-bootstrap";
import firebase from "firebase";
import { db } from "../firebase";
import { useState, useRef } from "react";

//higher level component should check if user is a tutor before rendering this
const JoinClass = (props) => {
  const { currentUser } = firebase.auth();
  const [show, setShow] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const classIdRef = useRef("");
  const passRef = useRef("");

  function showOptions(modInfo) {
    return modInfo.length !== 0
      ? modInfo.map((item, i) => {
          return (
            <option key={i} value={item.className}>
              {item.className}
            </option>
          );
        })
      : "";
  }

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
    console.log(classId);
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

  const handleShow = () => {
    setErrorMessage("");
    setShow(true);
  };
  const handleHide = () => setShow(false);

  async function handleSubmit() {
    const moduleName = classIdRef.current.value;
    const classId = getClassInfoByName(moduleName).classId;
    console.log(classId);
    var passwordChecked = await passwordCorrect(classId, passRef.current.value);
    setErrorMessage("");
    if (classIdRef.current.value === "") {
      setErrorMessage("Class ID required");
    } else if (passwordChecked) {
      //not entirely sure await is not needed here
      console.log("join class successfully");
      joinClass(classId);
      updateUserClassesField(classId);
      handleHide();
    } else {
      setErrorMessage("Class ID or password incorrect, contact your tutor");
    }
    return classIdRef.current.value !== "" ? handleHide : handleShow;
  }

  function getClassInfoByName(name) {
    return props.modules.filter((mod) => mod.className == name)[0];
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
              <Form.Label>Class *</Form.Label>
              <Form.Control id="moduleCodeInfo" ref={classIdRef} as="select">
                {showOptions(props.modules)}
              </Form.Control>
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
          <Button className="modal-action-btn" onClick={handleSubmit}>
            Join Class
          </Button>
          <Button className="modal-close-btn" onClick={handleHide}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default JoinClass;
