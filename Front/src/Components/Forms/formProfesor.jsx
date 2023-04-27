import "./form.css";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { validate } from "./validations";
import { postProfesor } from "../../Redux/actions";
import axios from "axios";
import Navbar from "../NavBar/navBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

function FormProfesor() {
  const dispatch = useDispatch();

  //* ---------------------------> Estados Iniciales <---------------------------

  const [profesorData, setProfesorData] = useState({
    name: "",
    apellido: "",
    email: "",
    datebirth: "",
    nacionalidad: "",
    username: "",
    password: "",
    anio1: "año",
    materia1: "materia",
    anio2: "año",
    materia2: "materia",
    materia3: "materia",
    anio3: "año",
  });
  const [error, setError] = useState({
    name: "",
    apellido: "",
    email: "",
    datebirth: "",
    nacionalidad: "",
    username: "",
    password: "",
    anio1: "año",
    materia1: "materia",
    anio2: "año",
    materia2: "materia",
    materia3: "materia",
    anio3: "año",
  });
  const [mostrarPass, setmostrarPass] = useState(true);

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

    //* -------------------> Si se cambia un año, en materia se reestablece "materia" por default <-------------------

    if (ev.target.name === "anio1" || ev.target.name === "anio2" || ev.target.name === "anio3") {
      switch (ev.target.name) {
        case "anio1":
          setProfesorData({
            ...profesorData,
            [ev.target.name]: ev.target.value,
            materia1: "materia",
          });
          break;
        case "anio2":
          setProfesorData({
            ...profesorData,
            [ev.target.name]: ev.target.value,
            materia2: "materia",
          });
          break;
        default:
          setProfesorData({
            ...profesorData,
            [ev.target.name]: ev.target.value,
            materia3: "materia",
          });
      }
      traerMaterias(ev.target.name, ev.target.value);
    }
  };

  const submitHandler = (ev) => {
    ev.preventDefault();
    //console.log(profesorData);
    dispatch(postProfesor(profesorData));
    alert("Profesor creado");
    setProfesorData({
      name: "",
      apellido: "",
      email: "",
      datebirth: "",
      nacionalidad: "",
      username: "",
      password: "",
      anio1: "año",
      materia1: "materia",
      anio2: "año",
      materia2: "materia",
      materia3: "materia",
      anio3: "año",
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
      <div className="MainProfesores">
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
            <section className="renglones">
              <select
                className={profesorData.materia1 !== "materia" ? "selected" : "text"}
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
              <select
                className={
                  profesorData.anio1 !== "año" && profesorData.materia1 === "materia"
                    ? "errorMateria"
                    : profesorData.anio1 !== "año" && profesorData.materia1 !== "materia"
                    ? "selected"
                    : "text"
                }
                type="number"
                name="materia1"
                onChange={(ev) => inputHandler(ev)}
                value={profesorData.materia1}
              >
                <option disabled={true}>materia</option>
                {materias1.map((i) => (
                  <option
                    value={i}
                    key={i}
                    disabled={
                      (profesorData.anio2 === profesorData.anio1 && profesorData.materia2 === i) ||
                      (profesorData.anio3 === profesorData.anio1 && profesorData.materia3 === i)
                    }
                  >
                    {i}
                  </option>
                ))}
              </select>
            </section>

            {/* RENGLON 2 ************************************************************* */}
            <section className="renglones">
              <select
                className={profesorData.materia2 !== "materia" ? "selected" : "text"}
                type="number"
                name="anio2"
                onChange={(ev) => inputHandler(ev)}
                value={profesorData.anio2}
                disabled={profesorData.materia1 === "materia"}
              >
                <option disabled={true}>año</option>
                {["1ro", "2do", "3ro", "4to", "5to", "6to"].map((i) => (
                  <option value={i} key={i}>
                    {i}
                  </option>
                ))}
              </select>
              <select
                className={
                  profesorData.anio2 !== "año" && profesorData.materia2 === "materia"
                    ? "errorMateria"
                    : profesorData.anio2 !== "año" && profesorData.materia2 !== "materia"
                    ? "selected"
                    : "text"
                }
                type="number"
                name="materia2"
                onChange={(ev) => inputHandler(ev)}
                value={profesorData.materia2}
                disabled={profesorData.materia1 === "materia"}
              >
                <option disabled={true}>materia</option>
                {materias2.map((i) => (
                  <option
                    value={i}
                    key={i}
                    disabled={
                      (profesorData.anio1 === profesorData.anio2 && profesorData.materia1 === i) ||
                      (profesorData.anio3 === profesorData.anio2 && profesorData.materia3 === i)
                    }
                  >
                    {i}
                  </option>
                ))}
              </select>
              {/* icono eliminar */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-x-circle-fill"
                viewBox="0 0 16 16"
                onClick={() => {
                  setProfesorData({
                    ...profesorData,
                    anio2: "año",
                    materia2: "materia",
                    anio3: "año",
                    materia3: "materia",
                  });
                  setMaterias2([]);
                }}
              >
                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z" />
              </svg>
            </section>

            {/* RENGLON 3 ************************************************************* */}
            <section className="renglones">
              <select
                className={profesorData.materia3 !== "materia" ? "selected" : "text"}
                type="number"
                name="anio3"
                onChange={(ev) => inputHandler(ev)}
                value={profesorData.anio3}
                disabled={profesorData.materia2 === "materia"}
              >
                <option disabled={true}>año</option>
                {["1ro", "2do", "3ro", "4to", "5to", "6to"].map((i) => (
                  <option value={i} key={i}>
                    {i}
                  </option>
                ))}
              </select>
              <select
                className={
                  profesorData.anio3 !== "año" && profesorData.materia3 === "materia"
                    ? "errorMateria"
                    : profesorData.anio3 !== "año" && profesorData.materia3 !== "materia"
                    ? "selected"
                    : "text"
                }
                type="number"
                name="materia3"
                onChange={(ev) => inputHandler(ev)}
                value={profesorData.materia3}
                disabled={profesorData.materia2 === "materia"}
              >
                <option disabled={true}>materia</option>
                {materias3.map((i) => (
                  <option
                    value={i}
                    key={i}
                    disabled={
                      (profesorData.anio1 === profesorData.anio3 && profesorData.materia1 === i) ||
                      (profesorData.anio2 === profesorData.anio3 && profesorData.materia2 === i)
                    }
                  >
                    {i}
                  </option>
                ))}
              </select>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-x-circle-fill"
                viewBox="0 0 16 16"
                onClick={() => {
                  setProfesorData({
                    ...profesorData,
                    anio3: "año",
                    materia3: "materia",
                  });
                  setMaterias3([]);
                }}
              >
                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z" />
              </svg>
            </section>

            <p className="errorText">{error.anio3 !== "año" && error.anio3}</p>
            {/* ************************************************************************** */}
            <input
              className="text"
              type="text"
              name="username"
              placeholder="username"
              onChange={(ev) => inputHandler(ev)}
              value={profesorData.username}
            />
            <p className="errorText">{error.datebirth}</p>
            <div>
              <input
                className="pass"
                type={mostrarPass ? "password" : "text"}
                name="password"
                placeholder="password"
                id="password"
                onChange={(ev) => inputHandler(ev)}
                value={profesorData.password}
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
