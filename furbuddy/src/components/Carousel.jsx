import React, { useState, useEffect } from 'react';
import styles from '../styles/Carousel.module.css';

const images = [
  '/images/slide1.jpg',
  '/images/slide2.jpg',
  '/images/slide3.jpg',
  '/images/slide4.jpg',
];

export default function Carousel() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent(prev => (prev + 1) % images.length);
    }, 3000); // Slide every 3 seconds
    return () => clearInterval(timer);
  }, []);

  return (
    <div className={styles.carousel}>
      <img src={images[current]} alt={`Slide ${current + 1}`} className={styles.slide} />
    </div>
  );
}
