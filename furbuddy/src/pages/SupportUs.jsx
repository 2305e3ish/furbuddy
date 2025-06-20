import React, { useState } from 'react';
import '../styles/SupportUs.css';

const indianStates = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
  "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand",
  "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur",
  "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab",
  "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura",
  "Uttar Pradesh", "Uttarakhand", "West Bengal"
];

const SupportUs = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    state: '',
    agree: false,
  });

  const [showPopup, setShowPopup] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name === 'phone' && !/^\d{0,10}$/.test(value)) {
      return;
    }
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.agree) {
      alert("Please agree to the terms and conditions.");
      return;
    }
    if (formData.phone.length !== 10) {
      alert("Phone number must be exactly 10 digits.");
      return;
    }
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
    setFormData({
      fullName: '',
      phone: '',
      email: '',
      address: '',
      city: '',
      state: '',
      agree: false,
    });
  };

  return (
    <div>
      <h2>Fill out the form below to become a volunteer</h2>
    
      <form className="donate-form card-form-layout" onSubmit={handleSubmit}>
        <div className="card-form-halves">
          <div className="card-form-half">
            <div className="form-group">
              <label>Full Name <span className="required">*</span></label>
              <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>Phone Number <span className="required">*</span></label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                placeholder="10-digit number"
                maxLength="10"
              />
            </div>
            <div className="form-group">
              <label>Email ID <span className="required">*</span></label>
              <input type="text" name="email" value={formData.email} onChange={handleChange} required />
            </div>
          </div>
          <div className="card-form-half">
            <div className="form-group">
              <label>Address <span className="required">*</span></label>
              <input type="text" name="address" value={formData.address} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>City <span className="required">*</span></label>
              <input type="text" name="city" value={formData.city} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>State <span className="required">*</span></label>
              <select name="state" value={formData.state} onChange={handleChange} required>
                <option value="">Select a State</option>
                {indianStates.map((state, index) => (
                  <option key={index} value={state}>{state}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
        <div className="form-group checkbox-group">
          <label>
            <input type="checkbox" name="agree" checked={formData.agree} onChange={handleChange} />
            &nbsp; I’ve read and agree to the Terms and Conditions for volunteering this organization. <span className="required">*</span>
          </label>
        </div>
        <div className="submit-btn-row">
          <button type="submit">Submit</button>
        </div>
      </form>

      {showPopup && (
        <div className="popup-overlay">
          <div className="popup">
            <h3>Thank You!</h3>
            <p>Your support form has been submitted successfully.</p>
            <button onClick={closePopup}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SupportUs;
