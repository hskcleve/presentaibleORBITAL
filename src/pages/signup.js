import React from "react";
import { Link } from "react-router-dom";

const SignupPage = () => {
  return (
    console.log("SignupPage reached"),
    (
      <div className="pagefiller">
        <h2 className="header">Register an Account</h2>

        <h3 className="container">
          <form className="add-form">
            <div className="form-control">
              <label>Full Name</label>
              <input type="name" placeholder="First and Last Name"></input>
            </div>
            <div className="form-control">
              <label>School</label>
              <input
                type="school"
                placeholder="National University of Singapore"
              ></input>
            </div>
            <div className="form-control">
              <label>Email</label>
              <input type="email" placeholder="example@gmail.com"></input>
            </div>
            <div className="form-control">
              <label>Password</label>
              <input type="password" placeholder=""></input>
            </div>
            <span>
              Already have an account ? <Link to="/login">Login</Link>
            </span>
          </form>
        </h3>
      </div>
    )
  );
};

export default SignupPage;
