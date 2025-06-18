import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/UserProfile.css';

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Get user email from localStorage (set this at login)
    let email = localStorage.getItem('userEmail');
    // Fallback: try to get from sessionStorage if not found
    if (!email) {
      email = sessionStorage.getItem('userEmail');
    }
    if (!email) {
      setError('No user email found. Please log in.');
      setLoading(false);
      return;
    }
    // Fetch all users and filter client-side (since backend does not support ?email=...)
    axios.get('http://localhost:8080/api/users')
      .then(res => {
        const found = Array.isArray(res.data)
          ? res.data.find(u => u.email === email)
          : null;
        if (found) {
          setUser(found);
        } else {
          setError('User not found.');
        }
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to load user profile.');
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="profile-container"><p>Loading...</p></div>;
  if (error) return <div className="profile-container"><p>{error}</p></div>;
  if (!user) return null;

  return (
    <div className="profile-container">
      <div className="profile-card">
        <div className="profile-pic">
          <img src="https://via.placeholder.com/150" alt="User Profile" />
        </div>
        <h2 className="profile-name">{user.name}</h2>
        <p className="profile-email">{user.email}</p>
        <p className="profile-phone">{user.phone || 'N/A'}</p>
        {/* Add more fields as needed */}
      </div>
    </div>
  );
};

export default UserProfile;