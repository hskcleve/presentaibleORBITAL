import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom'
import Logo from './Logo'
import Mainpage from '../pages/Mainpage'
import Firstpage from '../pages/Firstpage'
import Secondpage from '../pages/Secondpage'
import Thirdpage from '../pages/Thirdpage'

const Navbar = () => {
    
    return (
        
        <Router >
            <div className='navbar'>
                <nav>
                    <ul>
                        <h2 className='header'>
                            <Logo />
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
                                TemplatePage
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