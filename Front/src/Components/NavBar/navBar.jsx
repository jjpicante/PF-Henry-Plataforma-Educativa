import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';


function Navbar() {

  return (
    <nav>
    <div className="nav-container">
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/Aulas">Mis Aulas</Link></li>
        <li><Link to="/Cursos">Mis Cursos</Link></li>
        <li><Link to="/Logout">Log Out</Link></li>
      </ul>
    </div>
  </nav>
  );
}

export default Navbar;