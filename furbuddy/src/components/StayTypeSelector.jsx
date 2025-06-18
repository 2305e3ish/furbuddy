import React from 'react';

const StayTypeSelector = ({ stayType, setStayType }) => {
  return (
    <div className="stay-type-selector">
      <label>Select Stay Type:</label>
      <select value={stayType} onChange={(e) => setStayType(e.target.value)}>
        <option value="Daycare">Daycare</option>
        <option value="With Registered User">With Registered User</option>
      </select>
    </div>
  );
};

export default StayTypeSelector;
