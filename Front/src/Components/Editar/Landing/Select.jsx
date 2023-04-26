import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getProfesor } from "../../../Redux/actions";

export default function Select({ alumnos, profesores }) {
  const dispatch = useDispatch();
  const [renderArray, setRenderArray] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      let newArray = [];
      if (profesores) {
        for (const profesor of profesores) {
          const profe = await dispatch(getProfesor(profesor.username));
          const aulas = profe.Aulas;
          newArray.push({
            apellido: profesor.apellido,
            name: profesor.name,
            Rol: profesor.rol,
            Aulas: aulas.map((aula) => aula.anio).join(", "),
          });
        }
      }
      if (alumnos) {
        for (const alumno of alumnos) {
          newArray.push({
            apellido: alumno[0].apellido,
            name: alumno[0].name,
            Rol: alumno[0].rol,
            Aulas: alumno[0].anio,
          });
        }
      }
      setRenderArray(newArray);
    };
    fetchData();
  }, [alumnos, profesores, dispatch]);

  return (
    <div>
      {renderArray.map((el, i) => {
        return (
          <p key={i}>
            {el.apellido}, {el.name} - Rol: {el.Rol} - Año: {el.Aulas}
          </p>
        );
      })}
    </div>
  );
}
