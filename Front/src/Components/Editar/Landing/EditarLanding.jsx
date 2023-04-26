import React from "react";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import Navbar from "../../NavBar/navBar";
import { getStudents, getProfesors } from "../../../Redux/actions";
import Select from "./Select.jsx";
import style from "./EditarLanding.module.css";

export default function EditarUsuarios() {
  const dispatch = useDispatch();
  const alumnos = useSelector((state) => state.students);
  const profesores = useSelector((state) => state.profesors);
  //const [renderArray, setRenderArray] = useState(select(alumnos, profesores));
  const [renderUsers, setRenderUsers] = useState({
    alumnos: alumnos,
    profesores: profesores,
  });

  const [filtros, setFiltros] = useState({
    Rol: "Filtrar Rol",
  });

  const filterHandler = (ev) => {
    setFiltros({
      ...filtros,
      [ev.target.name]: ev.target.value,
    });
  };

  useEffect(() => {
    dispatch(getStudents());
    dispatch(getProfesors());
  }, []);

  useEffect(() => {
    switch (filtros.Rol) {
      case "profesor":
        setRenderUsers({ ...renderUsers, alumnos: null, profesores: profesores });
        break;
      case "student":
        setRenderUsers({ ...renderUsers, alumnos: alumnos, profesores: null });
        break;
      default: //Mostrar Todos
        setRenderUsers({ ...renderUsers, alumnos: alumnos, profesores: profesores });
    }
  }, [filtros.Rol]);

  return (
    <div className={style.container}>
      <Navbar />
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
        <Select alumnos={renderUsers.alumnos} profesores={renderUsers.profesores} />
      </div>
    </div>
  );
}
