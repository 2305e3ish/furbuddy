import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/RegisteredUsers.css';

const RegisteredUsers = () => {
  const [hosts, setHosts] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8080/api/hosts')
      .then(response => setHosts(response.data))
      .catch(error => console.error('Error fetching registered users:', error));
  }, []);

  return (
    <div className="registered-users-container">
      <h1>Registered Users</h1>
      <ul>
        {hosts.map(host => (
          <li key={host.id}>
            <h3>{host.name}</h3>
            <p>{host.address}</p>
            <p>Pet Preferences: {host.petPreferences}</p>
            <p>Availability: {host.availability}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RegisteredUsers;
