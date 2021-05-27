import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Mainpage from "../pages/Mainpage";
import AboutPage from "../pages/about";
import DashboardPage from "../pages/dashboard";
import SignupPage from "../pages/signup";
import LoginPage from "../pages/login";

const Navbar = () => {
  const AIstyling = { color: "white" };

  return (
    <Router>
      <div className="navbar">
        <nav>
          <ul>
            <h2 className="header">
              <h1 className="header">
                Present<h3 style={AIstyling}>AI</h3>ble
              </h1>
              <Link to="/" className="btn">
                Main
              </Link>
              <Link to="/about" className="btn">
                About
              </Link>
              <Link to="/dashboard" className="btn">
                Dashboard
              </Link>
              <Link to="/signup" className="btn">
                Signup
              </Link>
            </h2>
          </ul>
        </nav>
      </div>

      <Switch>
        <Route path="/about">
          <AboutPage />
        </Route>
        <Route path="/dashboard">
          <DashboardPage />
        </Route>
        <Route path="/signup">
          <SignupPage />
        </Route>
        <Route exact path="/">
          <Mainpage />
        </Route>
        <Route path="/login">
          <LoginPage></LoginPage>
        </Route>
      </Switch>
    </Router>
  );
};

export default Navbar;
