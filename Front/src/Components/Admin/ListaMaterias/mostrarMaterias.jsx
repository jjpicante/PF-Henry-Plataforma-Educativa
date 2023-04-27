import React from "react";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getProfesor } from "../../../Redux/actions";

export default function Select({ alumnos, profesores }) {
  const dispatch = useDispatch();
  const [renderArray, setRenderArray] = useState([]);

  useEffect(() => {}, []);

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
