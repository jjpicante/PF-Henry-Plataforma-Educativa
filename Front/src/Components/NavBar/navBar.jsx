import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { clearUserRole } from '../../Redux/actions';
import { auth, signOut } from '../../../../Back/src/config/firebase';
import './NavBar.css';


function Navbar() {
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try{
      await signOut(auth)
    }catch (err){
      console.log(err)
    }
    // Eliminar la informacion del usuario del localStorage
    localStorage.removeItem('userData');
    dispatch(clearUserRole());
    
  }

   // Obtener el valor del rol del usuario desde localStorage
   const userRole = localStorage.getItem('userRole');

  return (
    <nav>
      <div className="nav-container">
        <ul>
          <li><Link to="/Home">Area Personal</Link></li>
          <li><Link to="/Aulas">Mis Aulas</Link></li>
          
          {userRole === 'profesor' && (
            <li><Link to="/Cursos">Mis Cursos</Link></li>
          )}

          <li><Link to="/form">Formulario</Link></li>
          <li><Link to="/" onClick={handleLogout}>Log Out</Link></li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;