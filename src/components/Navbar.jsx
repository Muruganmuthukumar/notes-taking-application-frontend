import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Navbar.css";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const userId = localStorage.getItem("userId");
  const [user, setUser] = useState([]);
  const navigate = useNavigate();

  const handleClick=()=>{
    navigate('/profile')
  }


  useEffect(() => {
    fetch(`http://localhost:5000/api/users/${userId}`)
      .then((res) => res.json())
      .then((data) => setUser(data))
      .catch((err) => console.log(err));
  }, [userId]);
  const userName = user.username;
  const userFirstLetter = userName ? userName[0].toUpperCase() : "";

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/">
          <img src="/path/to/your/logo.png" alt="Logo" className="logo" />
        </Link>
      </div>
      {userId?
        <div className="navbar-right">
          <div className="profile" onClick={handleClick}>
            <div className="profile-image">{userFirstLetter}</div>
            {/* <div className="profile-name">{userName}</div> */}
          </div>
        </div>
      :""}
    </nav>
  );
};

export default Navbar;
