import "./form.css";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { validate } from "./validations";
import { postAlumno } from "../../Redux/actions";
import Navbar from "../NavBar/navBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";


function Form() {
  const dispatch = useDispatch();
  //Estados
  const [studentData, setStudentData] = useState({
    name: "",
    apellido: "",
    email: "",
    datebirth: "",
    nacionalidad: "",
    username: "",
    password: "",
  });
  const [error, setError] = useState({
    name: "",
    apellido: "",
    email: "",
    datebirth: "",
    nacionalidad: "",
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
      username: "",
      password: "",
    });
    
  };

  const hasErrors = () => {
    return (Object.values(error).some((error) => error !== ""))   
  };

  const handleTogglePassword = () => {
    setmostrarPass(!mostrarPass);
  };

  return (
    <>
      <Navbar></Navbar>
      <div className="Main">
        <div className="formBox">
          <h1 className="formTitle">Form</h1>

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

            <input
              className="text"
              type="text"
              name="nacionalidad"
              placeholder="nacionalidad"
              onChange={(ev) => inputHandler(ev)}
              value={studentData.nacionalidad}
            />
            <p className="errorText">{error.nacionalidad}</p>

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
