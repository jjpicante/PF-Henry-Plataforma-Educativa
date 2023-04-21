import Navbar from "../NavBar/navBar";
import style from "./Alumnos.module.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getStudents } from "../../Redux/actions";

export default function Alumnos() {
  const dispatch = useDispatch();
  const alumnos = useSelector((state) => state.students);
  alumnos.sort((a, b) => (a.Apellido < b.Apellido ? -1 : a.Apellido > b.Apellido ? 1 : 0));
  console.log(alumnos);
  useEffect(() => {
    dispatch(getStudents());
  }, [dispatch]);

  return (
    <div className={style.container}>
      <Navbar />
      <h1 className={style.titulo}>Alumnos</h1>
      <div className={style.containerAlumnos}>
        {alumnos?.map((el, i) => (
          <p key={i} className={style.alumnos}>
            {i+1}- {el.Apellido}, {el.Nombre}
          </p>
        ))}
      </div>
    </div>
  );
}
