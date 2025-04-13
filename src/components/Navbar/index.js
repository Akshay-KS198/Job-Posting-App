import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './index.css'

export default function Navbar() {
  const location = useLocation();

  return (
    <nav className="navbar">
      <h2 className="logo">Jobsy</h2>
      <div className="nav-links">
        <Link to="/" className={location.pathname === '/' ? 'active' : ''}>Home</Link>
        <Link to="/add" className={location.pathname === '/add' ? 'active' : ''}>Add Job</Link>
      </div>
    </nav>
  );
}
