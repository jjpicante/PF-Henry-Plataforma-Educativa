import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMaterias } from "../../../Redux/actions";
import styles from "./ListaMaterias.module.css";

const ListaMaterias = () => {
  const dispatch = useDispatch();
  const materias = useSelector((state) => state.materias);
  console.log(materias);
  useEffect(() => {
    async function listamaterias() {
      await dispatch(await getMaterias());
    }
    listamaterias();
  }, []);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Materias creadas:</h1>
      {materias.map((e) => {
        return (
          <div className={styles.containerAlumnos}>
            <div key={e.id} className={styles.materia}>
              <h2>{e.anio}</h2>
              <h2>{e.namemateria}</h2>
              <ul>
                {e.temas.map((e, index) => {
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
      })}
    </div>
  );
};

export default ListaMaterias;
