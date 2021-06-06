import { useHistory } from "react-router-dom";
import Logo from "./Logo";

import firebase from "firebase";

const Navbar = () => {
  const user = firebase.auth().currentUser;
  const history = useHistory();
  const logout = firebase.auth();

  async function handleLogout() {
    console.log('logout called!');
    try {
      await logout.signOut();
      history.push('/login')
    } catch {
      console.log('logout failed!')
    }
  }
  return (
      <div className="navbar">
        <h2 className="header">
          <Logo />
          <div><button className='btn'
            style={{ backgroundColor: 'transparent'}}
            onClick={() => { history.push('/') }}>
            Main
                </button></div>
          <div><button className='btn'
            style={{ backgroundColor: 'transparent'}}
            onClick={() => { history.push('/dashboard') }}>
            Dashboard
                </button></div>
          <div><button className='btn'
            style={{ backgroundColor: 'transparent'}}
            onClick={() => { history.push('/explore') }}>
            Explore
                </button></div>
          <div><button className='btn'
            style={{ backgroundColor: 'transparent'}}
            onClick={() => { history.push('/submissions') }}>
            My Submissions
                </button></div>
          <div><button className='btn'
            style={{ backgroundColor: 'transparent'}}
            onClick={() => { history.push('/about') }}>
            About
                </button></div>
          <div><button className='btn'
            style={{ backgroundColor: 'transparent'}}
            onClick={() => { handleLogout() }}>
            Log out
                </button>
          </div>
        </h2>
      </div>
      


  );
};

export default Navbar;