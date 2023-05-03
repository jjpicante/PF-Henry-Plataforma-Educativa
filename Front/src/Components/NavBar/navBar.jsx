import React from "react";
import style from "./NavBar.module.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../Redux/actions";
import { auth } from "../../config/firebase";
import { signOut } from "firebase/auth";

function Navbar() {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.userData);

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
      
          {userData?.rol === "profesor" && (
            <div className={style.navbarContainer}>
            <ul className={style.navList}>
              <li className={style.navItem}>
                <Link to="/Home" className={style.navLink}>
                  Area Personal
                </Link>
              </li>
            <li className={style.navItem}>
              <Link to="/Cursos" className={style.navLink}>
                Mis Cursos
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
          )}

          {userData?.rol === "student" && (
            <div className={style.navbarContainer}>
            <ul className={style.navList}>
              <li className={style.navItem}>
                <Link to="/Home" className={style.navLink}>
                  Area Personal
                </Link>
              </li>
              <li className={`${style.navItem} ${style.dropdown}`}>
                <li className={style.miaula}>Aula</li>
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
          )}
    </nav>
  );
}

export default Navbar;
          

