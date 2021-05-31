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
                <div className='form-control'>
                    <label>Add a comment:</label>
                    <input type='text'
                        placeholder='...'
                        value={comment}
                        onChange={handleCommentAdd} />
                </div>
                <div className='center'>
                    <input className='btn' type='submit' value='Add Comment' />

                </div>
            </form>
        </div>
    )
}

export default SubmitComment
