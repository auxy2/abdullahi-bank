import React, { useState } from "react";
import axios from "axios";
import "./style.css"; // Import the CSS file
import logo from '../assets/logo.png'; // Adjust the path based on where your logo is stored


const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ email: "", phoneNumber: "" });
  
    const validateEmail = (email) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    };

    const handleEmailChange = (e) => {
      const value = e.target.value;
      setEmail(value);
      if (!validateEmail(value)) {
        setErrors((prev) => ({ ...prev, email: "Invalid email address" }));
      } else {
        setErrors((prev) => ({ ...prev, email: "" }));
      }
    };
  console.log("This is our login page");

  const handleLogin = async () => {
    try {
      const res = await axios.post("http://localhost:3464/api/login", { email, password });
      console.log("Logged in:", res.data);
      // Store JWT token in localStorage or state
    } catch (err) {
      console.error("Login error:", err);
    }
  };

  return (
    <div className="box-container">
      <div className="overlay"></div>
      <div className="box">
        <div className="header-content">
          <img src={logo} alt="Logo" />         
          <h2>Welcome Back</h2>
          <h4>Log in to continue using your account</h4>
        </div>
        {errors.email && <p className="error">{errors.email}</p>}
        <input
          type="email"
          value={email}
          onChange={handleEmailChange}
          placeholder="Email"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button onClick={handleLogin}>Login</button>
        <div className="switch-link">
          <span>Don't have an account?</span>
          <a href="/signup">Sign up</a>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
