import React, { useState, useEffect } from "react";
import axios from "axios";
import API from "../api";
const Profile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await API.get('/users/Profile'); // Use API instance
        setUser(response.data.user);
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };
    fetchProfile();
  }, []);

  if (!user) return <h2>Loading profile...</h2>;

  return (
    <div className="profile-container">
      <img
        src={user.profilePic || "/default-avatar.png"}
        alt="Profile"
        className="profile-img"
      />
      <h2>
        {user.firstname} {user.lastname}
      </h2>
      <p>Email: {user.email}</p>
      <p>Role: {user.role}</p>
    </div>
  );
};

export default Profile;
