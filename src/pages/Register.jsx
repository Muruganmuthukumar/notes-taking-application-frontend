import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Register.css'

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          password,
          email,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('userId', data.userId);
        localStorage.setItem('token', data.token);
        console.log('User registered successfully');
        navigate('/sign-in');
      } else {
        const data = await response.json();
        console.error('Registration failed:', data.message);
      }
    } catch (error) {
      console.error('Registration failed:', error.message);
    }
  };

  return (
    <>
      <div className="register-form">
        <h2>Register</h2>
        <form onSubmit={handleRegister}>
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
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button className="btn-1" type="submit">
            Register
          </button>
          <span>
            Already have an account? <Link to="/sign-in">Sign in</Link>
          </span>
        </form>
      </div>
    </>
  );
}

export default Register;
