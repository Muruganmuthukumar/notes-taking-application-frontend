import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Profile.css";

const Profile = () => {
  const [userDetails, setUserDetails] = useState({});
  const [editedDetails, setEditedDetails] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [selectedTheme, setSelectedTheme] = useState("light");
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const user = await fetchUserDetailsFromAPI(userId);
        setUserDetails(user);
        setEditedDetails(user);
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    fetchUserDetails();
  }, [userId]);

  const fetchUserDetailsFromAPI = async (id) => {
    const token = localStorage.getItem("token");
    const response = await fetch(`http://localhost:5000/api/users/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      return response.json();
    } else {
      throw new Error("Failed to fetch user details");
    }
  };

  const updateUserDetails = async () => {
    try {
      await fetch(`http://localhost:5000/api/users/${userId}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editedDetails),
      });
      setEditMode(false);
    } catch (error) {
      console.error("Error updating user details:", error);
    }
  };

  const changeUserPassword = async () => {
    try {
      await fetch(`http://localhost:5000/api/users/${userId}/change-password`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password, newPassword }),
      });
      // Reset password fields after successful password change
      setPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error) {
      console.error("Error changing password:", error);
    }
  };

  const deleteUserAccount = async () => {
    try {
      await fetch(`http://localhost:5000/api/users/${userId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      });
      navigate("/sign-in");
    } catch (error) {
      console.error("Error deleting account:", error);
    }
  };

  const handleInputChange = (e) => {
    setEditedDetails({ ...editedDetails, [e.target.name]: e.target.value });
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleNewPasswordChange = (e) => {
    setNewPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleThemeChange = (e) => {
    setSelectedTheme(e.target.value);
    // Apply the theme change logic here (you can use a global context or CSS classes)
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/sign-in");
  };

  const handleEditClick = () => {
    setEditMode(true);
  };

  const handleCancelEdit = () => {
    setEditMode(false);
    setEditedDetails(userDetails);
  };
  const handleBack = () => {
    navigate("/home");
  };

  return (
    <div className={`profile-container ${selectedTheme}`}>
      <h1>User Profile</h1>
      <div className="profile-input">
        <label>Username:</label>
        {editMode ? (
          <input
            type="text"
            name="username"
            value={editedDetails.username || ""}
            onChange={handleInputChange}
          />
        ) : (
          <div>{userDetails.username}</div>
        )}
      </div>
      <div className="profile-input">
        <label>Email:</label>
        {editMode ? (
          <input
            type="text"
            name="email"
            value={editedDetails.email || ""}
            onChange={handleInputChange}
          />
        ) : (
          <div>{userDetails.email}</div>
        )}
      </div>
      <div className="profile-theme">
        <label>Theme Preference:</label>
        <div className="radio-buttons">
          <label>
            <input
              type="radio"
              value="light"
              checked={selectedTheme === "light"}
              onChange={handleThemeChange}
            />
            Light
          </label>
          <label>
            <input
              type="radio"
              value="dark"
              checked={selectedTheme === "dark"}
              onChange={handleThemeChange}
            />
            Dark
          </label>
        </div>
      </div>
      {editMode && (
        <>
          <div className="profile-input">
            <label>Password:</label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={handlePasswordChange}
            />
          </div>
          <div className="profile-input">
            <label>New Password:</label>
            <input
              type="password"
              name="newPassword"
              value={newPassword}
              onChange={handleNewPasswordChange}
            />
          </div>
          <div className="profile-input">
            <label>Confirm Password:</label>
            <input
              type="password"
              name="confirmPassword"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
            />
          </div>
          <button onClick={changeUserPassword}>Change Password</button>
        </>
      )}
      <div className="profile-buttons">
        {editMode ? (
          <>
            <button onClick={updateUserDetails}>Save Changes</button>
            <button onClick={handleBack}>Back</button>
            <button onClick={handleCancelEdit}>Cancel</button>
          </>
        ) : (
          <>
            <button onClick={handleBack}>Back</button>
            <button onClick={handleEditClick}>Edit Profile</button>
            <button onClick={deleteUserAccount}>Delete Account</button>
          </>
        )}
        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
};

export default Profile;
