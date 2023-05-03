import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../../NavBar/navBar";
import { getStudent, editAlumno2, cleanResponse } from "../../../Redux/actions";
import { validations } from "./validations";
import style from "./EditarUsuarios.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";
import NavBarAdmin from "../../Admin/navbarAdMIN/NavBar";

export default function EditarUsuarios() {
  const dispatch = useDispatch();
  const params = useParams();
  const navigate = useNavigate();
  const { username } = params;

  //Datos del usuario solicitado, que podrán cambiarse
  const [usuario, setUsuario] = useState({});
  console.log(usuario);

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
    anio: true,
  });

  const [paises, setPaises] = useState([]);
  const response = useSelector((state) => state.editResponse);

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

  console.log(response);

  const [chekClick, setcheckClick] = useState(true);
  console.log(chekClick);

  const handleCheckClick = () => {
    setcheckClick(!chekClick);
  };

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

      //Datos que podrán cambiar
      setUsuario({
        name: alumno.name,
        apellido: alumno.apellido,
        datebirth: alumno.datebirth.slice(0, 10),
        nacionalidad: alumno.nacionalidad,
        anio: alumno.anio,
        rol: alumno.rol,
        email: alumno.email,
        username: alumno.username,
        password: alumno.password,
      });

      //Datos invariables
      setvaloresOriginales({
        name: alumno.name,
        apellido: alumno.apellido,
        datebirth: alumno.datebirth.slice(0, 10),
        nacionalidad: alumno.nacionalidad,
        anio: alumno.anio,
        rol: alumno.rol,
        email: alumno.email,
        username: alumno.username,
        password: alumno.password,
      });
    }
    fetchStudent();
  }, []);

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
    dispatch(editAlumno2(valoresOriginales.username, paraEditar(valoresOriginales, usuario)));
  };

  function hasErrors() {
    return (
      Object.values(error).some((error) => error !== "") ||
      Object.values(disabled).every((valor) => valor === true)
    );
  }

  useEffect(() => {
    if (response) {
      if (response === "Tus datos se modificaron con éxito") {
        Swal.fire({
          text: response,
          icon: "success",
        });
      } else
        Swal.fire({
          text: response,
          icon: "warning",
        });
    }
  }, [response, chekClick]);

  //Borra el estado cuando se desmonta el componente
  useEffect(() => {
    return () => {
      dispatch(cleanResponse());
    };
  }, []);

  return (
    <div>
      <div>
        <NavBarAdmin />
      </div>
      <div className={style.container}>
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
            <h4 className={style.campo}>Username</h4>
            <input
              className={style.text}
              type="text"
              name="username"
              autoComplete="off"
              disabled={true}
              //onChange={(ev) => inputHandler(ev)}
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
              //onChange={(ev) => inputHandler(ev)}
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
              //onChange={(ev) => inputHandler(ev)}
              value={usuario.password}
            />
            <p className="errorText">{error.password}</p>
          </section>

          <section>
            <h4 className={style.campo}>Rol</h4>
            <select
              className={style.text}
              type="text"
              name="rol"
              disabled={true}
              //onChange={(ev) => inputHandler(ev)}
              value={usuario.rol}
            >
              {["admin", "profesor", "student"].map((i) => (
                <option value={i} key={i}>
                  {i}
                </option>
              ))}
            </select>
          </section>
          <button type="submit" disabled={hasErrors()} onClick={() => handleCheckClick()}>
            Confirmar Cambios
          </button>

          <button
            className={style.volverButton}
            type="button"
            onClick={() => {
              navigate(-1);
            }}
          >
            Volver
          </button>
        </form>
      </div>
    </div>
  );
}
