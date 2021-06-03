import { db } from '../firebase';
import { useState, useEffect } from 'react';
import MP3Logo from '../components/tempImages/mp3.png';
import { Link } from 'react-router-dom';
import SubmitComment from "../components/SubmitComment";

const ViewPostPage = () => {
    const PostUID = Number(window.location.pathname.substring(10, window.location.pathname.length));
    const [postContent, setPostContent] = useState('');
    const [postAuthor, setPostAuthor] = useState('');
    const [postComments, setPostComments] = useState([]);

    useEffect(() => {
        loadPost();
        loadComments();
    },[]); // empty dependency array to ensure post will not be reloaded!

    const loadPost = () => {
        console.log('loadPost called!');
        db.collection('submissions').where("UID", "==", PostUID)
        .get()
        .then(querySnapshot => {
            querySnapshot.forEach( (doc) => {
                const data = doc.data();
                setPostContent(data.content);
                setPostAuthor(data.author);
                })
            })
        }

    const loadComments = () => {
        console.log('loadComments called!');
        db.collection('comments').where("UID", "==", PostUID)
        .get()
        .then(querySnapshot => {
            const tempCommentArray = [];
            querySnapshot.forEach( (doc) => {
                const data = doc.data();
                tempCommentArray.push([data.author, data.content])
            })
            setPostComments(tempCommentArray);
        })
    }
    
    return (
        <div className='pagefiller'>
            <h1>Submission #{PostUID}</h1>
            <h2>Author: {postAuthor}</h2>
            <div className='center'> 
                <Link>Download</Link>
                <img src={MP3Logo} alt="placeholder for now"></img>
                <Link>Play</Link>
                <img src={MP3Logo} alt="placeholder for now"></img>
            </div>
            <div className='container'>{postContent}</div>

            <div className='container'>
            <h3>Comments</h3>     
            <button className='btn' style={{fontSize:9}} onClick={()=>{loadComments()}}>click to refresh comments</button>
            {postComments.map( comments => 
                        <div className='submission' style={{fontSize:12}}>
                            <h3>Comment by: {comments[0]}</h3>
                            <p>{comments[1]}</p>
                        </div>
                    )}
            <SubmitComment />
            </div>
        </div>
    )
}

export default ViewPostPage