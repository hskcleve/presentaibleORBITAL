import React from "react";
import Posts from "../components/Posts";

const EmptyPage = () => {
  return (
    console.log("thirdpage reached"),
    (
      <div className="pagefiller">
        <Posts></Posts>
        <h2 className="header">Thirdpage is a template page.</h2>
      </div>
    )
  );
};

export default EmptyPage;

/*
<h3 className='container'>

            <form className='add-form'>
                <div className='form-control'>
                    <label>Full Name</label>
                    <input type='name' placeholder='First and Last Name' ></input>
                </div>
                <div className='form-control'>
                    <label>School</label>
                    <input type='school' placeholder='School'></input>
                </div>
                <div className='form-control'>
                    <label>Email</label>
                    <input type='email' placeholder='example@gmail.com'></input>
                </div>
                <div className='form-control'>
                    <label>Password</label>
                    <input type='password' placeholder='' ></input>
                </div>
            </form>

            </h3>
*/
