import React from 'react';
import { Link } from 'react-router-dom';

const Header = ({ searchQuery, setSearchQuery, onAddClick }) => {
  return (
    <header className="main-header">
      <Link to="/" style={{ textDecoration: 'none' }}>
        <h1 className="brand-title">Plantae</h1>
      </Link>
      <div className="header-controls">
        <input 
          type="text" 
          placeholder="Search your garden..." 
          className="glass-search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <div className="glass-add-btn" onClick={onAddClick}>
          <span>+</span>
        </div>
      </div>
    </header>
  );
};

export default Header;