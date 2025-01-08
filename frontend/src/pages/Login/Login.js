import React, { useState } from "react";
import axios from "axios";
import "./Login.css"; // Import the CSS file
import logo from '../../assests/pfizer.png'; // Adjust the path based on where your logo is stored


const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  console.log("This is our login page");

  const handleLogin = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", { email, password });
      console.log("Logged in:", res.data);
      // Store JWT token in localStorage or state
    } catch (err) {
      console.error("Login error:", err);
    }
  };

  return (
    <div className="login-container">
      <div className="overlay"></div>
      <div className="login-box">
        <div className="header-content">
          {/* Logo - replace the src with your actual logo image */}
          <img src={logo} alt="Logo" />         
          <h2>Welcome Back</h2>
          <h4>Log in to continue using your account</h4>
        </div>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button onClick={handleLogin}>Login</button>
        <div className="signup-link">
          <span>Don't have an account?</span>
          <a href="/signup">Sign up</a>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
