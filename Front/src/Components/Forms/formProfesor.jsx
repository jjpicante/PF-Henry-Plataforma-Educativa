import "./form.css";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { validate } from "./validations";
import { postProfesor } from "../../Redux/actions";
import axios from "axios";
import Navbar from "../NavBar/navBar";
//import SelectProfesor from "./selectProfesor";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
const URL = "https://restcountries.com/v3.1/all";

function FormProfesor() {
  const dispatch = useDispatch();

  //* ---------------------------> Estados Iniciales <---------------------------

  const [profesorData, setProfesorData] = useState({
    name: "",
    apellido: "",
    email: "",
    datebirth: "",
    nacionalidad: "",
    anio1: "año",
    materia1: "materia",
    anio2: "año",
    materia2: "materia",
    username: "",
    password: "",
  });
  const [error, setError] = useState({
    name: "",
    apellido: "",
    email: "",
    datebirth: "",
    nacionalidad: "",
    anio: "",
    username: "",
    password: "",
  });
  const [mostrarPass, setmostrarPass] = useState(true); //!BREAKPOINT

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
    //console.log(materias);
  }

  const inputHandler = (ev) => {
    setProfesorData({
      ...profesorData,
      [ev.target.name]: ev.target.value,
    });
    setError(
      validate({
        ...profesorData,
        [ev.target.name]: ev.target.value,
      })
    );
    if (ev.target.name === "anio1" || ev.target.name === "anio2" || ev.target.name === "anio3") {
      traerMaterias(ev.target.name, ev.target.value);
    }
  };

  const submitHandler = (ev) => {
    ev.preventDefault();
    dispatch(postProfesor(profesorData));
    alert("Profesor creado");
    setProfesorData({
      name: "",
      apellido: "",
      email: "",
      datebirth: "",
      nacionalidad: "",
      anio: "año",
      username: "",
      password: "",
    });
  };

  const hasErrors = () => {
    return Object.values(error).some((error) => error !== "");
  };

  const handleTogglePassword = () => {
    setmostrarPass(!mostrarPass);
  };

  const [paises, setPaises] = useState([]);

  useEffect(() => {
    async function getPaises() {
      const response = await axios.get("https://restcountries.com/v3.1/all");
      const paises = response.data.map((el) => el.name.common).sort();
      setPaises(paises);
    }

    getPaises();
  }, []);

  return (
    <>
      <Navbar></Navbar>
      <div className="Main">
        <div className="formBox">
          <h1 className="formTitle">CREAR PROFESOR</h1>

          <form onSubmit={(ev) => submitHandler(ev)} autoComplete="off">
            <input
              className="text"
              type="text"
              placeholder="nombre"
              name="name"
              onChange={(ev) => inputHandler(ev)}
              value={profesorData.name}
            />
            <p className="errorText">{error.name}</p>
            <input
              className="text"
              type="text"
              name="apellido"
              placeholder="apellido"
              onChange={(ev) => inputHandler(ev)}
              value={profesorData.apellido}
            />
            <p className="errorText">{error.apellido}</p>
            <input
              className="text"
              type="text"
              name="email"
              placeholder="email"
              onChange={(ev) => inputHandler(ev)}
              value={profesorData.email}
            />
            <p className="errorText">{error.email}</p>
            <input
              className="text"
              type="date"
              name="datebirth"
              placeholder="datebirth"
              onChange={(ev) => inputHandler(ev)}
              value={profesorData.datebirth}
            />
            <p className="errorText">{error.datebirth}</p>
            <select
              className="text"
              type="text"
              name="nacionalidad"
              placeholder="nacionalidad"
              onChange={(ev) => inputHandler(ev)}
              value={profesorData.nacionalidad}
            >
              {paises?.map((el, i) => {
                return (
                  <option value={el} key={i}>
                    {el}
                  </option>
                );
              })}
            </select>
            <p className="errorText">{error.nacionalidad}</p>
            {/* RENGLON 1 ************************************************************* */}
            <select
              className="text"
              type="number"
              name="anio1"
              onChange={(ev) => inputHandler(ev)}
              value={profesorData.anio1}
            >
              <option disabled={true}>año</option>
              {["1ro", "2do", "3ro", "4to", "5to", "6to"].map((i) => (
                <option value={i} key={i}>
                  {i}
                </option>
              ))}
            </select>
            {/* <p className="errorText">{error.anio}</p> */}
            <select
              className="text"
              type="number"
              name="materia1"
              onChange={(ev) => inputHandler(ev)}
              value={profesorData.materia1}
            >
              <option disabled={true}>materia</option>
              {materias1.map((i) => (
                <option value={i} key={i}>
                  {i}
                </option>
              ))}
            </select>
            {/* <p className="errorText">{error.anio}</p> */}
            {/* RENGLON 2 ************************************************************* */}
            <select
              className="text"
              type="number"
              name="anio2"
              onChange={(ev) => inputHandler(ev)}
              value={profesorData.anio2}
            >
              <option disabled={true}>año</option>
              {["1ro", "2do", "3ro", "4to", "5to", "6to"].map((i) => (
                <option value={i} key={i}>
                  {i}
                </option>
              ))}
            </select>
            {/* <p className="errorText">{error.anio}</p> */}
            <select
              className="text"
              type="number"
              name="materia2"
              onChange={(ev) => inputHandler(ev)}
              value={profesorData.materia2}
            >
              <option disabled={true}>materia</option>
              {materias2.map((i) => (
                <option value={i} key={i}>
                  {i}
                </option>
              ))}
            </select>
            {/* <p className="errorText">{error.anio}</p> */}
            {/* ************************************************************************** */}
            <input
              className="text"
              type="text"
              name="username"
              placeholder="username"
              onChange={(ev) => inputHandler(ev)}
              value={profesorData.username}
            />
            <p className="errorText">{error.datebirth}</p> //!SEGUIR DESDE ACA
            <div>
              <input
                className="pass"
                type={mostrarPass ? "password" : "text"}
                placeholder="password"
                name="password"
                id="password"
              />
              <button type="button" onClick={() => handleTogglePassword()}>
                <FontAwesomeIcon icon={mostrarPass ? faEyeSlash : faEye} />
              </button>
            </div>
            <input type="submit" value="Crear alumno" disabled={hasErrors()} />
          </form>
        </div>
      </div>
    </>
  );
}

export default FormProfesor;
