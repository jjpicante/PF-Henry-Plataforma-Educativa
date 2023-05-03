import React from "react";
import { useState } from "react";
import style from "./Caracteristicas.module.css";
import { Link } from "react-router-dom";

const Caracteristicas = () => {
  const [selected, setSelected] = useState("");

  function mostrarDetalle(choice) {
    if (choice === selected) setSelected("");
    else setSelected(choice);
  }

  return (
    <div className={style.container}>
      <div className={style.menu}>
        <h2 onClick={() => mostrarDetalle("infra")}>Infraestructura & Servicios</h2>
        <h2 onClick={() => mostrarDetalle("proyecto")}>Proyecto Educativo</h2>
        <h2 onClick={() => mostrarDetalle("tecnologia")}>Tecnología</h2>
        <h2 onClick={() => mostrarDetalle("deportes")}>Deportes</h2>
        <h2 onClick={() => mostrarDetalle("arte")}>Área Artística</h2>
        <h2 onClick={() => mostrarDetalle("religion")}>Orientación Religiosa</h2>
      </div>

      <div className={style.seleccion}>
        <div className={style.card} hidden={selected !== "infra"}>
          <h2>Infraestructura & Servicios</h2>
          <section className={style.contenidos}>
            <p>Contamos con:</p>
            <ul>
              <li>Biblioteca</li>
              <li>Laboratorio de Ciencias</li>
              <li>Sala de música</li>
              <li>Salón de usos múltiples</li>
              <li>Taller de Arte</li>
              <li>Sala de Informática</li>
              <li>Inst. deportivas en el predio</li>
            </ul>
            <p>El establecimiento cuenta, además, con un kiosko dentro de las instalaciones.</p>
          </section>
        </div>

        <div className={style.card} hidden={selected !== "proyecto"}>
          <h2>Proyecto Educativo</h2>
          <section className={style.contenidos}>
            <p>
              La institución educativa promueve las siguientes acciones y prácticas dentro de su
              propuesta de proyecto educativo:
            </p>
            <ul>
              <li>Campamentos</li>
              <li>Viajes de Estudio Nacionales</li>
              <li>Jornadas de Convivencia</li>
              <li>Orientación Psicopedagógica</li>
              <li>Orientación Vocacional</li>
              <li>Proyecto Ecológico</li>
              <li>Proyecto Solidario</li>
              <li>Proyecto de Integración</li>
            </ul>
          </section>
        </div>

        <div className={style.card} hidden={selected !== "tecnologia"}>
          <h2>Tecnología</h2>
          <section className={style.contenidos}>
            <p>
              En la institución se reconoce la importancia del recurso tecnológico en el marco de su
              propuesta educativa, disponiendo de feria de ciencia y tecn., sala de informática y
              software para alumnos.
            </p>
          </section>
        </div>

        <div className={style.card} hidden={selected !== "deportes"}>
          <h2>Deportes</h2>
          <section className={style.contenidos}>
            <p>
              En la institución educativa se practican 3 deportes (Atletismo, Volleybol y Fútbol).
            </p>
          </section>
        </div>

        <div className={style.card} hidden={selected !== "arte"}>
          <h2>Área artística</h2>
          <section className={style.contenidos}>
            <p>
              Se cuenta con infraestructura instalada asociada al proceso de formación artística
              (Taller de Arte). La institución realiza actividades artísticas y promueve en su
              alumnado los siguientes proyectos relacionados:
            </p>
            <ul>
              <li>Artes plásticas</li>
              <li>Música</li>
              <li>Sala de Música e Instrum.</li>
              <li>Taller de Arte</li>
            </ul>
          </section>
        </div>

        <div className={style.card} hidden={selected !== "religion"}>
          <h2>Orientación Religiosa</h2>
          <section className={style.contenidos}>
            <p>
              Es una institución educativa con orientación en valores de la religión Católica. Como
              infraestructura religiosa, el establecimiento cuenta con una capilla.
            </p>
          </section>
        </div>
      </div>
      <Link to="/">
        <button className={style.volver}>Volver</button>
      </Link>
    </div>
  );
};

export default Caracteristicas;
