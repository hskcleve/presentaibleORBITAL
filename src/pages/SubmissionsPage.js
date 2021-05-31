import firebase from "firebase";
import {React, useState} from "react";
import { db } from '../firebase';
import { useHistory } from 'react-router-dom';

const SubmissionsPage = () => {
    const user = firebase.auth().currentUser;
    const [submissions, setSubmissions] = useState([]);
    const [currentSubmission, setCurrentSubmission] = useState('');
    const history = useHistory();

    const getUserSubmissions = () => {
        db.collection('submissions').where("author", "==", user.displayName)
        .get()
        .then( querySnapshot => {
            const arr = [];
            querySnapshot.forEach( (doc) => {
                const data = doc.data();
                const content = data.content;
                const UID = data.UID;
                arr.push([UID, content]);
            })
            setSubmissions(arr)
        })
    }

    const onSubmit = (event) => {
        event.preventDefault();
        db.collection('submissions').add({
            author: user.displayName,
            UID: Math.floor(Math.random() * (1000000-1+1)) + 1,
            content: currentSubmission
        });
        setCurrentSubmission("");
    }
  
    const handleSubmissionAdd = (event) => {
        console.log('handleSubmissionAdd called')
        setCurrentSubmission(event.target.value)
        console.log(currentSubmission)
    }

    const onOpen = ({submission}) => {
        history.push("/" + submission[0]);
        const id = window.location.pathname.substring(1, window.location.pathname.length);
        console.log('the UID is ' + id); 
    }

    const onDelete = ({submission}) => {
        db.collection('submissions').where("author", "==", user.displayName)
        .get()
        .then(querySnapshot => {
            querySnapshot.forEach( (doc) => {
                const data = doc.data();
                const UID = data.UID;
                if (UID === submission[0]) {
                const docID = doc.id;
                db.collection('submissions').doc(docID).delete();
                }
            })
        })
        
    }

    return (
        <div className="pagefiller">
            <button className='btn' onClick={getUserSubmissions}>Refresh Submissions</button>
            <div> 
                <div className='container'>
                    <h3>My Submissions:</h3>
                    {submissions.map( submission => 
                        <div className='submission' style={{fontSize:12}}>
                            {submission[1]}
                            <div style={{textAlign:'center'}}> 
                            <button className='btn' style={{fontSize:10, backgroundColor:'steelblue'}} onClick={()=>{onOpen({submission})}}>Open</button>
                            <button className='btn' style={{fontSize:10, backgroundColor: 'steelblue'}} onClick={()=>{onDelete({submission})}}>Delete</button>
                            </div> 
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
