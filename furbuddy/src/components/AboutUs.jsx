import React from 'react';
import styles from '../styles/AboutUs.module.css';

export default function AboutUs() {
  return (
    <section id="about-us" className={styles.about}>
      <div className="card-3d">
        <h2>About FurBuddy</h2>
        <p>
          FurBuddy is a pet adoption and care platform dedicated to connecting loving families
          with pets in need. We aim to provide safe homes and better lives for rescued animals.
  
          Our mission is to create a world where every pet has a loving home. We work closely
          with shelters, rescue organizations, and volunteers to ensure that every animal gets
          the care and attention they deserve. Whether you're looking to adopt a furry friend
          or learn more about pet care, FurBuddy is here to guide you every step of the way.
          At FurBuddy, we envision a future where no pet is left behind. We believe in the power
          of compassion and community to transform the lives of animals and their human companions.
          Join us in making a difference, one paw at a time.
        </p>
      </div>
    </section>
  );
}
