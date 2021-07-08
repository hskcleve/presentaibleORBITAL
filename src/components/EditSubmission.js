import firebase from "firebase";
import { React, useState,useEffect } from "react";
import { db } from "../firebase";
import { useHistory } from "react-router-dom";

const EditSubmission = (props) => {
  const user = firebase.auth().currentUser;
  const [currentSubmission, setCurrentSubmission] = useState("");
  const history = useHistory();

  useEffect(()=>{
    setCurrentSubmission(props.previousContent)
  },[])

  const handleSubmit = (event) => {
    const postRef = db.collection("submissions").doc(String(props.postUID));
    postRef.update({
      content: currentSubmission
    }).then(()=>{
      console.log('post updated.')
      window.location.reload(true); //non cached refresh if true, cached if false
    })
  };

  const handleSubmissionAdd = (event) => {
    setCurrentSubmission(event.target.value);
  };

  const handleShow = () => {
    var modal = document.getElementById("submission-modal");
    modal.style.display = "contents";
  };
  const handleHide = () => {
    var modal = document.getElementById("submission-modal");
    modal.style.display = "none";
  };

  return (
    <>
      <button className='btnMargin' onClick={handleShow}>Edit Submission</button>
      <div
        id="submission-modal"
        className="submission-modal"
        style={{ marginTop: 30 }}
      >
        <div className="submission-modal-content">
          <div className="submission-modal-body" style={{backgroundColor:'rgba(202, 202, 202, 0.644)', borderRadius:10}}>
            <form>
              <h2 style={{ margin: 5 }}>Edit your submission:</h2>
              <br></br>
              <textarea
                id="script"
                name="script"
                type="text"
                value={currentSubmission}
                onChange={handleSubmissionAdd}
                style={{
                  background: 'rgba(300, 300, 300, 0.6)',
                  border: '1px solid #888',
                  margin: 5,
                  minHeight: 250,
                  minWidth: 610,
                  fontFamily: "Helvetica Neue",
                  fontSize: 15,
                  resize: 'none'
                }}
              />
              <br></br>
            </form>
            <div className="center">
            <button onClick={handleSubmit} className="btn">
              Submit
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
};

export default EditSubmission;

/*
 */
