
import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/PetStay.css';

const PetStay = () => {
  const navigate = useNavigate();

  return (
    <div className="pet-stay-container">
      <h1>Pet Stay</h1>
      <div className="button-container">
        <div className="button-box" onClick={() => navigate('/petstay/daycare')}>
          <img src="/images/daycare.jpeg" alt="Daycare Centers" />
          <div>Daycare Centers</div>
        </div>
        <div className="button-box" onClick={() => navigate('/petstay/registered-users')}>
          <img src="/images/man.jpg" alt="Registered Users" />
          <div>Registered Users</div>
        </div>
      </div>
    </div>
  );
};

export default PetStay;
