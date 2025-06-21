import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Donate from './pages/Donate'; 
import SupportUs from './pages/SupportUs';
import UserProfile from './pages/UserProfile';
import Hospitals from './pages/Hospitals';
import SearchPets from './pages/SearchPets';
import Login from './pages/Login';
import Register from './pages/Register';
import PetStay from './pages/PetStay';
import DaycareCenters from './pages/DaycareCenters';
import GroupChat from './pages/GroupChat';
import MateFinder from './pages/MateFinder';
import RegisteredUsers from './pages/RegisteredUsers';
import './App.css'; // ensure this is imported for layout styles

export default function App() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDark(document.body.classList.contains('dark-mode'));
    });
    observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });
    setIsDark(document.body.classList.contains('dark-mode'));
    return () => observer.disconnect();
  }, []);

  const bgImage = {
    backgroundImage: `url(${process.env.PUBLIC_URL || ''}/images/animals.jpg)`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundAttachment: 'fixed',
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    zIndex: 0,
    opacity: isDark ? 0.32 : 0.5,
    filter: isDark ? 'blur(1.5px) brightness(0.7)' : 'blur(1.5px)',
    pointerEvents: 'none',
    transition: 'opacity 0.3s, filter 0.3s',
  };
  const overlay = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    zIndex: 1,
    background: isDark ? 'rgba(24,18,43,0.72)' : 'rgba(255,255,255,0.55)',
    pointerEvents: 'none',
    transition: 'background 0.3s',
  };

  return (
    <div className="app-container" style={{ position: 'relative', minHeight: '100vh' }}>
      <div style={bgImage} />
      <div style={overlay} />
      <Router>
        <Header />
        <div className="content" style={{ position: 'relative', zIndex: 2 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search-pets" element={<SearchPets />} />
            <Route path="/donate" element={<Donate />} />
            <Route path="/mate-finder" element={<MateFinder />} />
            <Route path="/pet-stay" element={<PetStay />} />
            <Route path="/petstay/daycare" element={<DaycareCenters />} />
            <Route path="/petstay/registered-users" element={<RegisteredUsers />} />
            <Route path="/hospitals" element={<Hospitals />} />
            <Route path="/groupchat" element={<GroupChat />} />
            <Route path="/support-us" element={<SupportUs />} />
            <Route path="/profile" element={<UserProfile />} /> 
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </div>
        <Footer />
      </Router>
    </div>
  );
}