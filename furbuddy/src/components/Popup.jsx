import React from 'react';
import '../styles/global.css';

export default function Popup({ open, message, onClose }) {
  if (!open) return null;
  return (
    <div className="adopt-popup-overlay" onClick={onClose}>
      <div className="adopt-popup" onClick={e => e.stopPropagation()}>
        <div className="adopt-popup-msg">{message}</div>
        <button className="glossy-btn" style={{marginTop: 24}} onClick={onClose}>OK</button>
      </div>
    </div>
  );
}
