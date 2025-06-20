import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import RequestStay from '../components/RequestStay';
import '../styles/PetStay.css';

const PetStay = () => {
  const [daycareCenters, setDaycareCenters] = useState([]);
  const [hosts, setHosts] = useState([]);
  const [selectedStay, setSelectedStay] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch daycare centers
    axios.get('http://localhost:8080/api/daycare-centers')
      .then(response => setDaycareCenters(response.data))
      .catch(error => console.error('Error fetching daycare centers:', error));

    // Fetch hosts
    axios.get('http://localhost:8080/api/hosts')
      .then(response => setHosts(response.data))
      .catch(error => console.error('Error fetching hosts:', error));
  }, []);

  const handleStayClick = (stay) => {
    setSelectedStay(stay);
  };

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div className="pet-stay-container">
      <h1>Pet Stay</h1>
      <div className="button-container">
        <div className="button-box" onClick={() => handleNavigation('/daycare-centers')}>
          <img src="/images/daycare.jpeg" alt="Daycare Centers" />
        </div>
        <div className="button-box" onClick={() => handleNavigation('/registered-users')}>
          <img src="/images/man.jpg" alt="Registered Users" />
        </div>
      </div>
      <div className="pet-stay-content">
        <div className="left-half">
          <h2>Daycare Centers</h2>
          <ul>
            {daycareCenters.map(center => (
              <li key={center.id} onClick={() => handleStayClick(center)}>
                <h3>{center.name}</h3>
                <p>{center.address}</p>
                <p>Contact: {center.contactNumber}</p>
              </li>
            ))}
          </ul>
        </div>
        <div className="right-half">
          <h2>Registered Users</h2>
          <ul>
            {hosts.map(host => (
              <li key={host.id} onClick={() => handleStayClick(host)}>
                <h3>{host.name}</h3>
                <p>{host.address}</p>
                <p>Pet Preferences: {host.petPreferences}</p>
                <p>Availability: {host.availability}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
      {selectedStay && (
        <div className="request-stay-details">
          <RequestStay />
        </div>
      )}
    </div>
  );
};

export default PetStay;
