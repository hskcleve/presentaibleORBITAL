import { db, storageRef } from "../firebase";
import { useState, useEffect } from "react";
import PlayAudioFromURL from "../components/PlayAudioFromURL";
import SubmitComment from "../components/SubmitComment";
import Navbar from "../components/Navbar";
import Feedback from "../components/Feedback";

const ViewPostPage = () => {
  const PostUID = String(
    window.location.pathname.substring(10, window.location.pathname.length)
  );
  const [postContent, setPostContent] = useState("");
  const [postAuthor, setPostAuthor] = useState("");
  const [postComments, setPostComments] = useState([]);
  const [filename, setFilename] = useState("");
  const [downloadURL, setDownloadURL] = useState();
  const [postTitle, setPostTitle] = useState("");
  const [feedback, setFeedback] = useState(false);
  const [goodFeedbacks, setGoodFeedbacks] = useState(0);
  const [badFeedbacks, setBadFeedbacks] = useState(0);
  const [neutralFeedbacks, setNeutralFeedbacks] = useState(0);

  useEffect(() => {
    loadPost();
    loadComments();
  }, []); // empty dependency array to ensure post will not be reloaded!

  useEffect(() => {
    loadAttachments();
  }, [filename]);

  const loadAttachments = () => {
    loadPost();
    console.log("loadAttachments called!");
    const path = "" + PostUID + "/" + filename;
    const pathReference = storageRef.child(path);
    pathReference.getDownloadURL().then((url) => {
      setDownloadURL(url);
    });
    console.log("the download URL has been set as " + downloadURL);
  };

  const loadPost = () => {
    console.log("loadPost called!");
    db.collection("submissions")
      .doc(PostUID)
      .get()
      .then((doc) => {
        const data = doc.data();
        setPostContent(data.content);
        setPostAuthor(data.author);
        setFilename(data.attachedFileName);
        setPostTitle(data.title);
        setFeedback(
          data.totalFeedbacks != 0 && data.totalFeedbacks != undefined
        );
        setGoodFeedbacks(data.good);
        setBadFeedbacks(data.bad);
        setNeutralFeedbacks(data.neutral);
        console.log("filename set to " + filename);
      });
  };

  const loadComments = () => {
    console.log("loadComments called!");
    db.collection("comments")
      .where("PostUID", "==", PostUID)
      .get()
      .then((querySnapshot) => {
        const tempCommentArray = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          tempCommentArray.push([data.author, data.content]);
        });
        setPostComments(tempCommentArray);
      });
  };

  return (
    <div>
      <Navbar />
      <br></br>
      <div className="viewpost-info-wrapper">
        <div className="viewpost-info-container">
          <h1>{postTitle}</h1>
          <h3>by {postAuthor}</h3>
          <h6>PostUID: {PostUID}</h6>
          <PlayAudioFromURL downloadURL={downloadURL} />
        </div>
        <Feedback
          feedback={feedback}
          badFeedbacks={badFeedbacks}
          goodFeedbacks={goodFeedbacks}
          neutral={neutralFeedbacks}
          style={{ margin: 20 }}
        ></Feedback>
      </div>
      <div className="container">
        <strong>Script:</strong> {postContent}
      </div>

      <div className="container">
        <h3>Comments</h3>
        <button
          className="btn"
          style={{ fontSize: 12 }}
          onClick={() => {
            loadComments();
          }}
        >
          refresh comments
        </button>
        {postComments.map((comments) => (
          <div className="submission" style={{ fontSize: 12 }}>
            <h3>Comment by: {comments[0]}</h3>
            <p>{comments[1]}</p>
          </div>
        ))}
        <SubmitComment />
      </div>
    </div>
  );
};

export default ViewPostPage;
