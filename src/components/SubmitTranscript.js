import firebase from "firebase";
import { React, useState, useEffect } from "react";
import { db, storageRef } from '../firebase';

const SubmitTranscript = ({transcript}) => {
    const user = firebase.auth().currentUser;
    const [currentSubmission, setCurrentSubmission] = useState('');
    const [school, setSchool] = useState('');
    const [file, setFile] = useState();
    const userUID = user.uid;
    const [postUID, setPostUID] = useState('');

    useEffect(() => {
        getSchool();
    }, [])

    useEffect(()=>{
        setCurrentSubmission(transcript);
    }, [transcript])

    const getSchool = () => {
        console.log('getSchool called!');
        db.collection("users").doc(userUID).get().then((doc)=>{
          const data = doc.data();
          setSchool(data.school);
          console.log('getSchool has set school to ' + school);
        }).catch((error) => {console.log("error in getSchool", error);})
    }

    const onSubmit = (event) => {
      setPostUID("");
      getSchool();
        event.preventDefault();
        if(!currentSubmission) {
            alert('Cannot submit empty script!')
            return
        }
            db.collection('submissions').add({
                title: currentSubmissionTitle,
                author: user.displayName,
                userUID: userUID,
                content: currentSubmission,
                school: school,
            }).then((docRef) => {
              db.collection('users').doc(userUID).update({
                posts: firebase.firestore.FieldValue.arrayUnion(docRef.id)
              })
            });
        setCurrentSubmission("");
        setCurrentSubmissionTitle("");
    }
  
    const handleSubmissionAdd = (event) => {
        setCurrentSubmission(event.target.value);
    }

    const [currentSubmissionTitle, setCurrentSubmissionTitle] = useState('');

    const handleTitleChange = (event) => {
      setCurrentSubmissionTitle(event.target.value);
    }

    return (
        <div style={{marginTop:30}}>
            <form onSubmit={onSubmit}>
                    <h2>Add a new transcript:</h2>
                    <input type='text'
                            placeholder='Title...'
                            value={currentSubmissionTitle}
                            onChange={handleTitleChange}
                            style={{minHeight:30, maxHeight:30, minWidth:435, maxWidth:435,
                              fontFamily: "Helvetica Neue", fontSize:15}}
                            />
                            <br></br>
                    <textarea id="script" name="script"
                        type='text'
                        placeholder=' Edit your generated transcript here!'
                        value={currentSubmission}
                        onChange={handleSubmissionAdd} 
                        style={{minHeight:250, maxHeight:250, minWidth:435, maxWidth:435,
                        fontFamily: "Helvetica Neue", fontSize:15}}/>
                        <br></br>
                <div className='center'>
                    <input className='btn' type='submit' value='Add Submission' />
                </div>
            </form>
        </div>
    )
}

export default SubmitTranscript
