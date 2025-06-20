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
  const [selectedFileName, setSelectedFileName] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [popupMsg, setPopupMsg] = useState("");

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === 'file') {
      setSelectedFileName(files[0]?.name || '');
    }
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
      data.append('breed', formData.breed);
      data.append('age', formData.age);
      data.append('gender', formData.gender);
      data.append('petImage', formData.petImage);

      await axios.post('http://localhost:8080/api/pets', data, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setPopupMsg('Pet donation submitted successfully!');
      setShowPopup(true);
      setTimeout(() => setShowPopup(false), 1800);
      setFormData({
        ownerName: '',
        mobileNumber: '',
        address: '',
        petType: '',
        breed: '',
        petImage: null,
        age: '',
        gender: '',
      });
      setSelectedFileName('');
    } catch (error) {
      setPopupMsg('Failed to submit donation. Please try again.');
      setShowPopup(true);
      setTimeout(() => setShowPopup(false), 1800);
    }
  };

  return (
    <>
      <h2>Donate Animals</h2>
      <form onSubmit={handleSubmit} className="donate-form card-form-layout">
        <div className="card-form-halves">
          <div className="card-form-half">
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
          </div>
          <div className="card-form-half">
            <div className="form-group">
              <label>Pet Breed *</label>
              <input type="text" name="breed" required onChange={handleChange} value={formData.breed} />
            </div>
            <div className="form-group">
              <label>Upload Pet Image *</label>
              <label htmlFor="petImage" className="custom-file-label">Choose File</label>
              <input id="petImage" type="file" name="petImage" accept="image/*" required onChange={handleChange} />
              {selectedFileName && <span className="selected-file-name">{selectedFileName}</span>}
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
          </div>
        </div>
        <div className="submit-btn-row">
          <button type="submit">Submit</button>
        </div>
      </form>
      {showPopup && (
        <div className="adopt-popup-overlay">
          <div className="adopt-popup">
            <span role="img" aria-label="success" style={{fontSize:'2em'}}>🎉</span>
            <div className="adopt-popup-msg">{popupMsg}</div>
          </div>
        </div>
      )}
    </>
  );
};

export default Donate;