import React, { useEffect, useState } from "react";
import axios from "axios";
import '../styles/SearchPets.css';

const SearchPets = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchField, setSearchField] = useState('all');
  const [pets, setPets] = useState([]);
  const [filteredPets, setFilteredPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [requestedPets, setRequestedPets] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [popupMsg, setPopupMsg] = useState('');

  const userEmail = localStorage.getItem('userEmail') || sessionStorage.getItem('userEmail') || 'guest';

  const handleFieldChange = (e) => {
    setSearchField(e.target.value);
    setSearchTerm('');
  };

  // Fetch all pets once on initial load
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

  // Load requested pets for this user from localStorage
  useEffect(() => {
    const saved = localStorage.getItem(`requestedPets_${userEmail}`);
    if (saved) setRequestedPets(JSON.parse(saved));
  }, [userEmail]);

  // Debounce search and filter
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      let filtered = pets;

      // Search filter with prefix matching
      if (searchTerm.trim() !== '') {
        filtered = filtered.filter((pet) => {
          if (searchField === 'all') {
            return (
              (pet.petType && pet.petType.toLowerCase().startsWith(searchTerm.toLowerCase())) ||
              (pet.breed && pet.breed.toLowerCase().startsWith(searchTerm.toLowerCase())) ||
              (pet.ownerName && pet.ownerName.toLowerCase().startsWith(searchTerm.toLowerCase())) ||
              (pet.mobileNumber && pet.mobileNumber.toLowerCase().startsWith(searchTerm.toLowerCase())) ||
              (pet.address && pet.address.toLowerCase().startsWith(searchTerm.toLowerCase())) ||
              (pet.gender && pet.gender.toLowerCase().startsWith(searchTerm.toLowerCase())) ||
              (pet.age && pet.age.toString().startsWith(searchTerm))
            );
          } else if (searchField === 'age') {
            return pet.age && pet.age.toString() === searchTerm;
          } else {
            return (
              pet[searchField] &&
              pet[searchField].toString().toLowerCase().startsWith(searchTerm.toLowerCase())
            );
          }
        });
      }

      setFilteredPets(filtered);
    }, 400);

    return () => clearTimeout(delayDebounce);
  }, [searchTerm, searchField, pets]);

  const handleRequestAdopt = async (petId) => {
    try {
      await axios.post('http://localhost:8080/api/pets/adopt-request', null, { params: { petId } });
      const updated = [...requestedPets, petId];
      setRequestedPets(updated);
      localStorage.setItem(`requestedPets_${userEmail}`, JSON.stringify(updated));
      setPopupMsg('Request sent successfully! Email sent to pet owner.');
      setShowPopup(true);
      setTimeout(() => setShowPopup(false), 1800);
    } catch (err) {
      setPopupMsg('Failed to send adoption request.');
      setShowPopup(true);
      setTimeout(() => setShowPopup(false), 1800);
    }
  };

  if (loading) return <div className="search-page"><h1 className="title">🔍 Search for Pets</h1><p>Loading...</p></div>;
  if (error) return <div className="search-page"><h1 className="title">🔍 Search for Pets</h1><p>{error}</p></div>;

  return (
    <div className="search-page">
      <h1 className="title">🔍 Search for Pets</h1>
      <div className="glossy-controls">
        <select value={searchField} onChange={handleFieldChange} className="glossy-select">
          <option value="all">All Fields</option>
          <option value="petType">Type</option>
          <option value="breed">Breed</option>
          <option value="ownerName">Owner</option>
          <option value="mobileNumber">Mobile</option>
          <option value="address">Address</option>
          <option value="gender">Gender</option>
          <option value="age">Age</option>
        </select>
        <input
          type={searchField === 'age' ? 'number' : 'text'}
          className="glossy-input"
          placeholder={`Search by ${searchField === 'all' ? 'any field' : searchField}...`}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      {filteredPets.length > 0 ? (
        <div className="pet-card-grid">
          {filteredPets.map((pet) => (
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
                <div className="pet-owner">Owner: <span>{pet.ownerName}</span></div>
                <div className="pet-mobile">Mobile: <span>{pet.mobileNumber}</span></div>
                <div className="pet-address">Address: <span>{pet.address}</span></div>
                <div className="pet-gender-age">
                  <span className="pet-gender">{pet.gender}</span>
                  <span className="pet-age">Age: {pet.age}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: 18 }}>
                  {requestedPets.includes(pet.id) ? (
                    <button className="glossy-btn requested-btn" disabled>Requested Pet</button>
                  ) : (
                    <button className="glossy-btn" onClick={() => handleRequestAdopt(pet.id)}>Request to Adopt</button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="no-results">No pets found.</p>
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

export default SearchPets;