import React, { useEffect, useState } from "react";
import axios from "axios";
import '../styles/SearchPets.css';

const SearchPets = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchField, setSearchField] = useState('all');
  const [genderFilter, setGenderFilter] = useState('all');
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

  // Debounce search and filter
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      let filtered = pets;

      // Gender filter
      if (genderFilter !== 'all') {
        filtered = filtered.filter((pet) =>
          pet.gender && pet.gender.toLowerCase() === genderFilter
        );
      }

      // Search filter
      if (searchTerm.trim() !== '') {
        filtered = filtered.filter((pet) => {
          if (searchField === 'all') {
            return (
              (pet.petType && pet.petType.toLowerCase().includes(searchTerm.toLowerCase())) ||
              (pet.breed && pet.breed.toLowerCase().includes(searchTerm.toLowerCase())) ||
              (pet.ownerName && pet.ownerName.toLowerCase().includes(searchTerm.toLowerCase())) ||
              (pet.mobileNumber && pet.mobileNumber.toLowerCase().includes(searchTerm.toLowerCase())) ||
              (pet.address && pet.address.toLowerCase().includes(searchTerm.toLowerCase())) ||
              (pet.gender && pet.gender.toLowerCase().includes(searchTerm.toLowerCase())) ||
              (pet.age && pet.age.toString().includes(searchTerm))
            );
          } else if (searchField === 'age') {
            return pet.age && pet.age.toString() === searchTerm;
          } else {
            return (
              pet[searchField] &&
              pet[searchField].toString().toLowerCase().includes(searchTerm.toLowerCase())
            );
          }
        });
      }

      setFilteredPets(filtered);
    }, 400);

    return () => clearTimeout(delayDebounce);
  }, [searchTerm, searchField, genderFilter, pets]);

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
          <option value="gender">Gender</option>
          <option value="age">Age</option>
        </select>
        <input
          type={searchField === 'age' ? 'number' : 'text'}
          className="search-box"
          placeholder={`Search by ${searchField === 'all' ? 'any field' : searchField}...`}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          value={genderFilter}
          onChange={(e) => setGenderFilter(e.target.value)}
          className="gender-filter-select"
          style={{ marginLeft: "10px" }}
        >
          <option value="all">All Genders</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
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
              <th>Gender</th>
              <th>Age</th>
            </tr>
          </thead>
          <tbody>
            {filteredPets.map((pet) => (
              <tr key={pet.id}>
                <td>
                  <img
                    src={`http://localhost:8080/images/${pet.petImage}`}
                    alt={pet.breed}
                    className="pet-img"
                  />
                </td>
                <td>{pet.petType}</td>
                <td>{pet.breed}</td>
                <td>{pet.ownerName}</td>
                <td>{pet.mobileNumber}</td>
                <td>{pet.address}</td>
                <td>{pet.gender}</td>
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