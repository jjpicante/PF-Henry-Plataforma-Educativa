import React from "react";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import Navbar from "../../NavBar/navBar";
import { getStudents } from "../../../Redux/actions";
import { validations } from "../validations";
import style from "./EditarLanding.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";

export default function EditarUsuarios() {
  //   const userData = useSelector((state) => state.userData);
  const dispatch = useDispatch();
  const alumnos = useSelector((state) => state.students);

  //   const [usuario, setUsuario] = useState({
  //     name: userData.name,
  //     apellido: userData.apellido,
  //     datebirth: userData.datebirth.slice(0, 10),
  //     nacionalidad: userData.nacionalidad,
  //     anio: userData.anio,
  //     rol: userData.rol,
  //   });

  //   const [error, setError] = useState({
  //     name: "",
  //     apellido: "",
  //   });

  //   const [disabled, setDisabled] = useState({
  //     name: true,
  //     apellido: true,
  //     datebirth: true,
  //     nacionalidad: true,
  //     anio: true,
  //     rol: true,
  //   });

  //   const [paises, setPaises] = useState([]);

  //   const inputHandler = (ev) => {
  //     setUsuario({
  //       ...usuario,
  //       [ev.target.name]: ev.target.value,
  //     });
  //     setError(
  //       validations({
  //         ...usuario,
  //         [ev.target.name]: ev.target.value,
  //       })
  //     );
  //   };

  //Habilita los inputs cuando se presiona en el ícono de editar
  /* function handleDisabled(inputName) {
    setDisabled({ ...disabled, [inputName]: false });
  }
 */
  //   const submitHandler = (ev) => {
  //     ev.preventDefault();
  //     console.log("submit");
  /* dispatch(postAlumno(studentData));
    alert("Alumno creado");
    setStudentData({
      name: "",
      apellido: "",
      email: "",
      datebirth: "",
      nacionalidad: "",
      anio: "año",
      username: "",
      password: "",
    }); */
  //};

  //Bloquea el boton submit cuando no se introdujeron cambios, o cuando hay errores
  /* function hasErrors() {
    return (
      Object.values(error).some((error) => error !== "") ||
      Object.values(disabled).every((valor) => valor === true)
    );
  } */

  useEffect(() => {
    dispatch(getStudents());
  }, [dispatch]);

  return (
    <div className={style.container}>
      <Navbar />
      <h1 className="formTitle">EDITAR USUARIO</h1>
      <div className={style.fondo}>
        <section>
          {/* <select
            className={style.select}
            type="text"
            name="rol"
            //disabled={disabled.rol}
            //onChange={(ev) => inputHandler(ev)}
            //value={usuario.rol}
          >
            {["admin", "profesor", "student"].map((i) => (
              <option value={i} key={i}>
                {i}
              </option>
            ))}
          </select> */}
        </section>
        {alumnos?.map((el, i) => {
          return (
            <p key={i} className={style.alumnos}>
              {el[0].apellido}, {el[0].name} - Rol: {el[0].rol}
            </p>
          );
        })}
      </div>
    </div>
  );
}
