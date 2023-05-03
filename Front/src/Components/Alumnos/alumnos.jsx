import Navbar from "../NavBar/navBar";
import style from "./Alumnos.module.css";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getStudents } from "../../Redux/actions";

export default function Alumnos() {
  const dispatch = useDispatch();
  const allAlumnos = useSelector((state) => state.students);
  const userData = useSelector((state) => state.userData);
  const alumnos = allAlumnos?.filter((elem) => elem[0].anio === userData.anio);
  
  alumnos.sort((a, b) =>
    a[0].apellido < b[0].apellido ? -1 : a[0].apellido > b[0].apellido ? 1 : 0
  );
  useEffect(() => {
    dispatch(getStudents());
  }, [dispatch]);

  const [hoveredAlumno, setHoveredAlumno] = useState(null);

  const handleAlumnoHover = (alumno) => {
    setHoveredAlumno(alumno);
  };

  return (
    <div className={style.container}>
      <Navbar />
      <h1 className={style.titulo}>Alumnos {userData.anio}</h1>
      <div className={style.containerAlumnos}>
        {alumnos?.map((el, i) => {
          return (
            <div key={i}>
            <a
              key={i}
              className={style.alumnos}
              onMouseEnter={() => handleAlumnoHover(el)}
              onMouseLeave={() => handleAlumnoHover(null)}
            >
              {i + 1}- {el[0].apellido}, {el[0].name}
              </a>
              {hoveredAlumno === el && (
                <div className={style.datosAlumno}>
                  <p className={style.nombre}>Nombre: {el[0].name}</p>
                  <p>Fecha de nacimiento: {el[0].datebirth.slice(5,10)}</p>
                  <p>Email: {el[0].email}</p>
                  <p>Año: {el[0].anio}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
            
            