import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Logo from "./Logo";
import Mainpage from "../pages/Mainpage";
import AboutPage from "../pages/About";
import DashboardPage from "../pages/Dashboard";
import TestPage from "../pages/TestPage";

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
              <Link to="/about" className="btn">
                About
              </Link>
              <Link to="/dashboard" className="btn">
                Dashboard
              </Link>
            </h2>
          </ul>
        </nav>
      </div>

      <Switch>
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
        <Route exact path="/">
          <Mainpage/>
        </Route>
      </Switch>
    </Router>
  );
};

export default Navbar;
