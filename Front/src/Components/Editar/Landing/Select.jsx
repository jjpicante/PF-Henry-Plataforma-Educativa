import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { getProfesor, getStudent, postAlumnoDeBaja, postProfesorDeBaja, deleteAlumno, deleteProfesor } from "../../../Redux/actions";
import styles from "./EditarLanding.module.css";

export default function Select({ alumnos, profesores, año }) {
  const dispatch = useDispatch();
  const [renderArray, setRenderArray] = useState([]);
  const [selectedAlumno, setSelectedAlumno] = useState({
    name: "",
    apellido: "",
    nacionalidad: "",
    datebirth: "",
    email: "",
    username: "",
    password: "",
    anio: ""
  });
  const [selectedProfesor, setSelectedProfesor] = useState({
    name: "",
    apellido: "",
    email: "",
    datebirth: "",
    nacionalidad: "",
    username: "",
    password: "",
  })



  const handleDeleteAlumno = async (username) => {
    const alumno = await dispatch(getStudent(username));
    //await setSelectedAlumno(alumno);
    console.log(alumno);
    dispatch(postAlumnoDeBaja(alumno));
    dispatch(deleteAlumno(alumno.username))
    alert("alumno eliminado")
    setSelectedAlumno({
      name: "",
      apellido: "",
      nacionalidad: "",
      datebirth: "",
      email: "",
      username: "",
      password: "",
      anio: "",
    })
    window.location.reload();
  }

  const handleDeleteProfesor = async (username) => {
    const profesor = await dispatch(getProfesor(username));
    //await setSelectedAlumno(alumno);
    console.log(profesor);
    dispatch(postProfesorDeBaja(profesor));
    dispatch(deleteProfesor(profesor.username))
    alert("profesor eliminado")
    setSelectedProfesor({
      name: "",
      apellido: "",
      email: "",
      datebirth: "",
      nacionalidad: "",
      username: "",
      password: "",
    })
    window.location.reload();
  }


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
              username: profesor.username,
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
                username: profesor.username,
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
              nacionalidad: alumno[0].nacionalidad,
              datebirth: alumno[0].datebirth,
              email: alumno[0].email,
              password: alumno[0].password,
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
                nacionalidad: alumno[0].nacionalidad,
                datebirth: alumno[0].datebirth,
                email: alumno[0].email,
                password: alumno[0].password,
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
  }, [alumnos, profesores, dispatch, año]);



  return (
    <div>
      {renderArray.map((el, i) => {
        return (
          <div>
            <Link
              to={
                el.Rol === "student"
                  ? `/editarAlumno/${el.username}`
                  : `/editarProfesor/${el.username}`
              }
              key={i}
              className={styles.link}
              id={el.id}
            >
              <p>
                {el.apellido}, {el.name} - Rol: {el.Rol} - Año: {el.Aulas} - {el.email}
              </p>

            </Link>
            <button key={i} if onClick={
              el.Rol === "student"
                ? () => { handleDeleteAlumno(el.username) }
                : () => { handleDeleteProfesor(el.username) }
            }
            >Eliminar</button>
          </div>
        );
      })}
    </div>
  );
}
