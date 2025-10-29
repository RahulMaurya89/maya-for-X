import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../Logo.jsx'; // This is correct - Logo.jsx is in the components folder
import './Nav.css';

// SVG Icon Components
const MoonIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor">
    <path d="M480-120q-150 0-255-105T120-480q0-150 105-255t255-105q14 0 27.5 1t26.5 3q-41 29-65.5 75.5T444-660q0 90 63 153t153 63q55 0 101-24.5t75-65.5q2 13 3 26.5t1 27.5q0 150-105 255T480-120Zm0-80q88 0 158-48.5T740-375q-20 5-40 8t-40 3q-123 0-209.5-86.5T364-660q0-20 3-40t8-40q-78 32-126.5 102T200-480q0 116 82 198t198 82Zm-10-270Z"/>
  </svg>
);

const SunIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor">
    <path d="M480-360q50 0 85-35t35-85q0-50-35-85t-85-35q-50 0-85 35t-35 85q0 50 35 85t85 35Zm0 80q-83 0-141.5-58.5T280-480q0-83 58.5-141.5T480-680q83 0 141.5 58.5T680-480q0 83-58.5 141.5T480-280ZM200-440H40v-80h160v80Zm720 0H760v-80h160v80ZM440-760v-160h80v160h-80Zm0 720v-160h80v160h-80ZM256-650l-101-97 57-59 96 100-52 56Zm492 496-97-101 53-55 101 97-57 59Zm-98-550 97-101 59 57-100 96-56-52ZM154-212l101-97 55 53-97 101-59-57Zm326-268Z"/>
  </svg>
);

const Nav = () => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Performance: Initialize from localStorage immediately
    return localStorage.getItem('theme') === 'dark';
  });
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Performance: Memoize navigation links to prevent re-creation
  const navLinks = [
    { id: 'features', name: 'Features', ariaLabel: 'Navigate to Features section' },
    { id: 'pricing', name: 'Pricing', ariaLabel: 'Navigate to Pricing section' }
  ];

  // Performance: Combine theme effects into one
  React.useEffect(() => {
    const theme = isDarkMode ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [isDarkMode]);

  // Performance: Memoize toggle functions
  const toggleTheme = () => {
    setIsDarkMode(prev => !prev);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(prev => !prev);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  // Performance: Memoize login handler
  const handleLoginClick = () => {
    window.open('https://mayaagent.ai/maya-api/dashboard/', '_blank', 'noopener,noreferrer');
    closeMobileMenu();
  };

  // Performance: Memoize scroll handler
  const handleScrollLinkClick = (sectionId) => {
    closeMobileMenu();
    
    if (window.location.pathname !== '/') {
      window.location.pathname = '/';
      // Use requestAnimationFrame for better performance
      requestAnimationFrame(() => {
        setTimeout(() => {
          const element = document.getElementById(sectionId);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }, 100);
      });
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  // Accessibility: Close mobile menu on Escape key
  React.useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isMobileMenuOpen) {
        closeMobileMenu();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isMobileMenuOpen, closeMobileMenu]);

  // Accessibility: Prevent body scroll when mobile menu is open
  React.useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  return (
    <header className="navbar-header" role="banner">
      <nav className="navbar-container" role="navigation" aria-label="Main navigation">
        <Link 
          to="/" 
          className="navbar-logo" 
          onClick={() => handleScrollLinkClick('hero')} 
          aria-label="MayaAgent.AI - Go to homepage"
        >
          <Logo size={45} />
        </Link>

        <ul 
          className={`navbar-menu ${isMobileMenuOpen ? 'active' : ''}`}
          role="list"
          aria-label="Navigation menu"
        >
          {navLinks.map(link => (
            <li key={link.id} className="navbar-item" role="listitem">
              <button 
                className="navbar-link" 
                onClick={() => handleScrollLinkClick(link.id)}
                aria-label={link.ariaLabel}
                type="button"
              >
                {link.name}
              </button>
            </li>
          ))}
          <li className="navbar-item" role="listitem">
            <Link 
              to="/career" 
              className="navbar-link" 
              onClick={closeMobileMenu}
              aria-label="Navigate to Career page"
            >
              Career
            </Link>
          </li>
          <li className="navbar-item" role="listitem">
            <Link 
              to="/contact" 
              className="navbar-link" 
              onClick={closeMobileMenu}
              aria-label="Navigate to Contact page"
            >
              Contact
            </Link>
          </li>
        </ul>

        <div className="navbar-actions" role="group" aria-label="Navigation actions">
          {/* <button 
            onClick={toggleTheme} 
            className="theme-toggle-btn" 
            aria-label={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}
            aria-pressed={isDarkMode}
            type="button"
          >
            <span className="theme-icon" aria-hidden="true">
              {isDarkMode ? <MoonIcon /> : <SunIcon />}
            </span>
          </button> */}
          
          <button 
            onClick={handleLoginClick} 
            className="navbar-auth-btn navbar-login-btn"
            aria-label="Login to Maya Dashboard"
            type="button"
          >
            Login
          </button>
          
          <button 
            className={`hamburger-btn ${isMobileMenuOpen ? 'active' : ''}`} 
            onClick={toggleMobileMenu} 
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMobileMenuOpen}
            aria-controls="navbar-menu"
            type="button"
          >
            <span className="hamburger-line" aria-hidden="true"></span>
            <span className="hamburger-line" aria-hidden="true"></span>
            <span className="hamburger-line" aria-hidden="true"></span>
          </button>
        </div>
      </nav>
    </header>
  );
};

// Performance: Use React.memo to prevent unnecessary re-renders
export default React.memo(Nav);