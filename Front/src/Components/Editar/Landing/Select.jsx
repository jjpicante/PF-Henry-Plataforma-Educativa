import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { getProfesor } from "../../../Redux/actions";
import styles from "./EditarLanding.module.css";

export default function Select({ alumnos, profesores, año }) {
  const dispatch = useDispatch();
  const [renderArray, setRenderArray] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      let newArray = [];
      if (profesores) {
        //Tods los profesores
        if (año === "Filtrar Año" || año === "Mostrar Todos") {
          for (const profesor of profesores) {
            const profe = await dispatch(getProfesor(profesor.username));
            const aulas = profe.Aulas;
            newArray.push({
              apellido: profesor.apellido,
              name: profesor.name,
              Rol: profesor.rol,
              Aulas: aulas.map((aula) => aula.anio).join(", "),
            });
          }

          //Profesores por año
        } else {
          for (const profesor of profesores) {
            const profe = await dispatch(getProfesor(profesor.username));
            const aulas = profe.Aulas;
            if (aulas.some((elem) => elem.anio === año)) {
              newArray.push({
                apellido: profesor.apellido,
                name: profesor.name,
                Rol: profesor.rol,
                Aulas: aulas.map((aula) => aula.anio).join(", "),
              });
            }
          }
        }
      }
      if (alumnos) {
        //Tods los Alumnos
        if (año === "Filtrar Año" || año === "Mostrar Todos") {
          for (const alumno of alumnos) {
            newArray.push({
              username: alumno[0].username,
              apellido: alumno[0].apellido,
              name: alumno[0].name,
              Rol: alumno[0].rol,
              Aulas: alumno[0].anio,
            });
          }

          //Alumnos por año
        } else {
          for (const alumno of alumnos) {
            if (alumno[0].anio === año) {
              newArray.push({
                username: alumno[0].username,
                apellido: alumno[0].apellido,
                name: alumno[0].name,
                Rol: alumno[0].rol,
                Aulas: alumno[0].anio,
              });
            }
          }
        }
      }
      setRenderArray(newArray);
    };
    fetchData();
  }, [alumnos, profesores, dispatch, año]); //!BREAKPOINT

  return (
    <div>
      {renderArray.map((el, i) => {
        return (
          <Link to={`/editarAlumno/${el.username}`} key={i} className={styles.link} id={el.id}>
            <p>
              {el.apellido}, {el.name} - Rol: {el.Rol} - Año: {el.Aulas}
            </p>
          </Link>
        );
      })}
    </div>
  );
}
