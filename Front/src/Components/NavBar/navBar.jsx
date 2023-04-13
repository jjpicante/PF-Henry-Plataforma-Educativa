import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { clearUserRole } from '../../Redux/actions';
import './NavBar.css';


function Navbar() {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(clearUserRole());
  }

  return (
    <nav>
      <div className="nav-container">
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/Aulas">Mis Aulas</Link></li>
          <li><Link to="/Cursos">Mis Cursos</Link></li>
          <li><Link to="/" onClick={handleLogout}>Log Out</Link></li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;