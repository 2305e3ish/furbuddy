import React, { useState, useEffect } from 'react';
import styles from '../styles/DaycareCenters.module.css';

const DaycareCenters = () => {
  const [daycareCenters, setDaycareCenters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchDaycareCenters = async () => {
      try {
        let url = '/api/daycare-centers';
        if (searchTerm) {
          url = `/api/daycare-centers/search?keyword=${encodeURIComponent(searchTerm)}`;
        }

        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setDaycareCenters(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDaycareCenters();
  }, [searchTerm]);

  if (loading) return <div className={styles.loading}>Loading daycare centers...</div>;
  if (error) return <div className={styles.error}>Error: {error}</div>;

  return (
    <div className={styles.daycareCentersPage}>
      <h1 className={styles.pageTitle}>Daycare Centers Near You</h1>

      <div className={styles.searchContainer}>
        <input
          type="text"
          placeholder="Search daycare centers by name or address..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={styles.searchInput}
        />
      </div>

      <div className={styles.daycareCentersContainer}>
        {daycareCenters.length > 0 ? (
          daycareCenters.map((center) => (
            <div key={center.id} className={styles.daycareCard}>
              <h2 className={styles.daycareName}>{center.name}</h2>
              <p className={styles.daycareAddress}>
                <span className={styles.label}>Address:</span>{' '}
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(center.address)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.mapLink}
                >
                  {center.address}
                </a>
              </p>
              {center.contactNumber && (
                <p className={styles.daycareContact}>
                  <span className={styles.label}>Contact:</span> {center.contactNumber}
                </p>
              )}
            </div>
          ))
        ) : (
          <div className={styles.noResults}>
            {searchTerm ? 'No daycare centers match your search.' : 'No daycare centers found.'}
          </div>
        )}
      </div>
    </div>
  );
};

export default DaycareCenters;
