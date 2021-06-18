import firebase from "firebase";
import { useState, useEffect, useRef } from "react";
import { db } from '../firebase';
import { useHistory } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { Form,Button } from "react-bootstrap";

const ExplorePage = () => {
    const user = firebase.auth().currentUser;
    const userUID = user.uid;
    const [submissions, setSubmissions] = useState([]);
    const history = useHistory();
    const [school, setSchool] = useState('');
    const [modules, setModules] = useState([]);
    const filterRef = useRef();
    const [currentFilter, setCurrentFilter] = useState('');

    useEffect(() => {
        getSchool();
        getModules();
    }, []) // uses an empty dependency array because it is constant. If dependency array removed useEffect is called 
    // continuously, causing multiple API calls to get school non stop. 

    useEffect(() => {
        getSchoolSubmissions();
        console.log('getSchoolSubmissions called!, school is: ' + school);
        setCurrentFilter(school);
    }, [school]) // similarly here, useEffect is called whenever school is changed; ie from the getSchool call.

    useEffect(() => {
        getSchoolSubmissions();
    }, [currentFilter])

    const getSchool = () => {
        console.log('getSchool called!');
        db.collection("users").doc(userUID).get().then((doc)=>{
          const data = doc.data();
          setSchool(data.school);
          console.log('getSchool has set school to ' + school);
        }).catch((error) => {console.log("error in getSchool", error);})
    }

    const getModules = () => {
        console.log('getModules called!');
        const tempModules = [];
        db.collection("users").doc(userUID).get().then((doc)=>{
            const data = doc.data();
            const moduleArray = data.classes;
            moduleArray.forEach((mod)=>{
                const className = mod["className"];
                tempModules.push(className);
            })
            setModules(tempModules);
        })
    }

    async function handleFilter(e) {
        e.preventDefault();
        setCurrentFilter(filterRef.current.value);
        console.log('current filter: ' + filterRef.current.value);
    }

    const getSchoolSubmissions = () => {


        if (currentFilter === school) {
            db.collection('submissions')
            .where("school", "==", currentFilter)
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
        } else { 
            db.collection('submissions')
            .where("moduleName", "==", currentFilter)
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
            })}
    }

    const onOpen = ({submission}) => {
        history.push("/viewpost/" + submission[2]);
    }

    const RenderSubmissions = () => {
        if (submissions.length === 0 ) {
            return (
                <div style={{textAlign:'center', marginTop:200, color:'whitesmoke'}}>
                    <h3>No submissions yet!</h3>
                </div>
            )
        }
        return(
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
        )
    }

    return (
        <div>
            <Navbar />
            <div> 
            <div className='containerWide' style={{display:'flex', alignItems:'center'}}>
                <h3>Submissions from:</h3>
                    <Form onSubmit={handleFilter} style={{marginLeft:10, display:'flex', alignItems:'center'}}>
                        <Form.Group id="filter">
                            <Form.Control ref={filterRef} as="select">
                                <option>Public</option>
                                <option>{school}</option>
                                {modules.map(mod =>
                                    <option>{mod}</option>)}
                            </Form.Control>
                        </Form.Group>
                        <Button className='btnForFilter' type="submit">
                            Filter
                        </Button>
                    </Form>
                </div>
                    <RenderSubmissions />
            </div>
        </div>
    )
}

export default ExplorePage

//.filter(submission => submission[0]!=user.displayName)
