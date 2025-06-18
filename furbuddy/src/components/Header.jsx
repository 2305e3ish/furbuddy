import { Link, useNavigate } from 'react-router-dom';
import styles from '../styles/Header.module.css';
import logo from '../assets/logo.png';
import { useState, useEffect } from 'react';

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return !!(localStorage.getItem('userEmail') || sessionStorage.getItem('userEmail'));
  });
  const navigate = useNavigate();

  useEffect(() => {
    const handleStorage = () => {
      setIsLoggedIn(!!(localStorage.getItem('userEmail') || sessionStorage.getItem('userEmail')));
    };
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  
  useEffect(() => {
    setIsLoggedIn(!!(localStorage.getItem('userEmail') || sessionStorage.getItem('userEmail')));
  }, // eslint-disable-next-line
  [window.location.pathname]);

  const handleLogout = () => {
    localStorage.removeItem('userEmail');
    sessionStorage.removeItem('userEmail');
    setIsLoggedIn(false);
    navigate('/');
  };

  return (
    <header className={styles.header}>
      <div className={styles.logoContainer}>
        <img src={logo} alt="FurBuddy Logo" className={styles.logo} />
        <span className={styles.title}>FurBuddy</span>
      </div>
      <nav className={styles.nav}>
        {isLoggedIn ? (
          <>
            <Link to="/">Home</Link>
            <a href="#about-us">About Us</a>
            <a href="#meet-pets">Meet Pets</a>
            <Link to="/search-pets">Search Pets</Link>
            <Link to="/donate">Donate</Link>
            <Link to="/hospitals">Pet Hospitals</Link>
            <Link to="/support-us">Support Us</Link>
            <button onClick={handleLogout} className={styles.logoutButton} style={{background:'none',border:'none',color:'inherit',cursor:'pointer',padding:0}}>Logout</button>
            <span onClick={() => navigate('/profile')} className={styles.profileCircle} title="Profile" style={{marginLeft:'0.5rem'}}>
              <svg width="32" height="32" viewBox="0 0 32 32"><circle cx="16" cy="16" r="16" fill="#bbb" /></svg>
            </span>
          </>
        ) : (
          <>
            <Link to="/">Home</Link>
            <a href="#about-us">About Us</a>
            <a href="#meet-pets">Meet Pets</a>
            <Link to="/support-us">Support Us</Link>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </nav>
    </header>
  );
}