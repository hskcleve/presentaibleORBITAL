import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import SignUpLoginPage from './pages/SignupLoginPage'
import Navbar from './components/Navbar';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom'
import Mainpage from './pages/Mainpage';


ReactDOM.render(
  <React.StrictMode>
    <Router >   
            <Switch>
                <Route exact path="/">
                    <SignUpLoginPage />
                </Route>
                <Route path="/">
                    <Navbar />
                </Route>
            </Switch>
        </Router>   
    
  </React.StrictMode>,
  document.getElementById('root')
);