import React from 'react';
import Carousel from '../components/Carousel';
import AboutUs from '../components/AboutUs';
import MeetPets from '../components/MeetPets';

export default function Home() {
  return (
    <div>
      <Carousel />
      <AboutUs />
      <MeetPets />
    </div>
  );
}
