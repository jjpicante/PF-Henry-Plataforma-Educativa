import React from "react";
import { Link } from "react-router-dom";
import styles from "./LandingAdmin.module.css";
import NavBarAdmin from "./navbarAdMIN/NavBar";

const LandingAdmin = () => {
  return (
    <div>
      <div>
        <NavBarAdmin />
      </div>
      <div className={styles.container}>
        <Link to="/editarUsuario" className={styles.link}>
          Lista Alumnos/Profesores
        </Link>
        <Link to="/listamaterias" className={styles.link}>
          Lista Materias{" "}
        </Link>
        <Link to="/formsubject" className={styles.link}>
          Crear Materias
        </Link>
        <Link to="/formAlumno" className={styles.link}>
          Crear Alumnos
        </Link>
        <Link to="/formProfesor" className={styles.link}>
          Crear Profesores
        </Link>
      </div>
    </div>
  );
};

export default LandingAdmin;
