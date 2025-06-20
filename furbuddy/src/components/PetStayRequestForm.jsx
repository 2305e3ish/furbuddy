import React, { useState } from 'react';
import './PetStayRequestForm.css';

const PetStayRequestForm = ({ user, onClose, onSubmit }) => {
  const [form, setForm] = useState({
    petName: '',
    petType: '',
    stayFrom: '',
    stayTo: '',
    specialInstructions: ''
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <div className="pet-stay-modal-overlay">
      <div className="pet-stay-modal">
        <button className="close-btn" onClick={onClose}>&times;</button>
        <h2>Send Pet Stay Request to {user.name}</h2>
        <form onSubmit={handleSubmit} className="pet-stay-form">
          <label>Pet Name
            <input type="text" name="petName" value={form.petName} onChange={handleChange} required />
          </label>
          <label>Pet Type
            <input type="text" name="petType" value={form.petType} onChange={handleChange} required />
          </label>
          <label>Stay From
            <input type="date" name="stayFrom" value={form.stayFrom} onChange={handleChange} required />
          </label>
          <label>Stay To
            <input type="date" name="stayTo" value={form.stayTo} onChange={handleChange} required />
          </label>
          <label>Special Instructions
            <textarea name="specialInstructions" value={form.specialInstructions} onChange={handleChange} />
          </label>
          <button type="submit" className="submit-btn">Send Request</button>
        </form>
      </div>
    </div>
  );
};

export default PetStayRequestForm;
