import React from 'react'
import '../styles/Navbar.css'
import { useNavigate } from 'react-router-dom'

function Navbar() {
  const navigate = useNavigate();
  const handleClick=()=>{
    navigate('/profile')
  }
  return (
    <>
    <nav>
        <div>
            <img src="" alt="logo" />
        </div>
        <div>
        </div>
        <div onClick={handleClick}>
          <img src="" alt="profile"/>
        </div>
        <div>
          <p>Logout</p>
        </div>
    </nav>
    </>
  )
}

export default Navbar