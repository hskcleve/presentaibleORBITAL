import firebase from "firebase";
import { React, useState, useEffect } from "react";
import { db } from '../firebase';
import { useHistory } from 'react-router-dom';
import SubmitSubmission from '../components/SubmitSubmission';

const SubmissionsPage = () => {
    const user = firebase.auth().currentUser;
    const [submissions, setSubmissions] = useState([]);
    const history = useHistory();

    useEffect(() => {
        getUserSubmissions();
    },[]);

    const getUserSubmissions = () => {
        console.log('getUserSubmissions called!');
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

    const onOpen = ({submission}) => {
        history.push("/viewpost/" + submission[0]);
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
            <div> 
                <div className='container'>
                    <h3>My Submissions:</h3>
                    {submissions.map( submission => 
                        <div className='submission' style={{fontSize:12}}>
                            {submission[1].split(' ').slice(0,20).join(" ") + " ..."}
                            <div style={{textAlign:'center'}}> 
                            <button className='btn' style={{fontSize:10, backgroundColor:'steelblue'}} onClick={()=>{onOpen({submission})}}>Open</button>
                            <button className='btn' style={{fontSize:10, backgroundColor: 'steelblue'}} onClick={()=>{onDelete({submission})}}>Delete</button>
                            </div> 
                        </div>
                    )}
                    <SubmitSubmission />
                </div>
                <div className='center'>
                    <button className='btn' onClick={()=>{getUserSubmissions()}}>Refresh Submissions</button>
                    </div>
            </div>
        </div>
    )
}

export default SubmissionsPage
