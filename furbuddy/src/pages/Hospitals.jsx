import React, { useState, useEffect } from 'react';
import styles from '../styles/Hospitals.module.css';

const Hospitals = () => {
  const [hospitals, setHospitals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchHospitals = async () => {
      try {
        let url = '/api/vethospitals';
        if (searchTerm) {
          url = `/api/vethospitals/search?keyword=${encodeURIComponent(searchTerm)}`;
        }

        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setHospitals(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchHospitals();
  }, [searchTerm]);

  if (loading) return <div className={styles.loading}>Loading hospitals...</div>;
  if (error) return <div className={styles.error}>Error: {error}</div>;

  return (
    <div className={styles.hospitalsPage}>
      <h1 className={styles.pageTitle}>Pet Hospitals Near You</h1>
      
      <div className={styles.searchContainer}>
        <input
          type="text"
          placeholder="Search hospitals by name or address..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={styles.searchInput}
        />
      </div>

      <div className={styles.hospitalsContainer}>
        {hospitals.length > 0 ? (
          hospitals.map((hospital) => (
            <div key={hospital.id} className={styles.hospitalCard}>
              <h2 className={styles.hospitalName}>{hospital.name}</h2>
              <p className={styles.hospitalAddress}>
                <span className={styles.label}>Address:</span> {hospital.address}
              </p>
              {hospital.phone && (
                <p className={styles.hospitalPhone}>
                  <span className={styles.label}>Phone:</span> {hospital.phone}
                </p>
              )}
              {hospital.website && (
                <p className={styles.hospitalWebsite}>
                  <span className={styles.label}>Website:</span>
                  <a href={hospital.website} target="_blank" rel="noopener noreferrer">
                    {hospital.website}
                  </a>
                </p>
              )}
              {/* Only use googleMapLink, as backend returns camelCase */}
              {hospital.googleMapLink && (
                <div className={styles.mapLink}>
                  <a href={hospital.googleMapLink} target="_blank" rel="noopener noreferrer">
                    View on Google Maps
                  </a>
                </div>
              )}
            </div>
          ))
        ) : (
          <div className={styles.noResults}>
            {searchTerm ? 'No hospitals match your search.' : 'No hospitals found.'}
          </div>
        )}
      </div>
    </div>
  );
};

export default Hospitals;