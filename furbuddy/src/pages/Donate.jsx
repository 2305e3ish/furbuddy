import React, { useState } from 'react';
import axios from 'axios';
import '../styles/Donate.css';

const Donate = () => {
  const [formData, setFormData] = useState({
    ownerName: '',
    mobileNumber: '',
    address: '',
    petType: '',
    breed: '', // changed from petBreed
    petImage: null,
    age: '',
    gender: '', // Add gender field
  });

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'file' ? files[0] : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      data.append('ownerName', formData.ownerName);
      data.append('mobileNumber', formData.mobileNumber);
      data.append('address', formData.address);
      data.append('petType', formData.petType);
      data.append('breed', formData.breed); // use breed
      data.append('age', formData.age);
      data.append('gender', formData.gender); // Add gender to form data
      data.append('petImage', formData.petImage);

      await axios.post('http://localhost:8080/api/pets', data, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      alert('Pet donation submitted successfully!');
      setFormData({
        ownerName: '',
        mobileNumber: '',
        address: '',
        petType: '',
        breed: '', // changed from petBreed
        petImage: null,
        age: '',
        gender: '', // Reset gender
      });
    } catch (error) {
      alert('Failed to submit donation. Please try again.');
    }
  };

  return (
    <>
      <h2>Donate Animals</h2>
      <form onSubmit={handleSubmit} className="donate-form">
        <div className="form-group">
          <label>Owner Name *</label>
          <input type="text" name="ownerName" required onChange={handleChange} value={formData.ownerName} />
        </div>
        <div className="form-group">
          <label>Mobile Number *</label>
          <input type="tel" name="mobileNumber" required onChange={handleChange} value={formData.mobileNumber} />
        </div>
        <div className="form-group">
          <label>Address *</label>
          <textarea name="address" rows="3" required onChange={handleChange} value={formData.address} />
        </div>
        <div className="form-group">
          <label>Pet Type *</label>
          <select name="petType" required onChange={handleChange} value={formData.petType}>
            <option value="">--Select--</option>
            <option value="Cat">Cat</option>
            <option value="Dog">Dog</option>
            <option value="Bunny">Bunny</option>
            <option value="Bird">Bird</option>
            <option value="Hamster">Hamster</option>
            <option value="Guinea Pig">Guinea Pig</option>
            <option value="Turtle">Turtle</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div className="form-group">
          <label>Pet Breed *</label>
          <input type="text" name="breed" required onChange={handleChange} value={formData.breed} />
        </div>
        <div className="form-group">
          <label>Upload Pet Image *</label>
          <input type="file" name="petImage" accept="image/*" required onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Pet Age *</label>
          <input type="number" name="age" min="0" required onChange={handleChange} value={formData.age} />
        </div>
        <div className="form-group">
          <label>Gender *</label>
          <select name="gender" required onChange={handleChange} value={formData.gender}>
            <option value="">--Select--</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>
        <button type="submit">Submit</button>
      </form>
    </>
  );
};

export default Donate;