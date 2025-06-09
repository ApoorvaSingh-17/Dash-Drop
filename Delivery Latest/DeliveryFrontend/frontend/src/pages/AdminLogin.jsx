import React, { useState } from 'react';
import AdminNavbar from '../components/AdminNavbar';  // Import the Navbar
import '/src/App.css';

const SignUp = () => {


  return (
    <>
      <AdminNavbar /> 
      <div className="backImgLogin ">
        <div className="loginUser">
          <form className="signupform">
            <h1 className='signuptitle'>Login Here</h1>
          
            <div className="form-group">
              <label for="exampleInputEmail1">Email address</label>
              <input type="email" className="signup-input-email" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
              <small id="emailHelp" className="form-text text-muted signup-label">We'll never share your email with anyone else.</small>
            </div>
            <div className="form-group">
              <label for="exampleInputPassword1 " className='signupinputpassword'>Password</label>
              <input type="password" className="signup-input" id="exampleInputPassword1" placeholder="Password" />
            </div>
           
            <div className="form-check">
              <input type="checkbox" className="form-check-input tick" id="exampleCheck1" />
              <label className="form-check-label" for="exampleCheck1">Check me out</label>
            </div>
            <button type="submit " className=" signupbtn">Login</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignUp;




