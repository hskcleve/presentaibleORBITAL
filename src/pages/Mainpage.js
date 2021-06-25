import Navbar from "../components/Navbar";
import firebase from "firebase";
import { useState,useEffect } from 'react';

const Mainpage = () => {
  const user = firebase.auth().currentUser;
  const [username, setUsername] = useState('unfetchedName');
  const [data, setData] = useState(null);
  console.log("Mainpage reached ", username);
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json'},
    body: JSON.stringify({ content: 'well done' })
  };

  useEffect(() => {
    setUsername(user.displayName);
    fetch("https://presentaible.herokuapp.com/post", requestOptions)
    .then(response => response.json())
    .then(data=> setData(data.message));
  }, [])

  return (
    <>
    <Navbar/>
    <p style={{fontSize:6}}>backend: {!data ? "loading...":data}</p>
      <div>
      <h1 className="frontPageWelcome" style={{color:'GhostWhite'}}>Welcome Back,</h1>
      <h1 className="frontPageWelcome2" style={{color:'Beige'}}>{username}.</h1>
      </div>
    
  </>)
};

export default Mainpage;