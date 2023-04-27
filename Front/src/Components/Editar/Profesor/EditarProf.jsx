import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../../NavBar/navBar";
import { getProfesor, getMateriasByAnio, editAlumno } from "../../../Redux/actions";
import { validate } from "./validations";
import style from "./EditarProf.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";

export default function EditarProfesor() {
  const dispatch = useDispatch();
  const params = useParams();
  const navigate = useNavigate();
  const { username } = params;

  //Datos del usuario solicitado, que podrán cambiarse
  const [usuario, setUsuario] = useState({});

  //Datos originales del usuario solicitado, que quedan invariables
  const [valoresOriginales, setvaloresOriginales] = useState({});

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
    anio1: true,
    anio2: true,
    anio3: true,
    materia1: true,
    materia2: true,
    materia3: true,
  });

  const [paises, setPaises] = useState([]);

  //* ------------> Estados locales para cargar las materias de los profesores <------------

  const [materias1, setMaterias1] = useState([]);
  const [materias2, setMaterias2] = useState([]);
  const [materias3, setMaterias3] = useState([]);

  //* -------------------> Trae las materias dependiendo del año elegido <-------------------

  async function traerMaterias(renglon, anio) {
    const response = await axios.get(`http://localhost:3001/Materias/filtermateria?anio=${anio}`);
    switch (renglon) {
      case "anio1":
        setMaterias1(response.data.map((elem) => elem.namemateria));
        break;
      case "anio2":
        setMaterias2(response.data.map((elem) => elem.namemateria));
        break;
      default:
        setMaterias3(response.data.map((elem) => elem.namemateria));
    }
  }

  const response = useSelector((state) => state.editResponse); //!BREAKPOINT

  const inputHandler = (ev) => {
    setUsuario({
      ...usuario,
      [ev.target.name]: ev.target.value,
    });
    setError(
      validate({
        ...usuario,
        [ev.target.name]: ev.target.value,
      })
    );

    //* -------------------> Si se cambia un año, en materia se reestablece "materia" por default <-------------------

    if (ev.target.name === "anio1" || ev.target.name === "anio2" || ev.target.name === "anio3") {
      switch (ev.target.name) {
        case "anio1":
          setUsuario({
            ...usuario,
            [ev.target.name]: ev.target.value,
            materia1: "materia",
          });
          break;
        case "anio2":
          setUsuario({
            ...usuario,
            [ev.target.name]: ev.target.value,
            materia2: "materia",
          });
          break;
        default:
          setUsuario({
            ...usuario,
            [ev.target.name]: ev.target.value,
            materia3: "materia",
          });
      }
      traerMaterias(ev.target.name, ev.target.value);
    }
  };

  // Habilita los inputs cuando se presiona en el ícono de editar. Para los pares Año -Materia,
  // los deshabilita en simultáneo
  function handleDisabled(inputName) {
    switch (inputName) {
      case "materia1":
        setDisabled({ ...disabled, materia1: false, anio1: false });
        setUsuario({ ...usuario, anio1: "año", materia1: "materia" });
        break;
      case "materia2":
        setDisabled({ ...disabled, materia2: false, anio2: false });
        break;
      case "materia3":
        setDisabled({ ...disabled, materia3: false, anio3: false });
        break;
      default:
        setDisabled({ ...disabled, [inputName]: false });
    }
  }

  //Preparacion para Submit
  //Funcion que verifica que propiedades cambiaron
  const paraEditar = (valoresOriginales, usuario) => {
    const propiedadesCambiadas = {};

    for (const prop in usuario) {
      if (valoresOriginales[prop] !== usuario[prop]) {
        propiedadesCambiadas[prop] = usuario[prop];
      }
    }
    return propiedadesCambiadas;
  };

  const submitHandler = (ev) => {
    ev.preventDefault();
    console.log("submit");
    /* dispatch(editAlumno(valoresOriginales.username, paraEditar(valoresOriginales, usuario)));
    if (response) {
      window.alert(response);
    }
    navigate(-1); */
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
    async function fetchProfesor() {
      const profesor = await dispatch(getProfesor(username));

      //Datos que podrán cambiar
      setUsuario({
        name: profesor.name,
        apellido: profesor.apellido,
        datebirth: profesor.datebirth.slice(0, 10),
        nacionalidad: profesor.nacionalidad,
        anio1: profesor.Materias[0].anio,
        materia1: profesor.Materias[0].namemateria,
        anio2: profesor.Materias[1] ? profesor.Materias[1].anio : "año",
        materia2: profesor.Materias[1] ? profesor.Materias[1].namemateria : "materia",
        anio3: profesor.Materias[2] ? profesor.Materias[2].anio : "año",
        materia3: profesor.Materias[2] ? profesor.Materias[2].namemateria : "materia",
        rol: profesor.rol,
        email: profesor.email,
        username: profesor.username,
        password: profesor.password,
      });

      //Datos invariables
      setvaloresOriginales({
        name: profesor.name,
        apellido: profesor.apellido,
        datebirth: profesor.datebirth.slice(0, 10),
        nacionalidad: profesor.nacionalidad,
        anio1: profesor.Materias[0].anio,
        materia1: profesor.Materias[0].namemateria,
        anio2: profesor.Materias[1] ? profesor.Materias[1].anio : "(materia)",
        materia2: profesor.Materias[1] ? profesor.Materias[1].namemateria : "(materia)",
        anio3: profesor.Materias[2] ? profesor.Materias[2].anio : "(materia)",
        materia3: profesor.Materias[2] ? profesor.Materias[2].namemateria : "(materia)",
        rol: profesor.rol,
        email: profesor.email,
        username: profesor.username,
        password: profesor.password,
      });
    }
    fetchProfesor();
  }, []);

  return (
    <div className={style.container}>
      <Navbar />
      <h1 className="formTitle">EDITAR PROFESOR</h1>
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

        {/* RENGLON 1 ************************************************************* */}
        <section>
          <h4 className={style.campo}>Año 1</h4>
          <select
            className={style.text}
            type="text"
            name="anio1"
            disabled={disabled.anio1}
            onChange={(ev) => inputHandler(ev)}
            value={usuario.anio1}
          >
            {["año", "1ro", "2do", "3ro", "4to", "5to", "6to"].map((i) => (
              <option value={i} key={i}>
                {i}
              </option>
            ))}
          </select>
        </section>

        <section>
          <h4 className={style.campo}>Materia 1</h4>
          <select
            className={style.text}
            type="text"
            name="materia1"
            disabled={disabled.materia1}
            onChange={(ev) => inputHandler(ev)}
            value={usuario.materia1}
          >
            <option disabled={true}>materia</option>

            {materias1.length ? (
              materias1.map((i) => (
                <option value={i} key={i}>
                  {i}
                </option>
              ))
            ) : (
              <option>{usuario.materia1}</option>
            )}
          </select>
          <button type="button" onClick={() => handleDisabled("materia1")}>
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
          <h4 className={style.campo}>Username</h4>
          <input
            className={style.text}
            type="text"
            name="username"
            autoComplete="off"
            disabled={true}
            value={usuario.username}
          />
          <p className="errorText">{error.username}</p>
        </section>

        <section>
          <h4 className={style.campo}>Email</h4>
          <input
            className={style.text}
            type="text"
            name="email"
            autoComplete="off"
            disabled={true}
            value={usuario.email}
          />
          <p className="errorText">{error.email}</p>
        </section>

        <section>
          <h4 className={style.campo}>Password</h4>
          <input
            className={style.text}
            type="text"
            name="password"
            autoComplete="off"
            disabled={true}
            value={usuario.password}
          />
          <p className="errorText">{error.password}</p>
        </section>

        <section>
          <h4 className={style.campo}>Rol</h4>
          <select className={style.text} type="text" name="rol" disabled={true} value={usuario.rol}>
            {["admin", "profesor", "student"].map((i) => (
              <option value={i} key={i}>
                {i}
              </option>
            ))}
          </select>
        </section>

        <button
          type="button"
          onClick={() => {
            navigate(-1);
          }}
        >
          Volver
        </button>
        <button type="submit" disabled={hasErrors()}>
          Confirmar Cambios
        </button>
      </form>
    </div>
  );
}
