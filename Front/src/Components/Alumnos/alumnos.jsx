import Navbar from "../NavBar/navBar";
import style from "./Alumnos.module.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getStudents } from "../../Redux/actions";

export default function Alumnos() {
  const dispatch = useDispatch();
  const allAlumnos = useSelector((state) => state.students);
  const userData = useSelector((state) => state.userData);
  const alumnos = allAlumnos?.filter((elem) => elem[0].anio === userData.anio)
  
  alumnos.sort((a, b) =>
    a[0].apellido < b[0].apellido ? -1 : a[0].apellido > b[0].apellido ? 1 : 0
  );
  useEffect(() => {
    dispatch(getStudents());
  }, [dispatch]);

  return (
    <div className={style.container}>
      <Navbar />
      <h1 className={style.titulo}>Alumnos</h1>
      <div className={style.containerAlumnos}>
        {alumnos?.map((el, i) => {
          return (
            <p key={i} className={style.alumnos}>
              {i + 1}- {el[0].apellido}, {el[0].name}
            </p>
          );
        })}
      </div>
    </div>
  );
}
