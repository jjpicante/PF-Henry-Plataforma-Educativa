import React from "react";
import style from "./NavBarAdmin.module.css";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../../Redux/actions";
import { auth } from "../../../config/firebase";
import { signOut } from "firebase/auth";

function NavBarAdmin() {
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
            <Link to="/Admin" className={style.navLink}>
              DashBoard
            </Link>
          </li>
        </ul>
        <ul className={style.navList}>
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

export default NavBarAdmin;
