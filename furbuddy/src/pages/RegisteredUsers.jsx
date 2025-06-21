import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/RegisteredUsers.css';
import PetStayRequestForm from '../components/PetStayRequestForm';
import '../components/PetStayRequestForm.css';

const RegisteredUsers = () => {
  const [hosts, setHosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchHosts = async () => {
      try {
        const url = 'http://localhost:8080/api/users/hosts';
        const response = await axios.get(url);
        setHosts(response.data);
      } catch (err) {
        setError('Failed to fetch registered users.');
      } finally {
        setLoading(false);
      }
    };
    fetchHosts();
  }, []);

  const filteredHosts = hosts.filter(host =>
    host.name && host.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCardClick = (user) => {
    setSelectedUser(user);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedUser(null);
  };

  const handlePetStaySubmit = async (form) => {
    try {
      const payload = {
        stayType: 'With Registered User',
        startDate: form.stayFrom,
        endDate: form.stayTo,
        messages: form.specialInstructions,
        pet: {
          name: form.petName,
          petType: form.petType
        },
        owner: selectedUser // pass the full user object as owner
      };
      await axios.post('http://localhost:8080/api/pet-stay-requests', payload);
      alert(`Pet stay request sent to ${selectedUser.name}!`);
    } catch (err) {
      alert('Failed to send pet stay request.');
    }
    setShowModal(false);
    setSelectedUser(null);
  };

  if (loading) return <div className="loading">Loading registered users...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="registered-users-container">
      <h1>Registered Users</h1>
      <div className="searchContainer">
        <input
          type="text"
          placeholder="Search users by name..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className="searchInput"
        />
      </div>
      <div className="registered-users-list">
        {filteredHosts.length > 0 ? (
          filteredHosts.map(host => (
            <div key={host.id} className="registered-user-card pastel-card" onClick={() => handleCardClick(host)}>
              <div className="registered-user-details">
                <h3 className="registered-user-name">{host.name}</h3>
                <div className="registered-user-info">
                  <span className="info-label">Address:</span> {host.address|| 'N/A'}<br />
                  <span className="info-label">Phone:</span> {host.phone || 'N/A'}<br />
                  <span className="info-label">Email:</span> {host.email || 'N/A'}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="noResults">No registered users found.</div>
        )}
      </div>
      {showModal && selectedUser && (
        <PetStayRequestForm user={selectedUser} onClose={handleCloseModal} onSubmit={handlePetStaySubmit} />
      )}
    </div>
  );
};

export default RegisteredUsers;
