import React, { useState, useEffect, useRef } from "react";
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
  const [profileImage, setProfileImage] = useState(null);
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");
  const profileImageInputRef = useRef(null);

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
      const updatedDetails = { ...editedDetails };
      if (profileImage) {
        const base64Image = await convertImageToBase64(profileImage);
        updatedDetails.profileImage = base64Image;
      }

      await fetch(`http://localhost:5000/api/users/${userId}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedDetails),
      });
      setEditMode(false);
    } catch (error) {
      console.error("Error updating user details:", error);
    }
  };

  const convertImageToBase64 = (image) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        resolve(reader.result);
      };
      reader.onerror = reject;
      reader.readAsDataURL(image);
    });
  };

  const changeUserPassword = async () => {
    try {
      await fetch(`http://localhost:5000/api/users/${userId}`, {
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

  const handleProfileImageChange = (e) => {
    const file = e.target.files[0];
    setProfileImage(file);
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
        className="profile-container"
        // style={{ height: editMode && !passwordMode ? "900px" : "700px" }}
      >
        {!passwordMode ? (
          <>
            <h1>Profile</h1>
            <div className="profile-input-container">
              <div className="profile-input">
                <label>Profile Image</label>
                {editMode && !passwordMode ? (
                  <>
                    <input
                      type="file"
                      name="profileImage"
                      accept="image/*"
                      onChange={handleProfileImageChange}
                      ref={profileImageInputRef}
                      style={{ display: "none" }}
                    />
                    <div
                      className="profile-image-container"
                      onClick={() => profileImageInputRef.current.click()}
                    >
                      {profileImage ? (
                        <img
                          src={URL.createObjectURL(profileImage)}
                          alt="Profile"
                          className="profile-image"
                        />
                      ) : (
                        <div className="default-profile-image">
                          <img
                            src={userDetails.profileImage}
                            alt="Default Profile"
                          />
                        </div>
                      )}
                    </div>
                  </>
                ) : (
                  <div className="data">
                    {profileImage ? (
                      <img
                        src={URL.createObjectURL(profileImage)}
                        alt="Profile"
                        className="profile-image"
                      />
                    ) : userDetails.profileImage ? (
                      <img
                        src={userDetails.profileImage}
                        alt="Profile"
                        className="profile-image"
                      />
                    ) : (
                      <div className="default-profile-image">
                        <img
                          src={userDetails.profileImage || ""}
                          alt="Default Profile"
                        />
                      </div>
                    )}
                  </div>
                )}
              </div>

              <div className="profile-input">
                <label>Name</label>
                {editMode && !passwordMode ? (
                  <input
                    type="text"
                    name="username"
                    autoFocus
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
            <h1>Update Password</h1>
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
              <button onClick={handleBack} className="back">
                Back
              </button>
              <button onClick={updateUserDetails} className="save">
                Save Changes
              </button>
              <button onClick={handleCancelEdit} className="cancel">
                Cancel
              </button>
            </div>
          ) : !editMode && passwordMode ? (
            <>
              <div className="btns">
                <button onClick={changeUserPassword} className="pass-btn">
                  Change Password
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
