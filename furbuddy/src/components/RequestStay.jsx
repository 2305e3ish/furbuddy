import React, { useState } from 'react';
import axios from 'axios';
import '../styles/RequestStay.css';
import StayTypeSelector from './StayTypeSelector';

const RequestStay = () => {
  const [formData, setFormData] = useState({
    petId: '',
    hostId: '',
    startDate: '',
    endDate: '',
    messages: ''
  });
  const [stayType, setStayType] = useState('Daycare');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8080/api/pet-stay-requests', { ...formData, stayType });
      alert('Stay request submitted successfully!');
      setFormData({
        petId: '',
        hostId: '',
        startDate: '',
        endDate: '',
        messages: ''
      });
    } catch (error) {
      alert('Failed to submit stay request. Please try again.');
    }
  };

  return (
    <div className="request-stay-container">
      <h2>Request a Stay</h2>
      <form onSubmit={handleSubmit} className="request-stay-form">
        <div className="form-group">
          <label>Pet ID</label>
          <input
            type="text"
            name="petId"
            value={formData.petId}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Host ID</label>
          <input
            type="text"
            name="hostId"
            value={formData.hostId}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Start Date</label>
          <input
            type="date"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>End Date</label>
          <input
            type="date"
            name="endDate"
            value={formData.endDate}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Messages</label>
          <textarea
            name="messages"
            value={formData.messages}
            onChange={handleChange}
          ></textarea>
        </div>
        <StayTypeSelector stayType={stayType} setStayType={setStayType} />
        <button type="submit">Submit Request</button>
      </form>
    </div>
  );
};

export default RequestStay;
