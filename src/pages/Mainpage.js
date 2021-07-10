import Navbar from "../components/Navbar";
import firebase from "firebase";
import { useState,useEffect } from 'react';
import DashboardLogo from '../components/tempImages/dashboard.png';
import ExploreLogo from '../components/tempImages/direction.png';
import { useHistory } from "react-router";

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
  const history = useHistory();

  function goto(location){
    history.push('/'+location);
  }

  useEffect(() => {
    setUsername(user.displayName);
    fetch("https://presentaible.herokuapp.com/post", requestOptions)
    .then(response => response.json())
    .then(data=> setData(data.message));
  }, [])

  return (
    <>
      <Navbar />
      <p style={{ fontSize: 6 }}>backend: {!data ? "loading..." : data}</p>
      <div style={{ display: 'flex', justifyContent: 'space-around', marginTop:100 }}>
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <h1 style={{ color: 'GhostWhite' }}>Welcome Back,</h1>
          <h1 style={{ color: 'AntiqueWhite' }}>{username}.</h1>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <div className="container" style={{display:'flex', flexDirection:'column'}}>
            <h2 style={{ color: 'GhostWhite' }} >What would you like to do today?</h2>
            <br></br>
            <div style={{display:'flex'}}>
            <div style={{marginTop:7}}><img src={DashboardLogo} alt="dashboardLogo"></img></div>
            <div style={{marginLeft:25}}>
            <h3 style={{ color: 'AntiqueWhite' }}>Dashboard</h3>
            <p>View your past submissions and track your progress.</p>
            <div style={{ textAlign: "end" }}>
            <button onClick={()=>{goto('dashboard')}} className='btn' style={{backgroundColor:'transparent'}}>↳ to Dashboard</button>
            </div>
            </div>
            </div>
            <br></br>
            <div style={{display:'flex'}}>
            <div style={{marginTop:7}}><img src={ExploreLogo} alt="exploreLogo"></img></div>
            <div style={{marginLeft:25}}>
            <h3 style={{ color: 'AntiqueWhite' }}>Explore</h3>
            <p>View posts submitted from the public, your school, or enrolled modules.</p>
            <div style={{ textAlign: "end" }}>
            <button onClick={()=>{goto('explore')}} className='btn' style={{backgroundColor:'transparent', }}>↳ To Explore</button>
            </div>
            </div>
            </div>
          </div>
        </div>
      </div>
    
  </>)
};

export default Mainpage;