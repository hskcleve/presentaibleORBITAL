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
        getSchoolSubmissions(),
        <div className="pagefiller">
            <div> 
                <div className='container'>
                    <h3>Submissions filtered for: {school}</h3>
                    {submissions.map( submission => 
                        <div className='submission' style={{fontSize:12}}>
                            <h2>{submission[0]}</h2>
                            <h3>{submission[1]}</h3>
                            <div style={{textAlign:'center'}}> 
                            <button className='btn' style={{fontSize:10, backgroundColor:'steelblue'}} onClick={()=>{onOpen({submission})}}>Open</button>
                            </div> 
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default ExplorePage
