import firebase from "firebase";
import { React, useState, useEffect } from "react";
import { db, storageRef } from '../firebase';
import { useHistory } from 'react-router-dom';
import SubmitSubmission from '../components/SubmitSubmission';
import Navbar from '../components/Navbar';

const SubmissionsPage = () => {
    const user = firebase.auth().currentUser;
    const userUID = user.uid;
    const history = useHistory();
    const [submissions, setSubmissions] = useState([])

    useEffect(() => {
        getUserSubmissions()
    }, []);

    const getUserSubmissions = () => {
        db.collection('submissions').where("userUID", "==", userUID)
            .get()
            .then(querySnapshot => {
                const arr = [];
                querySnapshot.forEach((doc) => {
                    const data = doc.data();
                    const content = data.content;
                    const postUID = doc.id;
                    const postTitle = data.title;
                    arr.push([postUID, content, postTitle]);
                })
                setSubmissions(arr)
            })
    }

    const onOpen = ({ submission }) => {
        history.push("/viewpost/" + submission[0]);
    }

    const onDelete = ({ submission }) => {
        db.collection('submissions').doc(submission[0]).get().then((doc)=>{
            const data = doc.data();
            const richMedia = data.attachedFileName;
            const attachedFileRef = storageRef.child("" + submission[0] + "/" + richMedia);
            attachedFileRef.delete().then(() => {
                console.log('file deleted from cloud storage');
            }).catch((error) => console.log("failed to delete", error))
        }).catch((error)=>console.log("failed to delete", error))

        db.collection('submissions').doc(submission[0]).delete();

        db.collection('comments').where("PostUID", "==", submission[0])
            .get()
            .then(querySnapshot => {
                querySnapshot.forEach((doc) => {
                    const docID = doc.id;
                    db.collection('comments').doc(docID).delete();
                })
            })

        db.collection('users').doc(userUID).update({
            posts: firebase.firestore.FieldValue.arrayRemove(submission[0])
        })
    }

    return (
        <div>
            <div className='containerWide'>
                <h1 >My Submissions</h1>
                <button className='btn'
                style={{
                    backgroundColor:'transparent', textDecorationLine:'underline', fontStyle:'italic', fontSize:12, padding:0, margin:0}}
                    onClick={() => { getUserSubmissions() }}>Refresh Submissions</button>
            </div>

            <div className='containerWide' style={{backgroundColor:'transparent', flexWrap:'wrap', display:'flex', maxWidth:1920, justifyContent:'space-evenly'}}>
                {submissions.map(submission =>
                        <div className='submission' style={{fontSize:12, minWidth:250, maxWidth:250, minHeight:125, maxHeight:210}}>
                            <h2>{submission[2]}</h2>
                            {submission[1].split(' ').slice(0, 20).join(" ") + " ..."}
                            <div style={{ textAlign: 'center'}}>
                                <button className='btn' style={{ fontSize: 10 }} onClick={() => { onOpen({ submission }) }}>Open</button>
                                <button className='btn' style={{ fontSize: 10 }} onClick={() => { onDelete({ submission }) }}>Delete</button>
                            </div>
                        </div>
                    )}
            </div>
        </div>
    )
}

export default SubmissionsPage

/*

*/
