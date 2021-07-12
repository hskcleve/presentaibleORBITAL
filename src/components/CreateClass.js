import { Button, Form, Modal, Popover } from "react-bootstrap";
import firebase from "firebase";
import { db } from "../firebase";
import { useState, useRef } from "react";

//higher level component should check if user is a tutor before rendering this
const CreateClass = (props) => {
  const { currentUser } = firebase.auth();
  const [show, setShow] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const moduleRef = useRef("");
  const passRef = useRef("");
  const { school } = props;

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
    //updates database;
    db.collection("schools").doc(school).collection("Modules").doc(moduleName).set({});
  }

  function updateUserClassesField(className, path) {
    const docuPath = path.split("/");
    console.log(docuPath[1]);
    const classId = docuPath[1];
    db.collection("users")
      .doc(currentUser.uid)
      .update({
        classes: firebase.firestore.FieldValue.arrayUnion({
          className: className,
          tutorName: currentUser.displayName,
          classId: classId,
        }),
      });
    updateSchoolFields(classId, className);
  }

  function updateSchoolFields(classId, className) {
    db.collection("schools")
      .doc(school)
      .update({
        Modules: firebase.firestore.FieldValue.arrayUnion({
          classId: classId,
          className: className,
        }),
      });
  }

  //todo
  async function moduleExist(moduleName, schoolName) {
    var moduleExists = false;
    await db
      .collection("schools")
      .doc(schoolName)
      .collection("Modules")
      .doc(moduleName)
      .get()
      .then((doc) => {
        moduleExists = doc.exists;
        console.log("await done");
      });
    console.log(moduleExists);
    return moduleExists;
  }

  const handleShow = () => {
    console.log(school);
    setErrorMessage("");
    setShow(true);
  };

  const handleHide = () => setShow(false);
  const handleSubmit = () => {
    console.log(moduleRef.current.value);
    let moduleCodeTaken = false;

    if (moduleRef.current.value === "") {
      setErrorMessage("Module Code required");
    } else if (moduleRef.current.value.length > 15) {
      setErrorMessage("Module Code must be a maximum of 15 characters long");
    } else {
      moduleExist(moduleRef.current.value, school).then((result) => {
        if (result) {
          //module already exists
          console.log("somehow module exists");
          setErrorMessage("Module Code exists, check with faculty coordinator");
        } else {
          createClass();
          handleHide();
        }
      });
    }
  };

  return (
    <>
      <button className="btnMargin" onClick={handleShow}>
        Create Class
      </button>
      <Modal show={show} onHide={handleHide} backdrop="static" keyboard={true}>
        <Modal.Body>
          <Form>
            <Form.Label style={{ fontSize: 24 }}>
              <strong>Create Class</strong>
              <br></br>
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
            <br></br>
            <Form.Group>
              <Form.Label>Set a password</Form.Label>
              <Form.Control id="passwordInfo" required ref={passRef} type="text"></Form.Control>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <div className="center">
            <button className="btn" onClick={handleSubmit}>
              Create Class
            </button>
            <button className="btn" onClick={handleHide}>
              Close
            </button>
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default CreateClass;
