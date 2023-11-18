import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Register.css';

const Register = () => {
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
        console.log('User registered successfully');
        navigate('/signin')
    } else {
        const data = await response.json();
        console.error('Registration failed:', data.message);

      }
    } catch (error) {
      console.error('Registration failed:', error.message);
    }
  };

  return (
        <div className='register-form'>
        <h2>Sign Up</h2>
        <form action="">
            <input type="text" placeholder='Username' value={username} onChange={(e) => setUsername(e.target.value)} />
            <input type="email" value={email} placeholder='Email' onChange={(e) => setEmail(e.target.value)} />
            <input type="password" value={password} placeholder='Password' onChange={(e) => setPassword(e.target.value)} />
            <button className='btn-1' onClick={handleRegister}>Sign up</button>
            <span>Have an account? <Link to='/signin'>Sign in</Link></span>
        </form>
        </div>  );
};

export default Register;
