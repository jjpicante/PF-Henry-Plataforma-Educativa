import style from "./CardAsignature.module.css";
import { NavLink } from "react-router-dom";

export default function CardAsignature({ name, year, id }) {
  return (
    <NavLink
      to={"/Aulas/materia/" + id}
      className={`${style.cards} ${style.nombreMateria}`}
    >
      <h1 className={style.nombreMateria}>{name}</h1>
      <h2 className={style.nombreMateria}>{year}</h2>
    </NavLink>
  );
}

