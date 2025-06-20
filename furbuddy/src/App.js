import React from 'react';
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
  return (
    <div className="app-container">
      <Router>
        <Header />
        <div className="content">
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