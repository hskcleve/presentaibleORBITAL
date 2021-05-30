import firebase from "firebase";
import {React, useState} from "react";
import { db } from '../firebase'
import { FaTimes } from 'react-icons/fa'

const SubmissionsPage = () => {
    const user = firebase.auth().currentUser;
    const [submissions, setSubmissions] = useState([]);
    const [currentSubmission, setCurrentSubmission] = useState('');
    const [docID, setDocID] = useState('');

    const updateDocID = () => {
        console.log('Doc ID updated!')
        db.collection('users')
        .get()
        .then( snapshot => {
            snapshot.forEach( doc => {
                const data = doc.data()
                data.name === user.displayName ? setDocID(doc.id) : console.log('discarded ID')
            })
        })
    }

    const getUserSubmissions = () => {
        db.collection('users')
        .get()
        .then( snapshot => {
            snapshot.forEach( doc => {
                const data = doc.data()
                data.name === user.displayName ? setSubmissions(data.submissions): console.log('discard')
            })
        })
    }

    const onSubmit = (event) => {
        event.preventDefault();
        db.collection('users')
        .get()
        .then( snapshot => {
            snapshot.forEach( doc => {
                const data = doc.data()
                data.name === user.displayName ? setDocID(doc.id) : console.log('discarded ID')
            })
            db.collection('users').doc(docID).update({
              submissions:
              firebase.firestore.FieldValue.arrayUnion(currentSubmission)
            })
        })
        setCurrentSubmission("");
        
    }
    
    const handleSubmissionAdd = (event) => {
        console.log('handleSubmissionAdd called')
        setCurrentSubmission(event.target.value)
        console.log(currentSubmission)
    }

    return (
        updateDocID(),
        <div className="pagefiller">
            <button className='btn' onClick={getUserSubmissions}>Refresh Submissions</button>
            <div> 
                <div className='container'>
                    <h3>My Submissions:</h3>
                    {submissions.map( submission => 
                        <div className='submission'>
                            {submission}
                            <FaTimes style={{ color: 'antiquewhite', cursor: 'pointer'}} onClick={()=>db.collection('users').doc(docID).update({
                            submissions: firebase.firestore.FieldValue.arrayRemove(submission)
                            })} />
                        </div>
                    )}
                    <form onSubmit={onSubmit}>
                        <div className='form-control'>
                            <label>Add a new submission:</label>
                                <input type='text' 
                                placeholder='Upload a new script'
                                value={currentSubmission} 
                                onChange={handleSubmissionAdd}/>
                        </div>
                        <div className='center'>
                            <input className='btn' type='submit' value='Add Submission'/> 
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default SubmissionsPage
