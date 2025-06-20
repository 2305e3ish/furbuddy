import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/MateFinder.css";

const getUserEmail = () => localStorage.getItem('userEmail') || sessionStorage.getItem('userEmail') || '';

const MateFinder = () => {
  const [gender, setGender] = useState("");
  const [breed, setBreed] = useState("");
  const [type, setType] = useState("");
  const [pets, setPets] = useState([]);
  const [filteredPets, setFilteredPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedPet, setSelectedPet] = useState(null);
  const [mateForm, setMateForm] = useState({
    yourPetType: '',
    yourPetBreed: '',
    numDays: '',
    action: '',
    message: ''
  });
  const [showPopup, setShowPopup] = useState(false);
  const [popupMsg, setPopupMsg] = useState('');
  const [requestedPets, setRequestedPets] = useState([]);

  useEffect(() => {
    const fetchPets = async () => {
      try {
        setLoading(true);
        const response = await axios.get("http://localhost:8080/api/pets");
        setPets(response.data);
        setFilteredPets(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch pets.");
        setLoading(false);
      }
    };
    fetchPets();
  }, []);

  useEffect(() => {
    let filtered = pets;
    if (gender) {
      filtered = filtered.filter((pet) => pet.gender && pet.gender.toLowerCase() === gender);
    }
    if (breed) {
      filtered = filtered.filter((pet) => pet.breed && pet.breed.toLowerCase().includes(breed.toLowerCase()));
    }
    if (type) {
      filtered = filtered.filter((pet) => pet.petType && pet.petType.toLowerCase().includes(type.toLowerCase()));
    }
    setFilteredPets(filtered);
  }, [gender, breed, type, pets]);

  useEffect(() => {
    // Load requested pets for this user from localStorage
    const email = getUserEmail();
    if (email) {
      const saved = localStorage.getItem(`mateRequests_${email}`);
      setRequestedPets(saved ? JSON.parse(saved) : []);
    }
  }, []);

  const handleRequestClick = (pet) => {
    setSelectedPet(pet);
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
    setSelectedPet(null);
    setMateForm({ yourPetType: '', yourPetBreed: '', numDays: '', action: '', message: '' });
  };

  const handleMateFormChange = (e) => {
    setMateForm({ ...mateForm, [e.target.name]: e.target.value });
  };

  const handleMateFormSubmit = (e) => {
    e.preventDefault();
    setShowModal(false);
    setPopupMsg('Mate request sent successfully!');
    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 1800);
    setMateForm({ yourPetType: '', yourPetBreed: '', numDays: '', action: '', message: '' });
    // Save requested pet for this user
    const email = getUserEmail();
    if (email && selectedPet) {
      const updated = [...requestedPets, selectedPet.id];
      setRequestedPets(updated);
      localStorage.setItem(`mateRequests_${email}`, JSON.stringify(updated));
    }
  };

  if (loading) return <div className="mate-finder-page"><h1>🐾 Mate Finder</h1><p>Loading...</p></div>;
  if (error) return <div className="mate-finder-page"><h1>🐾 Mate Finder</h1><p>{error}</p></div>;

  return (
    <div className="mate-finder-page">
      <h1>🐾 Mate Finder</h1>
      <div className="mate-finder-filters">
        <label>
          Type:
          <input type="text" value={type} onChange={e => setType(e.target.value)} placeholder="Enter type" style={{marginLeft:8, marginRight:16}} />
        </label>
        <label>
          Breed:
          <input type="text" value={breed} onChange={e => setBreed(e.target.value)} placeholder="Enter breed" style={{marginLeft:8, marginRight:16}} />
        </label>
        <label>
          What gender mate do you require?
          <select value={gender} onChange={e => setGender(e.target.value)} style={{marginLeft:8}}>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </label>
      </div>
      {filteredPets.length > 0 ? (
        <div className="pet-card-grid">
          {filteredPets.map((pet) => {
            const isRequested = requestedPets.includes(pet.id);
            return (
              <div className="pet-card glossy-card" key={pet.id}>
                <div className="pet-img-wrap">
                  <img
                    src={`http://localhost:8080/images/${pet.petImage}`}
                    alt={pet.breed}
                    className="pet-img"
                  />
                </div>
                <div className="pet-card-details">
                  <div className="pet-type">{pet.petType}</div>
                  <div className="pet-breed">Breed: <span>{pet.breed}</span></div>
                  <div className="pet-gender-age">
                    <span className="pet-gender">{pet.gender}</span>
                    <span className="pet-age">Age: {pet.age}</span>
                  </div>
                  <div className="pet-owner">Owner: <span>{pet.ownerName}</span></div>
                  <div className="pet-mobile">Mobile: <span>{pet.mobileNumber}</span></div>
                  <div className="pet-address">Address: <span>{pet.address}</span></div>
                  <div style={{ display: 'flex', justifyContent: 'center', marginTop: 18 }}>
                    <button
                      className="glossy-btn"
                      onClick={() => handleRequestClick(pet)}
                      disabled={isRequested}
                      style={isRequested ? { background: '#b7b5e3', cursor: 'not-allowed' } : {}}
                    >
                      {isRequested ? 'Requested' : 'Request'}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <p style={{marginTop:24}}>No matching mates found.</p>
      )}
      {showModal && selectedPet && (
        <div className="adopt-popup-overlay">
          <div className="adopt-popup" style={{minWidth:320}}>
            <span role="img" aria-label="mate" style={{fontSize:'2em'}}>💌</span>
            <div className="adopt-popup-msg" style={{marginBottom:12}}>Request to Mate with <b>{selectedPet.petType} ({selectedPet.breed})</b></div>
            <form onSubmit={handleMateFormSubmit} style={{width:'100%'}}>
              <div style={{marginBottom:10}}>
                <input
                  type="text"
                  name="yourPetType"
                  value={mateForm.yourPetType}
                  onChange={handleMateFormChange}
                  placeholder="Your Pet's Type"
                  style={{width:'100%',padding:'10px',borderRadius:8,border:'1.5px solid #e0c3fc',marginBottom:8}}
                  required
                />
                <input
                  type="text"
                  name="yourPetBreed"
                  value={mateForm.yourPetBreed}
                  onChange={handleMateFormChange}
                  placeholder="Your Pet's Breed"
                  style={{width:'100%',padding:'10px',borderRadius:8,border:'1.5px solid #e0c3fc',marginBottom:8}}
                  required
                />
                <select
                  name="numDays"
                  value={mateForm.numDays}
                  onChange={handleMateFormChange}
                  style={{width:'100%',padding:'10px',borderRadius:8,border:'1.5px solid #e0c3fc',marginBottom:8}}
                  required
                >
                  <option value="">Number of Days</option>
                  <option value="1-3">1-3 days</option>
                  <option value="4-7">4-7 days</option>
                  <option value="8-14">8-14 days</option>
                  <option value="15+">15+ days</option>
                </select>
                <div style={{marginBottom:8, display:'flex', gap:16, alignItems:'center'}}>
                  <input
                    type="radio"
                    id="givePet"
                    name="action"
                    value="give"
                    checked={mateForm.action === 'give'}
                    onChange={handleMateFormChange}
                    required
                  />
                  <label htmlFor="givePet" style={{marginRight:12, fontWeight:500, color:'#7b6cf6', cursor:'pointer'}}>Give Pet</label>
                  <input
                    type="radio"
                    id="takePet"
                    name="action"
                    value="take"
                    checked={mateForm.action === 'take'}
                    onChange={handleMateFormChange}
                  />
                  <label htmlFor="takePet" style={{fontWeight:500, color:'#7b6cf6', cursor:'pointer'}}>Take Pet</label>
                </div>
                <textarea
                  name="message"
                  value={mateForm.message}
                  onChange={handleMateFormChange}
                  placeholder="Message (optional)"
                  style={{width:'100%',padding:'10px',borderRadius:8,border:'1.5px solid #e0c3fc',minHeight:60}}
                />
              </div>
              <button type="submit" className="glossy-btn" style={{width:'100%',marginTop:8}}>Send Request</button>
            </form>
          </div>
        </div>
      )}
      {showPopup && (
        <div className="adopt-popup-overlay">
          <div className="adopt-popup">
            <span role="img" aria-label="success" style={{fontSize:'2em'}}>🎉</span>
            <div className="adopt-popup-msg">{popupMsg}</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MateFinder;
