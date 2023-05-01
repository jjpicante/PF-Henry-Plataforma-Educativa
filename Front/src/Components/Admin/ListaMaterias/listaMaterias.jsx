import React, { useEffect /* , useState  */ } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMaterias } from "../../../Redux/actions";
import styles from "./ListaMaterias.module.css";
import NavBarAdmin from "../navbarAdMIN/NavBar";

const ListaMaterias = () => {
  const dispatch = useDispatch();
  const materias = useSelector((state) => state.materias);
  console.log(materias);
  useEffect(() => {
    console.log("asd");
    async function listamaterias() {
      await dispatch(await getMaterias());
    }
    listamaterias();
  }, []);

  return (
    <>
      <div>
        <NavBarAdmin />
      </div>
      <div className={styles.container}>
        <h1 className={styles.title}>Materias creadas:</h1>
        {materias.length !== 0
          ? materias?.map((e) => {
              return (
                <div className={styles.containerAlumnos}>
                  <div key={e.id} className={styles.materia}>
                    <h2>{e.anio}</h2>
                    <h2>{e.namemateria}</h2>
                    <ul>
                      {e.temas?.map((e, index) => {
                        return (
                          <>
                            <li>{e}</li>
                          </>
                        );
                      })}
                    </ul>
                  </div>
                  <hr className={styles.alumnos}></hr>
                </div>
              );
            })
          : "Loading"}
      </div>
    </>
  );
};

export default ListaMaterias;
