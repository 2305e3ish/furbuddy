import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/MateFinder.css";

const MateFinder = () => {
  const [gender, setGender] = useState("");
  const [breed, setBreed] = useState("");
  const [type, setType] = useState("");
  const [pets, setPets] = useState([]);
  const [filteredPets, setFilteredPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  if (loading) return <div className="mate-finder-page"><h1>🐾 Mate Finder</h1><p>Loading...</p></div>;
  if (error) return <div className="mate-finder-page"><h1>🐾 Mate Finder</h1><p>{error}</p></div>;

  return (
    <div className="mate-finder-page">
      <h1>🐾 Mate Finder</h1>
      <div className="mate-finder-filters">
        <label>
          What gender mate do you require?
          <select value={gender} onChange={e => setGender(e.target.value)} style={{marginLeft:8, marginRight:16}}>
            <option value="">Any</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </label>
        <label>
          Breed:
          <input type="text" value={breed} onChange={e => setBreed(e.target.value)} placeholder="Enter breed" style={{marginLeft:8, marginRight:16}} />
        </label>
        <label>
          Type:
          <input type="text" value={type} onChange={e => setType(e.target.value)} placeholder="Enter type" style={{marginLeft:8}} />
        </label>
      </div>
      {filteredPets.length > 0 ? (
        <table className="pet-table" style={{marginTop:24}}>
          <thead>
            <tr>
              <th>Image</th>
              <th>Type</th>
              <th>Breed</th>
              <th>Gender</th>
              <th>Age</th>
              <th>Owner</th>
              <th>Mobile</th>
              <th>Address</th>
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
                    style={{width:80, height:80, objectFit:'cover'}}
                  />
                </td>
                <td>{pet.petType}</td>
                <td>{pet.breed}</td>
                <td>{pet.gender}</td>
                <td>{pet.age}</td>
                <td>{pet.ownerName}</td>
                <td>{pet.mobileNumber}</td>
                <td>{pet.address}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p style={{marginTop:24}}>No matching mates found.</p>
      )}
    </div>
  );
};

export default MateFinder;
