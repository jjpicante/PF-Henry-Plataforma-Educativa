import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  getStudent,
  editAlumno2,
  cleanResponse,
  getMateriasById,
  getAulas,
  editMateria,
} from "../../../../Redux/actions";
import { validations } from "./validations";
import style from "./EditarMateria.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";

export default function EditarMateria() {
  const dispatch = useDispatch();
  const params = useParams();
  const navigate = useNavigate();
  const { id } = params;

  const [asignaturas, setAsignaturas] = useState({});
  console.log(asignaturas);
  const [error, setError] = useState({
    name: "",
    temas: "",
    anio: "",
  });

  const [disabled, setDisabled] = useState({
    name: true,
    temas: true,
    anio: true,
  });

  const materias = useSelector((state) => state.materiaById);
  const aulas = useSelector((state) => state.aulas);

  useEffect(() => {
    dispatch(getMateriasById(id));
    setAsignaturas({
      name: materias.namemateria,
      anio: materias.anio,
      temas: materias.temas,
    });
    dispatch(getAulas());
  }, []);

  const inputHandler = (ev) => {
    setAsignaturas({
      ...asignaturas,
      [ev.target.name]: ev.target.value,
    });
    // setError(
    //   validations({
    //     ...usuario,
    //     [ev.target.name]: ev.target.value,
    //   })
    // );
  };
  const [newTema, setNewTema] = useState("");
  console.log(newTema);
  const addTema = () => {
    const newTemas = [...asignaturas.temas];
    console.log(newTemas);
    newTemas.push(newTema);
    setAsignaturas({ ...asignaturas, temas: newTemas });
  };

  const updateTemas = (ev) => {
    const newTemas = [...asignaturas.temas];
    const value = ev.target.value;
    const name = ev.target.name;
    console.log(value, name);
    newTemas[name] = { tema: value };
    setNewTema(value);
    setAsignaturas({ ...asignaturas, temas: newTemas });
  };

  //Habilita los inputs cuando se presiona en el ícono de editar
  function handleDisabled(inputName) {
    setDisabled({ ...disabled, [inputName]: false });
  }
  const [chekClick, setcheckClick] = useState(true);
  const handleCheckClick = () => {
    setcheckClick(!chekClick);
  };

  const submitHandler = (ev) => {
    ev.preventDefault();
    console.log("submit");
    addTema();
    console.log(asignaturas);
    dispatch(editMateria(id, asignaturas));
  };

  function hasErrors() {
    return (
      Object.values(error).some((error) => error !== "") ||
      Object.values(disabled).every((valor) => valor === true)
    );
  }

  //Borra el estado cuando se desmonta el componente
  useEffect(() => {
    return () => {
      dispatch(cleanResponse());
    };
  }, []);

  return (
    <div>
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
              value={asignaturas.name}
            />
            <button type="button" onClick={() => handleDisabled("name")}>
              <FontAwesomeIcon className={style.editButton} icon={faPenToSquare} />
            </button>
            <p className="errorText">{error.name}</p>
          </section>

          <section>
            <h4 className={style.campo}>Año</h4>
            <select
              className={style.text}
              type="text"
              name="anio"
              disabled={disabled.anio}
              onChange={(ev) => inputHandler(ev)}
              value={asignaturas.anio}
            >
              {aulas.map((i) => (
                <option value={i.anio} key={i.id}>
                  {i.anio}
                </option>
              ))}
            </select>
            <button type="button" onClick={() => handleDisabled("anio")}>
              <FontAwesomeIcon className={style.editButton} icon={faPenToSquare} />
            </button>
          </section>

          <section>
            <h4 className={style.campo}>Temas</h4>

            {materias.temas?.map((el, i) => {
              return (
                <input
                  className={style.text}
                  type="text"
                  name="temas"
                  disabled={disabled.temas}
                  onChange={(ev) => updateTemas(ev)}
                  value={el}
                  key={i}
                ></input>
              );
            })}

            <button type="button" onClick={() => handleDisabled("temas")}>
              <FontAwesomeIcon className={style.editButton} icon={faPenToSquare} />
            </button>
          </section>

          <button
            type="submit"
            className={hasErrors() ? style.disabledButtom : ""}
            disabled={hasErrors()}
            onClick={() => handleCheckClick()}
          >
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
