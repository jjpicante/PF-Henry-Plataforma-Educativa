import React from "react";
import style from "./NavBar.module.css";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../Redux/actions";
import { auth } from "../../config/firebase";
import { signOut } from "firebase/auth";

function Navbar() {
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      await dispatch(logout());
      await signOut(auth);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <nav className={style.navbar}>
      <div className={style.navbarContainer}>
        <ul className={style.navList}>
          <li className={style.navItem}>
            <Link to="/Home" className={style.navLink}>
              Area Personal
            </Link>
          </li>
          <li className={`${style.navItem} ${style.dropdown}`}>
            <span className={style.miaula}>Aula</span>
            <ul className={style.dropdownContent}>
              <li>
                <Link to="/alumnos" className={style.navLink}>
                  Alumnos
                </Link>
              </li>
              <li>
                <Link to="/materias" className={style.navLink}>
                  Materias
                </Link>
              </li>
              <li>
                <Link to="/calificaciones" className={style.navLink}>
                  Calificaciones
                </Link>
              </li>
            </ul>
          </li>
            <li className={style.navItem}>
              <Link to="/Cursos" className={style.navLink}>
                Mis Cursos
              </Link>
            </li>
          <li className={`${style.navItem} ${style.dropdown}`}>
            <span className={style.miaula}>Crear</span>
            <ul className={style.dropdownContent}>
              <li>
                <Link to="/formAlumno" className={style.navLink}>
                  Alumno
                </Link>
              </li>
              <li>
                <Link to="/formProfesor" className={style.navLink}>
                  Profesor
                </Link>
              </li>
              </ul>
              </li>
          <li className={style.navItem}>
            <Link to="/carrito" className={style.navLink}>
              Cuotas
            </Link>
          </li>
          <li className={style.miPerfil}>
            <Link to="/miPerfil" className={style.navLink}>
              Mi Perfil
            </Link>
          </li>
          <li className={style.navItem}>
            <Link to="/" onClick={handleLogout} className={style.navLink}>
              Log Out
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
