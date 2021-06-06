import firebase from "firebase";
import { React, useState, useEffect } from "react";
import { db, storageRef } from '../firebase';
import { useHistory } from 'react-router-dom';
import SubmitSubmission from '../components/SubmitSubmission';

const SubmissionsPage = () => {
    const user = firebase.auth().currentUser;
    const [submissions, setSubmissions] = useState([]);
    const history = useHistory();

    useEffect(() => {
        getUserSubmissions();
    }, []);

    const getUserSubmissions = () => {
        console.log('getUserSubmissions called!');
        db.collection('submissions').where("author", "==", user.displayName)
            .get()
            .then(querySnapshot => {
                const arr = [];
                querySnapshot.forEach((doc) => {
                    const data = doc.data();
                    const content = data.content;
                    const UID = data.UID;
                    arr.push([UID, content]);
                })
                setSubmissions(arr)
            })
    }

    const onOpen = ({ submission }) => {
        history.push("/viewpost/" + submission[0]);
    }

    const onDelete = ({ submission }) => {
        db.collection('submissions').where("author", "==", user.displayName)
            .get()
            .then(querySnapshot => {
                querySnapshot.forEach((doc) => {
                    const data = doc.data();
                    const UID = data.UID;
                    const richMedia = data.attachedFileName;
                    if (UID === submission[0]) {
                        const docID = doc.id;
                        const attachedFileRef = storageRef.child("" + UID + "/" + richMedia);
                        db.collection('submissions').doc(docID).delete();
                        attachedFileRef.delete().then(() => {
                            console.log('file deleted from cloud storage');
                        }).catch((error) => console.log("failed to delete", error))
                    }
                })
            })
        db.collection('comments').where("UID", "==", submission[0])
            .get()
            .then(querySnapshot => {
                querySnapshot.forEach((doc) => {
                    const docID = doc.id;
                    db.collection('comments').doc(docID).delete();
                })
            })
    }

    return (
        <div>
            <div style={{textAlign:'center'}}>
                <h1 >My Submissions</h1>
                <button className='btn'
                style={{backgroundColor:'transparent', textDecorationLine:'underline'}} onClick={() => { getUserSubmissions() }}>Refresh Submissions</button>
            </div>

            <div className='containerWide' style={{backgroundColor:'transparent', flexWrap:'wrap', display:'flex', minHeight:500, maxWidth:1920, justifyContent:'space-evenly'}}>
                {submissions.map(submission =>
                    <div className='submission' style={{fontSize:12, minWidth:250, maxWidth:250, minHeight:125, maxHeight:180}}>
                        <h3>Submission #{submission[0]}</h3>
                        <br></br>
                        {submission[1].split(' ').slice(0, 20).join(" ") + " ..."}
                        <div style={{ textAlign: 'center'}}>
                            <button className='btn' style={{ fontSize: 10 }} onClick={() => { onOpen({ submission }) }}>Open</button>
                            <button className='btn' style={{ fontSize: 10 }} onClick={() => { onDelete({ submission }) }}>Delete</button>
                        </div>
                    </div>
                )}
            </div>
                    <div className='container'><SubmitSubmission /></div>
        </div>
    )
}

export default SubmissionsPage
