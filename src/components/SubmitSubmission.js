import firebase from "firebase";
import { React, useState, useEffect } from "react";
import { db } from '../firebase';

const SubmitSubmission = () => {
    const user = firebase.auth().currentUser;
    const [currentSubmission, setCurrentSubmission] = useState('');
    const [school, setSchool] = useState('');

    useEffect(() => {
        getSchool();
    }, [])

    const getSchool = () => {
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
        getSchool();
        event.preventDefault();
        db.collection('submissions').add({
            author: user.displayName,
            UID: Math.floor(Math.random() * (1000000-1+1)) + 1,
            content: currentSubmission,
            school: school,
        });
        setCurrentSubmission("");
        console.log("submission submitted with school set to: " + school);
    }
  
    const handleSubmissionAdd = (event) => {
        setCurrentSubmission(event.target.value)
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
                </div>
                <div className='center'>
                    <input className='btn' type='submit' value='Add Submission' />
                </div>
            </form>
        </div>
    )
}

export default SubmitSubmission
