import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/PetStay.css';

const PetStay = () => {
  const navigate = useNavigate();

  return (
    <div className="pet-stay-container">
      <h1 style={{fontFamily:'Segoe UI', color:'#7b6cf6', fontWeight:700, letterSpacing:1, textShadow:'0 2px 8px #e0c3fc'}}>Pet Stay</h1>
      <div className="button-container">
        <div className="button-box glossy-card" style={{width:'420px', minWidth:'260px', maxWidth:'420px', padding:'44px 28px', margin:'0 24px', background:'linear-gradient(120deg, #f6e7f7 60%, #e0c3fc 100%)', boxShadow:'0 8px 24px 0 rgba(123, 108, 246, 0.13)'}} onClick={() => navigate('/petstay/daycare')}>
          <img src="/images/daycare.jpeg" alt="Daycare Centers" style={{height:'200px', objectFit:'cover', borderRadius:'10px', marginBottom:'22px'}} />
          <div style={{fontWeight:600, color:'#7b6cf6', fontSize:'1.25em', letterSpacing:0.5, textShadow:'0 1px 4px #e0c3fc'}}>Daycare Centers</div>
        </div>
        <div className="button-box glossy-card" style={{width:'420px', minWidth:'260px', maxWidth:'420px', padding:'44px 28px', margin:'0 24px', background:'linear-gradient(120deg, #f6e7f7 60%, #e0c3fc 100%)', boxShadow:'0 8px 24px 0 rgba(123, 108, 246, 0.13)'}} onClick={() => navigate('/petstay/registered-users')}>
          <img src="/images/man.jpg" alt="Registered Users" style={{height:'200px', objectFit:'cover', borderRadius:'10px', marginBottom:'22px'}} />
          <div style={{fontWeight:600, color:'#7b6cf6', fontSize:'1.25em', letterSpacing:0.5, textShadow:'0 1px 4px #e0c3fc'}}>Registered Users</div>
        </div>
      </div>
    </div>
  );
};

export default PetStay;
