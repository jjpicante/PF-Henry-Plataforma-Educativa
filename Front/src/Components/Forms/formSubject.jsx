import { useEffect, useState } from "react";
import { validate, validateSubmit } from "./validations";
import { useDispatch, useSelector } from "react-redux";
import { getAulas } from "../../Redux/actions";
import axios from "axios";
import Swal from "sweetalert2";
import NavBarAdmin from "../Admin/navbarAdMIN/NavBar";

function FormSubject() {
  const [subjectData, setSubjectData] = useState({
    namemateria: "",
    anio: "",
    temas: [],
  });
  const [errorMessage, setErrorMessage] = useState({
    namemateria: "",
    anio: "",
    temas: [],
  });
  const [newTema, setNewTema] = useState("");
  const aula = useSelector((state) => state.aulas);
  const dispatch = useDispatch();
  console.log(newTema);
  console.log(subjectData);

  useEffect(() => {
    async function sync() {
      /* const verify =  */ await dispatch(getAulas());
    }
    sync();
  }, []);

  const inputHandler = (ev) => {
    setSubjectData({
      ...subjectData,
      [ev.target.name]: ev.target.value,
    });
    setErrorMessage(
      validate({
        ...subjectData,
        [ev.target.name]: ev.target.value,
      })
    );
  };

  const addTema = () => {
    const newTemas = [...subjectData.temas];
    console.log(newTemas);
    newTemas.push(newTema);
    setSubjectData({ ...subjectData, temas: newTemas });
    //!hay que cambiar esto para que se cree un nuevo input cada vez que agregamos una nueva materia
    Swal.fire({
      text: "Tema agregado correctamente, si tuviste un error podras corregirlo en la seccion de materias",
      icon: "success",
    });
  };

  const updateTema = (index) => {
    const newTemas = [...subjectData.temas];
    console.log(newTemas);
    const nombre = index.target.name;
    const target = index.target.value;
    console.log(nombre, target);
    newTemas[nombre] = { tema: target };
    setNewTema(target);
    setSubjectData({ ...subjectData, temas: newTemas });
    console.log("asd");
  };

  const submitHandler = async (ev) => {
    ev.preventDefault();
    const error = validateSubmit(subjectData, errorMessage);
    console.log(error.namemateria);
    if (Object.values(error).length === 0) {
      await axios.post("/Materias", subjectData);
      Swal.fire({
        text: "Materia Creada Exitosamente",
        icon: "success",
        timer: 3000,
      });
    } else {
      Swal.fire({
        text: "Porfavor verifica los datos",
        icon: "warning",
      });
      return error.namemateria || error.anio || error.temas;
    }
  };

  return (
    <>
      <div>
        <NavBarAdmin />
      </div>
      <div className="MainMaterias">
        <div className="formBox">
          <h1 className="formTitle">Crear Materias</h1>

          <form onSubmit={submitHandler} autoComplete="off">
            <input
              type="text"
              placeholder="Nombre de la materia"
              name="namemateria"
              onChange={inputHandler}
            />
            <p className="errorText">{errorMessage.namemateria}</p>
            <input
              type="text"
              placeholder="Escribe los temas de la materia"
              name="temas"
              onChange={updateTema}
            />
            <input type="button" value="Agregar" onClick={addTema} />
            <select name="anio" onChange={inputHandler} defaultValue="Seleciona el Año">
              <option name="Seleciona el Año" value="Seleciona el Año">
                Seleciona el Año
              </option>
              {aula !== undefined
                ? aula.map((e) => {
                    return (
                      <option key={e.id} name="anio" value={e.anio}>
                        {e.anio}
                      </option>
                    );
                  })
                : "Loading"}
            </select>
            <input type="submit" />
          </form>
        </div>
      </div>
    </>
  );
}

export default FormSubject;
