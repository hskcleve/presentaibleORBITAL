import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Logo from "./Logo";
import Mainpage from "../pages/Mainpage";
import AboutPage from "../pages/About";
import DashboardPage from "../pages/Dashboard";
import TestPage from "../pages/TestPage";
import SubmissionsPage from "../pages/SubmissionsPage";
import ViewPostPage from "../pages/ViewPostPage";
import ExplorePage from "../pages/ExplorePage";

const Navbar = () => {
  return (
    <Router>
      <div className="navbar">
        <nav>
          <ul>
            <h2 className="header">
              <Logo />
              <Link to="/" className="btn">
                Main
              </Link>
              <Link to="/dashboard" className="btn">
                Dashboard
              </Link>
              <Link to = "/explore" className='btn'>
                Explore
              </Link>
              <Link to ="/submissions" className="btn">
                Submissions
              </Link>
              <Link to="/about" className="btn">
                About
              </Link>
            </h2>
          </ul>
        </nav>
      </div>

      <Switch>
        <Route path="/explore">
          <ExplorePage/>
        </Route>
        <Route path="/loggedin">
          <Mainpage/>
        </Route>
        <Route path="/about">
          <AboutPage />
        </Route>
        <Route path="/dashboard">
          <DashboardPage />
        </Route>
        <Route path="/testPage">
          <TestPage />
        </Route>
        <Route path="/submissions">
          <SubmissionsPage />
        </Route>
        <Route exact path="/">
          <Mainpage/>
        </Route>
        <Route path="/viewpost/">
          <ViewPostPage />
        </Route>
      </Switch>
    </Router>
  );
};

export default Navbar;
