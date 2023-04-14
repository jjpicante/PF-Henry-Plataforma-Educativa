import style from "./CardAsignature.module.css"
import { NavLink } from "react-router-dom";

export default function CardAsignature({ name, year , id }) {
  return (
    <NavLink to={"/Aulas/materia/" + id}>
    <div className={style.cards}>
      <h1>{name}</h1>
      <h2>{year}</h2>
    </div>
    </NavLink>
  );
}

