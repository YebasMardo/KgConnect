import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { authService } from '../services/auth.service';
import './Navbar.css';

const Navbar: React.FC = () => {
  const location = useLocation();
  
  const navItems = [
    { label: 'Tableau de bord', path: '/dashboard' },
    { label: 'Mes envois', path: '/envois' },
    { label: 'Messages', path: '/messages' },
  ];

  return (
    <nav className="navbar">
      <div className="container flex justify-between items-center h-full">
        <div className="flex items-center gap-8">
          <Link to="/" className="logo flex items-center gap-2">
            <div className="logo-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
                <line x1="12" y1="22.08" x2="12" y2="12"></line>
              </svg>
            </div>
            <span className="logo-text">KgConnect</span>
          </Link>
          
          <div className="nav-links flex gap-8">
            {navItems.map((item) => (
              <Link 
                key={item.path} 
                to={item.path} 
                className={`nav-link ${location.pathname === item.path ? 'active' : ''}`}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button className="icon-btn">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
              <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
            </svg>
          </button>
          <button 
            className="avatar" 
            onClick={() => { authService.logout(); window.location.href = '/connexion'; }}
            title="Se déconnecter"
          >
            JD
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
