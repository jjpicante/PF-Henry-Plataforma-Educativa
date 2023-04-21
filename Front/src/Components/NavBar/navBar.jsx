import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import './NavBar.css';
import { logout } from '../../Redux/actions';


function Navbar() {
  const dispatch = useDispatch();
  const handleLogout = async () => {
    try{
      await dispatch(logout());
    }catch (err){
      console.log(err)
    }
  }

  return (
    <nav>
      <div className="nav-container">
        <ul>
          <li><Link to="/Home">Area Personal</Link></li>
          <li><Link to="/Aulas">Mis Aulas</Link></li>
          <li><Link to="/Cursos">Mis Cursos</Link></li>
          <li><Link to="/form">Formulario</Link></li>
          <li><Link to="/" onClick={handleLogout}>Log Out</Link></li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;