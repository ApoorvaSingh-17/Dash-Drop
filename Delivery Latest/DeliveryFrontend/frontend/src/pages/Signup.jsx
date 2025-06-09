import React, { useState } from 'react';
import UserNavbar from '../components/UserLandNavbar'; // Import the Navbar
import '/src/App.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { message } from "antd";
import { toast, ToastContainer } from "react-toastify";

const SignUp = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [staffRequest, setstaffRequest] = useState(""); 


  // const handleRoleChange = (e) => {
  //   setstaffRequest(e.target.value === "Yes"); // Set true for "Yes", false for "No"
  // };


  // const handleSubmit = async (e) => {
  
  //   e.preventDefault();
  //   try{
  //   console.log("Register")
  //   const res = await axios.post("http://localhost:8080/api/auth/register", { username, password, email, staffRequest });

  //   if (res.status === 201) {
  //     if (staffRequest) {
  //       message.success("Registration successful! Kindly wait for approval.");
  //     } else {
  //       message.success("Registration successful! Please login.");
  //     }
  //     setPassword("");
  //     setUsername("");
  //     setEmail("");
  //     setstaffRequest("");

  //     //   setTimeout(() => {
  //     //     setSuccessMessage(""); // Clear the message after 3 seconds
  //     //     navigate("/login"); // Redirect to login
  //     //   }, 3000);
  //     //  // navigate("/login");
  //   }
  // } catch(error) {
  //  message.error("Invalid Credentials!!")
  // }
  // }

  const handleRoleChange = (e) => {
    setstaffRequest(e.target.value); // Directly set the value as "Yes" or "No"
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const isStaff = staffRequest === "Yes"; // Convert to boolean only when needed
  
    try {
      console.log("Register");
      const res = await axios.post("http://localhost:8080/api/auth/register", { 
        username, 
        password, 
        email, 
        staffRequest: isStaff 
      });
  
      if (res.status === 201) {
        if (isStaff) {
          // message.success("Registration successful! Kindly wait for approval.");
           toast.success("Registration successful! Kindly wait for approval.", {
                    position: "top-right",
                    autoClose: 3000,
                    className: "custom-toast",
                    bodyClassName: "custom-toast-body",
                    progressClassName: "custom-toast-progress",
                    onClose: () => navigate("/userHome"),
                  });
        } else {
          // message.success("Registration successful! Please login.");
          toast.success("Registration successful! Please login.", {
            position: "top-right",
            autoClose: 3000,
            className: "custom-toast",
            bodyClassName: "custom-toast-body",
            progressClassName: "custom-toast-progress",
            onClose: () => navigate("/userLogin"),
          });
        }
        setPassword("");
        setUsername("");
        setEmail("");
        setstaffRequest(""); // Reset the dropdown
      }
    } catch (error) {
      message.error("Invalid Credentials!!");
    }
  };

  

  return (
    <>
      <UserNavbar /> {/* Render Navbar here */}
      
        <div className="backImg ">
          <div className="signup">
            <form className="signupform" onSubmit={handleSubmit}>
              <h1 className='signuptitle'>Register Here</h1>
              <div className="form-group">
                <label for="exampleInputEmail1">Username</label>
                <input type="name" className="signup-input" id="exampleInputname" aria-describedby="emailHelp" placeholder="Username" name="username" value={username} onChange={(e) => (setUsername(e.target.value))} />

              </div>
              <div className="form-group">
                <label for="exampleInputEmail1">Email address</label>
                <input type="email" className="signup-input-email" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" name="email" value={email} onChange={(e) => (setEmail(e.target.value))} />
                <small id="emailHelp" className="form-text text-muted signup-label">We'll never share your email with anyone else.</small>
              </div>
              <div className="form-group">
                <label for="exampleInputPassword1 " className='signupinputpassword'>Password</label>
                <input type="password" className="signup-input" id="exampleInputPassword1" placeholder="Password" name="password" value={password} onChange={(e) => (setPassword(e.target.value))} />
              </div>
              <div className="form-group">
                <label for="exampleInputPassword1">Confirm Password</label>
                <input type="password" id="exampleInputPassword2" className="signupinputconfirmpassword" placeholder="Password" />
              </div>
              <div className="form-group">
                <label className="form-check-label " for="exampleCheck1">Want to Register as Staff ?</label>
                <select id="dropdown" name="dropdown" value={staffRequest} 
                onChange={handleRoleChange}>
                <option value="" disabled selected>Select an option</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
               </select>
              </div>
              <button type="submit " className=" signupbtn">Submit</button>
              <ToastContainer/>
            </form>
          </div>
        </div>
      

    </>
  );
};

export default SignUp;