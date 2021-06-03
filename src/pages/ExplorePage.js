import firebase from "firebase";
import {React, useState, useEffect } from "react";
import { db } from '../firebase';
import { useHistory } from 'react-router-dom';

const ExplorePage = () => {
    const user = firebase.auth().currentUser;
    const [submissions, setSubmissions] = useState([]);
    const history = useHistory();
    const [school, setSchool] = useState('');

    useEffect(() => {
        getSchool();
        console.log("school set to: " + school);
    }, []) // uses an empty dependency array because it is constant. If dependency array removed useEffect is called 
    // continuously, causing multiple API calls to get school non stop. 

    useEffect(() => {
        getSchoolSubmissions();
        console.log('getSchoolSubmissions called!, school is: ' + school);
    }, [school]) // similaryly here, useEffect is called whenever school is changed; ie from the getSchool call.

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

    const getSchoolSubmissions = () => {
        db.collection('submissions')
        .where("school", "==", school)
        .get()
        .then( querySnapshot => {
            const arr = [];
            querySnapshot.forEach( (doc) => {
                const data = doc.data();
                const content = data.content;
                const author = data.author;
                const UID = data.UID;
                arr.push([author, content, UID]);
            })
            setSubmissions(arr)
        })
    }

    const onOpen = ({submission}) => {
        history.push("/viewpost/" + submission[2]);
    }

    return (
        <div>
            <div> 
                <div className='container'>
                    <h3>Submissions filtered for: {school}</h3>
                    {submissions.map( submission => 
                        <div className='submission' style={{fontSize:12}}>
                            <h2>Author: {submission[0]}</h2>
                            <div>{submission[1].split(' ').slice(0,20).join(" ") + " ..."}</div>
                            <div style={{textAlign:'right'}}> 
                            <button className='btn' style={{fontSize:10, backgroundColor:'transparent'}} onClick={()=>{onOpen({submission})}}>see more</button>
                            </div> 
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default ExplorePage
