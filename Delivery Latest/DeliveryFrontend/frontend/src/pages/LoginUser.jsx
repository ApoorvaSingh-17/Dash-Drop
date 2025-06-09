import React, { useState } from 'react';
import UserNavbar from '../components/UserLandNavbar'; // Import the Navbar
import { useNavigate } from 'react-router-dom'; // For navigation
import axios from 'axios'; // For making API requests
import { message } from 'antd'; // Ant Design for notifications
import '/src/App.css'; // Importing your CSS file
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // Hook for navigation

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Ensure the fields are not empty
    if (!username || !password) {
      message.error("Both fields are required!");
      return;
    }

    try {
      // API call to verify user credentials
      const res = await axios.post("http://localhost:8080/api/auth/login", {
        username,
        password,
      });

      // Handle success
      if (res.status === 200) {
        const { token, user } = res.data; // Extract token and user from the response
  
        // Store the token and user details in localStorage
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user)); // Convert user object to string
  
        toast.success("Login successful!", {
          position: "top-right",
          autoClose: 3000,
          className: "custom-toast",
          bodyClassName: "custom-toast-body",
          progressClassName: "custom-toast-progress",
          onClose: () => navigate("/userHome"),
        });
        // navigate("/userHome"); // Redirect to home page
      }
    } catch (error) {
      // Handle error
      console.error("Login failed:", error);
      message.error(error.response?.data?.message || "Invalid credentials.");
    }
  };

  return (
    <>
      <UserNavbar /> {/* Render Navbar */}
      <div className="backImgLogin">
        <div className="loginUser">
          <form className="loginform" onSubmit={handleSubmit}>
            <h1 className="signuptitle">Login Here</h1>

            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                className="signup-input-username"
                id="username"
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="exampleInputPassword1" className="signupinputpassword">
                Password
              </label>
              <input
                type="password"
                className="signup-input"
                id="exampleInputPassword1"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="form-check">
              <input type="checkbox" className="form-check-input tick" id="exampleCheck1" />
              <label className="form-check-label" htmlFor="exampleCheck1">
                Remember me
              </label>
            </div>

            <button type="submit" className="signupbtn">
              Login
            </button>
            <ToastContainer/>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;