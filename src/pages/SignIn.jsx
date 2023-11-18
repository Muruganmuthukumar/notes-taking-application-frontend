import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function SignIn() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });
      if (response.ok) {
        const data = await response.json();
        login(data.userId, data.token);
        console.log("User logged in successfully");
        navigate('/home')
      } else {
        const data = await response.json();
        console.error("Login failed:", data.message);
      }
    } catch (error) {
      console.error("Login failed:", error.message);
    }
  };

  return (
    <>
      <div className="register-form">
        <h2>Sign In</h2>
        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="btn-1" type="submit">
            Sign In 
          </button>
          <span>
            Create an account? <Link to="/">Sign up</Link>
          </span>
        </form>
      </div>
    </>
  );
}

export default SignIn;
