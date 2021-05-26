import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom'
import Mainpage from '../pages/Mainpage'
import Firstpage from '../pages/Firstpage'
import Secondpage from '../pages/Secondpage'
import Thirdpage from '../pages/Thirdpage'

const Navbar = () => {
    const AIstyling={color:'white'}

    return (
        
        <Router >
            <div className='navbar' >
                <nav>
                    <ul>
                        <h2 className='header'>
                            <h1 className='header'>
                                Present<h3 style={AIstyling}>AI</h3>ble
                            </h1>
                            <Link to = "/"  className='btn'>
                                Main
                                </Link>
                            <Link to = "/Firstpage" className='btn'>
                                About
                                </Link>
                            <Link to = "/Secondpage" className='btn'>
                                Dashboard
                                </Link>
                            <Link to = "/Thirdpage" className='btn'>
                                Signup
                                </Link>
                        </h2>
                    </ul>
                </nav>
            </div>

            <Switch>
                    <Route path='/Firstpage'>
                        <Firstpage />
                    </Route>
                    <Route path="/Secondpage">
                        <Secondpage />
                    </Route>
                    <Route path="/Thirdpage">
                        <Thirdpage />
                    </Route>
                    <Route path="/">
                        <Mainpage />
                    </Route>
                </Switch>
        </Router>
        
    );
    
}

export default Navbar