import React from "react";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Navbar from "../../NavBar/navBar";
import { getStudents, getProfesors } from "../../../Redux/actions";
import Select from "./Select.jsx";
import style from "./EditarLanding.module.css";

export default function EditarUsuarios() {
  const dispatch = useDispatch();
  const alumnos = useSelector((state) => state.students);
  const profesores = useSelector((state) => state.profesors);

  //* -----------------> Se cargan todos los profesores y alumnos por default <-----------------
  const [renderUsers, setRenderUsers] = useState({
    alumnos: alumnos,
    profesores: profesores,
  });

  //* ------------------> Cada filtro se establece con su nombre por default <------------------
  const [filtros, setFiltros] = useState({
    Rol: "Filtrar Rol",
    Año: "Filtrar Año",
  });

  const filterHandler = (ev) => {
    setFiltros({
      ...filtros,
      [ev.target.name]: ev.target.value,
    });
  };

  const refreshHandler = () => {
    setRenderUsers({
      alumnos: alumnos,
      profesores: profesores,
    });
    window.location.replace("");
  };

  //Al cargarse por primera vez, trae todos los datos de la DB
  useEffect(() => {
    dispatch(getStudents());
    dispatch(getProfesors());
  }, []);

  //Actualiza los datos mostrados cuando se aplican filtros
  useEffect(() => {
    switch (filtros.Rol) {
      case "profesor":
        setRenderUsers({
          ...renderUsers,
          alumnos: null,
          profesores: profesores,
        });
        break;
      case "student":
        setRenderUsers({ ...renderUsers, alumnos: alumnos, profesores: null });
        break;
      default: //Mostrar Todos
        setRenderUsers({
          ...renderUsers,
          alumnos: alumnos,
          profesores: profesores,
        });
    }
  }, [filtros.Rol]);

  return (
    <div>
      <Navbar />
      <div className={style.container}>
        <h1 className="formTitle">EDITAR USUARIO</h1>
        <div className={style.fondo}>
          <select
            className={style.select}
            type="text"
            name="Rol"
            onChange={(ev) => filterHandler(ev)}
            value={filtros.Rol}
          >
            <option value="Filtrar Rol" disabled={true}>
              Filtrar Rol
            </option>
            {["Mostrar todos", "profesor", "student"].map((i) => (
              <option value={i} key={i}>
                {i}
              </option>
            ))}
          </select>

          <select
            className={style.select}
            type="text"
            name="Año"
            onChange={(ev) => filterHandler(ev)}
            value={filtros.Año}
          >
            <option value="Filtrar Año" disabled={true}>
              Filtrar Año
            </option>
            {["Mostrar Todos", "1ro", "2do", "3ro", "4to", "5to", "6to"].map(
              (i) => (
                <option value={i} key={i}>
                  {i}
                </option>
              )
            )}
          </select>
          <button className={style.button} onClick={() => refreshHandler()}>
            Recargar datos
          </button>
          <Select
            alumnos={renderUsers.alumnos}
            profesores={renderUsers.profesores}
            año={filtros.Año}
          />
        </div>
      </div>
    </div>
  );
}
