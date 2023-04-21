import "./form.css";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { validate } from "./validations";
import { postAlumno } from "../../Redux/actions";
import axios from "axios";
import Navbar from "../NavBar/navBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
const URL = "https://restcountries.com/v3.1/all";

function Form() {
  const dispatch = useDispatch();
  //Estados
  const [studentData, setStudentData] = useState({
    name: "",
    apellido: "",
    email: "",
    datebirth: "",
    nacionalidad: "",
    anio: "año",
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
  const [mostrarPass, setmostrarPass] = useState(true);

  const inputHandler = (ev) => {
    setStudentData({
      ...studentData,
      [ev.target.name]: ev.target.value,
    });
    setError(
      validate({
        ...studentData,
        [ev.target.name]: ev.target.value,
      })
    );
  };

  const submitHandler = (ev) => {
    ev.preventDefault();
    dispatch(postAlumno(studentData));
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
          <h1 className="formTitle">CREAR ALUMNO</h1>

          <form onSubmit={(ev) => submitHandler(ev)} autoComplete="off">
            <input
              className="text"
              type="text"
              placeholder="nombre"
              name="name"
              onChange={(ev) => inputHandler(ev)}
              value={studentData.name}
            />
            <p className="errorText">{error.name}</p>

            <input
              className="text"
              type="text"
              name="apellido"
              placeholder="apellido"
              onChange={(ev) => inputHandler(ev)}
              value={studentData.apellido}
            />
            <p className="errorText">{error.apellido}</p>

            <input
              className="text"
              type="text"
              name="email"
              placeholder="email"
              onChange={(ev) => inputHandler(ev)}
              value={studentData.email}
            />
            <p className="errorText">{error.email}</p>

            <input
              className="text"
              type="date"
              name="datebirth"
              placeholder="datebirth"
              onChange={(ev) => inputHandler(ev)}
              value={studentData.datebirth}
            />
            <p className="errorText">{error.datebirth}</p>

            <select
              className="text"
              type="text"
              name="nacionalidad"
              placeholder="nacionalidad"
              onChange={(ev) => inputHandler(ev)}
              value={studentData.nacionalidad}
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

            <select
              className="text"
              type="number"
              name="anio"
              onChange={(ev) => inputHandler(ev)}
              value={studentData.anio}
            >
              <option disabled={true}>año</option>
              {["1ro", "2do", "3ro", "4to", "5to", "6to"].map((i) => (
                <option value={i} key={i}>
                  {i}
                </option>
              ))}
            </select>
            <p className="errorText">{error.anio}</p>

            <input
              className="text"
              type="text"
              name="username"
              placeholder="username"
              onChange={(ev) => inputHandler(ev)}
              value={studentData.username}
            />
            <p className="errorText">{error.datebirth}</p>
            <div>
              <input
                className="pass"
                type={mostrarPass ? "password" : "text"}
                placeholder="password"
                name="password"
                id="password"
                onChange={(ev) => inputHandler(ev)}
                value={studentData.password}
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

export default Form;
