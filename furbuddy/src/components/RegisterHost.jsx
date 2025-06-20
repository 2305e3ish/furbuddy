import React, { useState } from 'react';
import axios from 'axios';
import '../styles/RegisterHost.css';

const RegisterHost = () => {
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    petPreferences: '',
    availability: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8080/api/hosts', formData);
      alert('Host registered successfully!');
      setFormData({
        name: '',
        address: '',
        petPreferences: '',
        availability: ''
      });
    } catch (error) {
      alert('Failed to register host. Please try again.');
    }
  };

  return (
    <div className="register-host-container">
      <h2>Register as a Host</h2>
      <form onSubmit={handleSubmit} className="register-host-form">
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Address</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Pet Preferences</label>
          <input
            type="text"
            name="petPreferences"
            value={formData.petPreferences}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Availability</label>
          <input
            type="text"
            name="availability"
            value={formData.availability}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default RegisterHost;
