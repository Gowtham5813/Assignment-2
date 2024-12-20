import React from 'react';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="logo">Quyl.</div>
      <input type="text" placeholder="Search your course" className="search-bar" />
      <div className="header-icons">
        <span className="notification-icon">🔔</span>
        <span className="profile-icon">Adeline H. Dancy</span>
      </div>
    </header>
  );
};

export default Header;
