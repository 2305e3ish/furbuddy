import React from 'react';
import styles from '../styles/MeetPets.module.css';

const pets = [
  { name: 'Buddy', breed: 'Golden Retriever', age: '2 years', image: '/images/pet1.jpg' },
  { name: 'Milo', breed: 'Tabby Cat', age: '1 year', image: '/images/pet2.jpg' },
  { name: 'Luna', breed: 'Siberian Husky', age: '3 years', image: '/images/pet3.jpg' },
  { name: 'Coco', breed: 'Shih Tzu', age: '4 years', image: '/images/pet4.jpg' },
];

export default function MeetPets() {
  return (
    <section id="meet-pets">
      <div className="card-3d">
        <h2>Meet Our Pets</h2>
        <div className={styles.petGrid}>
          {pets.map((pet, index) => (
            <div key={index} className={styles.petCard}>
              <img src={pet.image} alt={pet.name} />
              <h3>{pet.name}</h3>
              <p><strong>Breed:</strong> {pet.breed}</p>
              <p><strong>Age:</strong> {pet.age}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
