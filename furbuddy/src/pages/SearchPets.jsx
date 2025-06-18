import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/SearchPets.css';

const SearchPets = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchField, setSearchField] = useState('all');
  const [pets, setPets] = useState([]);
  const [filteredPets, setFilteredPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleFieldChange = (e) => {
    setSearchField(e.target.value);
    setSearchTerm('');
  };

  // Fetch all pets once on initial load
  useEffect(() => {
    const fetchPets = async () => {
      setLoading(true);
      try {
        const response = await axios.get('http://localhost:8080/api/pets');
        setPets(response.data);
        setFilteredPets(response.data);
      } catch (err) {
        setError('Failed to fetch pets.');
      } finally {
        setLoading(false);
      }
    };
    fetchPets();
  }, []);

  // Debounce search
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (searchTerm.trim() === '') {
        setFilteredPets(pets);
        return;
      }

      const term = searchTerm.toLowerCase();

      const filtered = pets.filter((pet) => {
        if (searchField === 'all') {
          return Object.values(pet).some((val) =>
            val?.toString().toLowerCase().includes(term)
          );
        } else {
          return pet[searchField]?.toString().toLowerCase().includes(term);
        }
      });

      setFilteredPets(filtered);
    }, 400);

    return () => clearTimeout(delayDebounce);
  }, [searchTerm, searchField, pets]);

  if (loading) return <div className="search-page"><h1 className="title">🔍 Search for Pets</h1><p>Loading...</p></div>;
  if (error) return <div className="search-page"><h1 className="title">🔍 Search for Pets</h1><p>{error}</p></div>;

  return (
    <div className="search-page">
      <h1 className="title">🔍 Search for Pets</h1>
      <div className="search-controls">
        <select value={searchField} onChange={handleFieldChange} className="search-field-select">
          <option value="all">All Fields</option>
          <option value="petType">Type</option>
          <option value="breed">Breed</option>
          <option value="ownerName">Owner</option>
          <option value="mobileNumber">Mobile</option>
          <option value="address">Address</option>
          <option value="name">Name</option>
          <option value="petImage">Image</option>
          <option value="age">Age</option>
        </select>
        <input
          type={searchField === 'age' ? 'number' : 'text'}
          className="search-box"
          placeholder={`Search by ${searchField === 'all' ? 'any field' : searchField}...`}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      {filteredPets.length > 0 ? (
        <table className="pet-table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Type</th>
              <th>Breed</th>
              <th>Owner</th>
              <th>Mobile</th>
              <th>Address</th>
              <th>Name</th>
              <th>Age</th>
            </tr>
          </thead>
          <tbody>
            {filteredPets.map((pet) => (
              <tr key={pet.id}>
                <td>
                  <img src={`http://localhost:8080/images/${pet.petImage}`} alt={pet.breed} className="pet-img" />
                </td>
                <td>{pet.petType}</td>
                <td>{pet.breed}</td>
                <td>{pet.ownerName}</td>
                <td>{pet.mobileNumber}</td>
                <td>{pet.address}</td>
                <td>{pet.name}</td>
                <td>{pet.age}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="no-results">No pets found.</p>
      )}
    </div>
  );
};

export default SearchPets;