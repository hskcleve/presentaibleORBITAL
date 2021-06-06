import Navbar from "../components/Navbar";
import firebase from "firebase";
import { useState,useEffect } from 'react';

const Mainpage = () => {
  const user = firebase.auth().currentUser;
  const [username, setUsername] = useState('unfetchedName');
  console.log("Mainpage reached ", username);

  useEffect(() => {
    setUsername(user.displayName);
  }, [])

  return (
    <>
    <Navbar/>
    
      <div>
      <h1 className="frontPageWelcome" style={{color:'GhostWhite'}}>Welcome Back,</h1>
      <h1 className="frontPageWelcome2" style={{color:'Beige'}}>{username}.</h1>
      </div>
    
  </>)
};

export default Mainpage;
