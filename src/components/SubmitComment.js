import { useState } from 'react';
import { db } from '../firebase';
import firebase from "firebase";

const SubmitComment = () => {
    const user = firebase.auth().currentUser;
    const [comment, setComment] = useState('');
    const commentUID = Number(window.location.pathname.substring(10, window.location.pathname.length));

    const onSubmit = (event) => {
        event.preventDefault();
        db.collection('comments').add({
            UID: commentUID,
            author: user.displayName,
            content: comment,
        });
        setComment("");
    }
  
    const handleCommentAdd = (event) => {
        setComment(event.target.value)
    }

    return (
        <div>
            <form onSubmit={onSubmit}>
                    Add a comment:
                    <br></br>
                    <textarea id="comment" name="comment"
                        type='text'
                        placeholder=' ...'
                        value={comment}
                        onChange={handleCommentAdd} 
                        style={{minHeight:120, maxHeight:120, minWidth:435, maxWidth:435,
                            fontFamily: "Helvetica Neue", fontSize:15}}
                            />
            
                <div className='center'>
                    <input className='btn' type='submit' value='Add Comment' />

                </div>
            </form>
        </div>
    )
}

export default SubmitComment
