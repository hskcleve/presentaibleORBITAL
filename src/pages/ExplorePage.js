import firebase from "firebase";
import { useState, useEffect } from "react";
import { db } from '../firebase';
import { useHistory } from 'react-router-dom';
import Navbar from '../components/Navbar';

const ExplorePage = () => {
    const user = firebase.auth().currentUser;
    const userUID = user.uid;
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
    }, [school]) // similarly here, useEffect is called whenever school is changed; ie from the getSchool call.

    const getSchool = () => {
        console.log('getSchool called!');
        db.collection("users").doc(userUID).get().then((doc)=>{
          const data = doc.data();
          setSchool(data.school);
          console.log('getSchool has set school to ' + school);
        }).catch((error) => {console.log("error in getSchool", error);})
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
                const PostUID = doc.id;
                const title = data.title;
                arr.push([author, content, PostUID, title]);
            })
            setSubmissions(arr)
        })
    }

    const onOpen = ({submission}) => {
        history.push("/viewpost/" + submission[2]);
    }

    return (
        <div>
            <Navbar />
            <div> 
            <h3 className='containerWide'>Submissions filtered for: {school}</h3>
                <div className='containerWide' style={{backgroundColor:'transparent', flexWrap:'wrap', display:'flex', minHeight:500, maxWidth:1920}}>
                    {submissions.map(submission => 
                        <div className='submission' style={{fontSize:12, minWidth:250, maxWidth:250, maxHeight:250}}>
                            <h2>{submission[3]} </h2>
                            <h4>by {submission[0]}</h4>
                            <div>{submission[1].split(' ').slice(0,20).join(" ") + " ..."}</div>
                            <div style={{textAlign:'end'}}> 
                            <button className='btn' style={{fontSize:10, backgroundColor:'transparent', textDecorationLine:'underline'}} onClick={()=>{onOpen({submission})}}>see more</button>
                            </div> 
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default ExplorePage

//.filter(submission => submission[0]!=user.displayName)
