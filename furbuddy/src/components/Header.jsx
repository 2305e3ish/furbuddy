import { Link, useNavigate } from 'react-router-dom';
import styles from '../styles/Header.module.css';
import logo from '../assets/logo.png';
import { useState, useEffect } from 'react';

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return !!(localStorage.getItem('userEmail') || sessionStorage.getItem('userEmail'));
  });
  const [menuOpen, setMenuOpen] = useState(false);
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

  const handleMenuToggle = () => setMenuOpen((open) => !open);
  const handleNavClick = () => setMenuOpen(false);

  return (
    <header className={styles.header}>
      <div className={styles.logoContainer}>
        <img src={logo} alt="FurBuddy Logo" className={styles.logo} />
        <span className={styles.title}>FurBuddy</span>
      </div>
      <button className={styles.hamburger} onClick={handleMenuToggle} aria-label="Toggle navigation">
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect y="7" width="32" height="4" rx="2" fill="#ff7a59" />
          <rect y="14" width="32" height="4" rx="2" fill="#ff7a59" />
          <rect y="21" width="32" height="4" rx="2" fill="#ff7a59" />
        </svg>
      </button>
      <nav className={`${styles.nav} ${menuOpen ? styles.open : ''}`}>
        {isLoggedIn ? (
          <>
            <Link to="/" onClick={handleNavClick}>Home</Link>
            <Link to="/search-pets" onClick={handleNavClick}>Search Pets</Link>
            <Link to="/donate" onClick={handleNavClick}>Donate</Link>
            <Link to="/mate-finder" onClick={handleNavClick}>Mate Finder</Link>
            <Link to="/pet-stay" onClick={handleNavClick}>Pet Stay</Link>
            <Link to="/hospitals" onClick={handleNavClick}>Pet Hospitals</Link>
            <Link to="/groupchat" onClick={handleNavClick}>Community Chat</Link>
            <Link to="/support-us" onClick={handleNavClick}>Support Us</Link>
            <button onClick={() => { handleLogout(); handleNavClick(); }} className={styles.logoutButton} style={{background:'none',border:'none',color:'inherit',cursor:'pointer',padding:0}}>Logout</button>
            <span onClick={() => { navigate('/profile'); handleNavClick(); }} className={styles.profileCircle} title="Profile" style={{marginLeft:'0.5rem', display:'inline-flex', alignItems:'center', justifyContent:'center', width:'36px', height:'36px', borderRadius:'50%', overflow:'hidden', background:'#fff', boxShadow:'0 2px 8px #e0c3fc', cursor:'pointer'}}>
              <img src="/images/anonymous_user.webp" alt="Profile" style={{width:'32px', height:'32px', objectFit:'cover', borderRadius:'50%'}} />
            </span>
          </>
        ) : (
          <>
            <Link to="/" onClick={handleNavClick}>Home</Link>
            <Link to="/support-us" onClick={handleNavClick}>Support Us</Link>
            <Link to="/login" onClick={handleNavClick}>Sign In</Link>
          </>
        )}
      </nav>
    </header>
  );
}