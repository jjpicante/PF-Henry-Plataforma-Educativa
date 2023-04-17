import "./form.css";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { validate } from "./validations";
import { postAlumno } from "../../Redux/actions";
import Navbar from "../NavBar/navBar";

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
  const [errorMessdatebirth, setErrorMessdatebirth] = useState({
    name: "",
    apellido: "",
    email: "",
    datebirth: "",
    nacionalidad: "",
    username: "",
    password: "",
  });
  console.log(studentData);
  console.log(errorMessdatebirth);

  const inputHandler = (ev) => {
    setStudentData({
      ...studentData,
      [ev.target.name]: ev.target.value,
    });
    setErrorMessdatebirth(
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
    /* if (!studentData.nacionalidad)
      setErrorMessdatebirth({
        ...errorMessdatebirth,
        nacionalidad: "You have to choose a nacionalidad",
      });
    if (validateSubmit(studentData, errorMessdatebirth)) {
      alert("The form has been filled successfully");
    } else {
      for (const property in studentData) {
        if (!studentData[property])
          setErrorMessdatebirth({
            ...errorMessdatebirth,
            [property]: "This field is required!",
          });
      }
      alert(
        "Theres been a mistake, take a look a the form. **All fields are required!**"
      );
    }*/
  };

  const nacionalidadHandler = (ev) => {
    setStudentData({ ...studentData, nacionalidad: ev.target.value });
    setErrorMessdatebirth({ ...errorMessdatebirth, nacionalidad: "" });
  };

  const hasErrors = () => {
    if (Object.values(errorMessdatebirth).some((error) => error !== ""))
      return Object.values(errorMessdatebirth).some((error) => error !== "");
    else {
      console.log(Object.values(studentData))
      return !Object.values(studentData).some((student) => student !== "");
    }
  };

  return (
    <>
      <Navbar></Navbar>
      <div className="Main">
        <div className="formBox">
          <h1 className="formTitle">Form</h1>

          <form onSubmit={(ev) => submitHandler(ev)} autoComplete="off">
            <input
              type="text"
              placeholder="Name"
              name="name"
              onChange={(ev) => inputHandler(ev)}
              value={studentData.name}
            />
            <p className="errorText">{errorMessdatebirth.name}</p>

            <input
              type="text"
              name="apellido"
              placeholder="apellido"
              onChange={(ev) => inputHandler(ev)}
              value={studentData.apellido}
            />
            <p className="errorText">{errorMessdatebirth.apellido}</p>

            <input
              type="text"
              name="email"
              placeholder="email"
              onChange={(ev) => inputHandler(ev)}
              value={studentData.email}
            />
            <p className="errorText">{errorMessdatebirth.email}</p>

            <input
              type="date"
              name="datebirth"
              placeholder="datebirth"
              onChange={(ev) => inputHandler(ev)}
              value={studentData.datebirth}
            />
            <p className="errorText">{errorMessdatebirth.datebirth}</p>

            <input
              type="text"
              name="nacionalidad"
              placeholder="nacionalidad"
              onChange={(ev) => inputHandler(ev)}
              value={studentData.nacionalidad}
            />
            <p className="errorText">{errorMessdatebirth.nacionalidad}</p>

            <input
              type="text"
              name="username"
              placeholder="username"
              onChange={(ev) => inputHandler(ev)}
              value={studentData.username}
            />
            <p className="errorText">{errorMessdatebirth.datebirth}</p>
            <input
              type="password"
              name="password"
              placeholder="password"
              onChange={(ev) => inputHandler(ev)}
              value={studentData.password}
            />

            <input type="submit" value="Crear alumno" disabled={hasErrors()} />
          </form>
        </div>
      </div>
    </>
  );
}

export default Form;
