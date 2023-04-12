import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';


function Navbar() {
  return (
    <nav>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/Aulas">MisAulas</Link></li>
        <li><Link to="/Cursos">MisCursos</Link></li>
        <li><Link to="/usuario">Usuario</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;