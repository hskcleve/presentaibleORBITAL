import firebase from "firebase";
import { React, useState, useEffect } from "react";
import { db, storageRef } from '../firebase';

const SubmitSubmission = () => {
    const user = firebase.auth().currentUser;
    const [currentSubmission, setCurrentSubmission] = useState('');
    const [school, setSchool] = useState('');
    const [file, setFile] = useState();
    const UniqueIdentifier = Math.floor(Math.random() * (1000000-1+1)) + 1;

    useEffect(() => {
        getSchool();
    }, [])

    const getSchool = () => {
        console.log('getSchool called!');
        db.collection('users').where("name", "==", user.displayName)
        .get()
        .then( querySnapshot => {
            querySnapshot.forEach( (doc) => {
                const data = doc.data();
                setSchool(data.school);
            })
        })
    }

    const onSubmit = (event) => {
        event.preventDefault();
        if(!currentSubmission) {
            alert('Cannot submit empty script!')
            return
        }
        getSchool();
        if (file!=undefined){
            db.collection('submissions').add({
                author: user.displayName,
                UID: UniqueIdentifier,
                content: currentSubmission,
                school: school,
                attachedFileName: file.name,
            });
        } else {
            db.collection('submissions').add({
                author: user.displayName,
                UID: UniqueIdentifier,
                content: currentSubmission,
                school: school,
            });
        }
        setCurrentSubmission("");
        if (file!=undefined){
            const fileRef = storageRef.child("" + UniqueIdentifier + "/" + file.name);
            fileRef.put(file).then( () => {
                console.log("" + file.name + " has been uploaded.");
            }).catch((error) => console.log("failed to upload", error));
        }
        console.log("submission submitted with school set to: " + school);
    }
  
    const handleSubmissionAdd = (event) => {
        setCurrentSubmission(event.target.value);
    }

    const handleFileAttachment = (event) => {
        setFile(event.target.files[0]);
    }

    return (
        <div>
            <form onSubmit={onSubmit}>
                <div className='form-control'>
                    <label>Add a new submission:</label>
                    <input type='text'
                        placeholder='Upload a new script'
                        value={currentSubmission}
                        onChange={handleSubmissionAdd} />
                    <input type = "file"
                        onChange={handleFileAttachment} />
                </div>
                <div className='center'>
                    <input className='btn' type='submit' value='Add Submission' />
                </div>
            </form>
        </div>
    )
}

export default SubmitSubmission
