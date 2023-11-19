import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "../styles/Navbar.css";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const userId = localStorage.getItem("userId");
  const [user, setUser] = useState([]);
  const navigate = useNavigate();
  const location=useLocation() 
  const handleClick=()=>{
    navigate('/profile')
    if(location.pathname==="/profile"){
      navigate('/home')
    }
  }


  useEffect(() => {
    fetch(`http://localhost:5000/api/users/${userId}`)
      .then((res) => res.json())
      .then((data) => setUser(data))
      .catch((err) => console.log(err));
  }, [userId]);
  // console.log(user);
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/home">
          <h3><span>Scribble</span> Notes</h3>
        </Link>
      </div>
      {userId?
        <div className="navbar-right">
          <div className="profile" onClick={handleClick}>
            <div className="profile-image"><img src={user.profileImage} alt="" /></div>
          </div>
        </div>
      :""}
    </nav>
  );
};

export default Navbar;
