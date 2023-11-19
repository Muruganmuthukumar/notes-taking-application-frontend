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
  const [passwordMode, setPasswordMode] = useState(false);
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
      setPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setPasswordMode(false);
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

  const handlePasswordMode = () => {
    setPasswordMode(true);
    setEditMode(false);
  };
  const handleCancelPasswordMode = () => {
    setPasswordMode(false);
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/sign-in");
  };

  const handleEditClick = () => {
    setEditMode(true);
    setPasswordMode(false);
  };

  const handleCancelEdit = () => {
    setEditMode(false);
    setEditedDetails(userDetails);
  };
  const handleBack = () => {
    navigate("/home");
  };

  return (
    <div className="profile-content">
      <div
        className={"profile-container"}
        style={{ height: editMode && !passwordMode ? "700px" : "700px" }}
      >
        {!passwordMode ? (
          <>
            <h1>Profile</h1>
            <div className="profile-input-container">
              <div className="profile-input">
                <label>Name</label>
                {editMode && !passwordMode ? (
                  <input
                    type="text"
                    name="username"
                    value={editedDetails.username || ""}
                    onChange={handleInputChange}
                  />
                ) : (
                  <div className="data">{userDetails.username}</div>
                )}
              </div>
              <div className="profile-input">
                <label>Email</label>
                {editMode ? (
                  <input
                    type="text"
                    name="email"
                    value={editedDetails.email || ""}
                    onChange={handleInputChange}
                  />
                ) : (
                  <div className="data">{userDetails.email}</div>
                )}
              </div>
            </div>
          </>
        ) : (
          <>
            <h1>Change Password</h1>
          </>
        )}
        {passwordMode && (
          <div className="edit-container">
            <div className="profile-input">
              <input
                type="password"
                placeholder="Password"
                name="password"
                value={password}
                onChange={handlePasswordChange}
              />
            </div>
            <div className="profile-input">
              <input
                type="password"
                placeholder="New Password"
                name="newPassword"
                value={newPassword}
                onChange={handleNewPasswordChange}
              />
            </div>
            <div className="profile-input">
              <input
                type="password"
                placeholder="Confirm Password"
                name="confirmPassword"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
              />
            </div>
          </div>
        )}
        <div className="profile-buttons">
          {editMode ? (
            <div className="btns">
              <button onClick={updateUserDetails} className="save">
                Save Changes
              </button>
              <button onClick={handleCancelEdit} className="cancel">
                Cancel
              </button>
              <button onClick={handleBack} className="back">
                Back
              </button>
            </div>
          ) : !editMode && passwordMode ? (
            <>
              <div className="btns">
                <button onClick={changeUserPassword} className="pass-btn">
                  Update Password
                </button>
                <button onClick={handleCancelPasswordMode} className="cancel">
                  Cancel
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="btns">
                <button onClick={handleBack} className="back">
                  Back
                </button>
                <button onClick={handleEditClick} className="edit">
                  Edit Profile
                </button>
              </div>
            </>
          )}
          <div className="last-btns">
            <button onClick={handlePasswordMode} className="new-pass">
              Change Password
            </button>
            <button onClick={handleLogout} className="logout">
              Logout
            </button>
            <button onClick={deleteUserAccount} className="delete">
              Delete Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
