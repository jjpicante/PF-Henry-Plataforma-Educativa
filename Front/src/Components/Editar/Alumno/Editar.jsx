import React from "react";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../../NavBar/navBar";
import { getStudent } from "../../../Redux/actions";
import { validations } from "./validations";
import style from "./Editar.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";

//Todo: hacer el submit, limpiar los estados iniciales, limpiar errores

export default function EditarUsuarios() {
  const dispatch = useDispatch();
  const params = useParams();
  const navigate = useNavigate();
  const { username } = params;

  //Datos del usuario solicitado
  const [usuario, setUsuario] = useState({});

  const [error, setError] = useState({
    name: "",
    apellido: "",
  });

  //Por default los inputs estan deshabilitados
  const [disabled, setDisabled] = useState({
    name: true,
    apellido: true,
    datebirth: true,
    nacionalidad: true,
    anio: true,
    rol: true,
  });

  const [paises, setPaises] = useState([]);

  const inputHandler = (ev) => {
    setUsuario({
      ...usuario,
      [ev.target.name]: ev.target.value,
    });
    setError(
      validations({
        ...usuario,
        [ev.target.name]: ev.target.value,
      })
    );
  };

  //Habilita los inputs cuando se presiona en el ícono de editar
  function handleDisabled(inputName) {
    setDisabled({ ...disabled, [inputName]: false });
  }

  const submitHandler = (ev) => {
    ev.preventDefault();
    console.log("submit");
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
  };

  //Bloquea el boton submit cuando no se introdujeron cambios, o cuando hay errores
  function hasErrors() {
    return (
      Object.values(error).some((error) => error !== "") ||
      Object.values(disabled).every((valor) => valor === true)
    );
  }

  useEffect(() => {
    async function getPaises() {
      const response = await axios.get("https://restcountries.com/v3.1/all");
      const paises = response.data.map((el) => el.name.common).sort();
      setPaises(paises);
    }
    getPaises();
  }, []);

  useEffect(() => {
    async function fetchStudent() {
      const alumno = await dispatch(getStudent(username));
      setUsuario({
        name: alumno.name,
        apellido: alumno.apellido,
        datebirth: alumno.datebirth.slice(0, 10),
        nacionalidad: alumno.nacionalidad,
        anio: alumno.anio,
        rol: alumno.rol,
      });
    }
    fetchStudent();
  }, []);

  return (
    <div className={style.container}>
      <Navbar />
      <h1 className="formTitle">EDITAR USUARIO</h1>
      <form className={style.formulario} onSubmit={(ev) => submitHandler(ev)}>
        <section>
          <h4 className={style.campo}>Nombre</h4>
          <input
            className={style.text}
            type="text"
            name="name"
            autoComplete="off"
            disabled={disabled.name}
            onChange={(ev) => inputHandler(ev)}
            value={usuario.name}
          />
          <button type="button" onClick={() => handleDisabled("name")}>
            <FontAwesomeIcon className={style.editButton} icon={faPenToSquare} />
          </button>
          <p className="errorText">{error.name}</p>
        </section>

        <section>
          <h4 className={style.campo}>Apellido</h4>
          <input
            className={style.text}
            type="text"
            name="apellido"
            autoComplete="off"
            disabled={disabled.apellido}
            onChange={(ev) => inputHandler(ev)}
            value={usuario.apellido}
          />
          <button type="button" onClick={() => handleDisabled("apellido")}>
            <FontAwesomeIcon className={style.editButton} icon={faPenToSquare} />
          </button>
          <p className="errorText">{error.apellido}</p>
        </section>

        <section>
          <h4 className={style.campo}>Año</h4>
          <select
            className={style.text}
            type="text"
            name="anio"
            disabled={disabled.anio}
            onChange={(ev) => inputHandler(ev)}
            value={usuario.anio}
          >
            {["1ro", "2do", "3ro", "4to", "5to", "6to"].map((i) => (
              <option value={i} key={i}>
                {i}
              </option>
            ))}
          </select>
          <button type="button" onClick={() => handleDisabled("anio")}>
            <FontAwesomeIcon className={style.editButton} icon={faPenToSquare} />
          </button>
        </section>

        <section>
          <h4 className={style.campo}>Fecha de nacimiento</h4>
          <input
            className={style.text}
            type="date"
            name="datebirth"
            disabled={disabled.datebirth}
            value={usuario.datebirth}
            onChange={(ev) => inputHandler(ev)}
          />
          <button type="button" onClick={() => handleDisabled("datebirth")}>
            <FontAwesomeIcon className={style.editButton} icon={faPenToSquare} />
          </button>
        </section>

        <section>
          <h4 className={style.campo}>Nacionalidad</h4>
          <select
            className={style.text}
            type="text"
            name="nacionalidad"
            disabled={disabled.nacionalidad}
            onChange={(ev) => inputHandler(ev)}
            value={
              usuario.nacionalidad &&
              usuario.nacionalidad[0].toUpperCase() + usuario.nacionalidad.slice(1)
            }
          >
            {paises?.map((el, i) => {
              return (
                <option value={el} key={i}>
                  {el}
                </option>
              );
            })}
          </select>
          <button type="button" onClick={() => handleDisabled("nacionalidad")}>
            <FontAwesomeIcon className={style.editButton} icon={faPenToSquare} />
          </button>
        </section>

        <section>
          <h4 className={style.campo}>Rol</h4>
          <select
            className={style.text}
            type="text"
            name="rol"
            disabled={disabled.rol}
            onChange={(ev) => inputHandler(ev)}
            value={usuario.rol}
          >
            {["admin", "profesor", "student"].map((i) => (
              <option value={i} key={i}>
                {i}
              </option>
            ))}
          </select>
          <button type="button" onClick={() => handleDisabled("rol")}>
            <FontAwesomeIcon className={style.editButton} icon={faPenToSquare} />
          </button>
        </section>

        <button
          /* className={style.submitButton} */ type="button"
          onClick={() => {
            navigate(-1);
          }}
        >
          Volver
        </button>
        <button /* className={style.submitButton} */ type="submit" disabled={hasErrors()}>
          Confirmar Cambios
        </button>
      </form>
    </div>
  );
}
