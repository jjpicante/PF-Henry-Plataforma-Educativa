import React from "react";
import { useState } from "react";
import style from "./Tecnologias.module.css";
import reactLogo from './reactLogo.png';
import reduxLogo from "./reduxLogo.png";
import jsLogo from "./jsLogo.png";
import bootstrapLogo from "./bootstrapLogo.png";
import GitHubLogo from "./GitHubLogo.png"
import sequelizeLogo from "./sequelizeLogo.png";
import postgreSQLLogo from "./postgreSQLLogo.png";
import firebaseLogo from "./firebaseLogo.png"
import { Link } from "react-router-dom";

const Tecnologías = () => {
    const [selected, setSelected] = useState("");

    function mostrarDetalle(choice) {
        if (choice === selected) setSelected("");
        else setSelected(choice);
    }

    return (
        <div className={style.container}>

            <div className={style.menu}>
                <h2 onClick={() => mostrarDetalle("React")}>  <img className={style.reactLogo} src={reactLogo} alt="reactLogo" />React</h2>
                <h2 onClick={() => mostrarDetalle("Javascript")}> <img className={style.jsLogo} src={jsLogo} alt="jsLogo" />Javascript</h2>
                <h2 onClick={() => mostrarDetalle("Redux")}> <img className={style.reduxLogo} src={reduxLogo} alt="reduxLogo" />Redux</h2>
                <h2 onClick={() => mostrarDetalle("Bootstrap")}> <img className={style.bootstrapLogo} src={bootstrapLogo} alt="bootstrapLogo" />Bootstrap</h2>
                <h2 onClick={() => mostrarDetalle("GitHub")}> <img className={style.GitHubLogo} src={GitHubLogo} alt="GitHubLogo" />GitHub</h2>
                <h2 onClick={() => mostrarDetalle("Sequelize")}> <img className={style.sequelizeLogo} src={sequelizeLogo} alt="sequelizeLogo" />Sequelize</h2>
                <h2 onClick={() => mostrarDetalle("PostgreSQL")}> <img className={style.postgreSQLLogo} src={postgreSQLLogo} alt="postgreSQLLogo" />PostgreSQL</h2>
                <h2 onClick={() => mostrarDetalle("Firebase")}> <img className={style.firebaseLogo} src={firebaseLogo} alt="firebaseLogo" />Firebase</h2>
            </div>

            <div className={style.seleccion}>
                <div className={style.card} hidden={selected !== "React"}>
                    <h2>React</h2>
                    <section className={style.contenidos}>
                        <p>React es una biblioteca de JavaScript para construir interfaces de usuario interactivas y escalables.
                            Permite crear componentes reutilizables y manejar el estado de la aplicación de manera sencilla.
                            Utiliza el DOM virtual para minimizar el tiempo de carga y mejorar el rendimiento de la aplicación.</p>
                    </section>
                </div>

                <div className={style.card} hidden={selected !== "Javascript"}>
                    <h2>Javascript</h2>
                    <section className={style.contenidos}>
                        <p>
                            JavaScript es un lenguaje de programación dinámico, orientado a objetos e interpretado que se utiliza principalmente en el
                            desarrollo web para crear aplicaciones interactivas y dinámicas en el lado del cliente.
                            Es uno de los lenguajes más populares del mundo y se ejecuta en todos los navegadores web modernos.
                        </p>

                    </section>
                </div>

                <div className={style.card} hidden={selected !== "Redux"}>
                    <h2>Redux</h2>
                    <section className={style.contenidos}>
                        <p>
                            Redux es una librería de gestión de estado para aplicaciones JavaScript de una sola página (SPA).
                            Se utiliza principalmente con React, pero también se puede utilizar con otras bibliotecas o marcos de trabajo de JavaScript.
                            Redux se basa en la arquitectura Flux y se centra en la idea de que el estado de la aplicación debe ser centralizado y predecible.
                        </p>
                    </section>
                </div>

                <div className={style.card} hidden={selected !== "Bootstrap"}>
                    <h2>Bootstrap</h2>
                    <section className={style.contenidos}>
                        <p>
                            Bootstrap es un framework de diseño web que proporciona una serie de herramientas y componentes predefinidos basados en HTML, CSS y JavaScript.
                            Con Bootstrap, puedes crear fácilmente páginas web responsivas y adaptables a diferentes dispositivos y resoluciones.
                            Bootstrap te permite aprovechar al máximo los recursos de CSS, con una variedad de clases y estilos predefinidos que facilitan la creación de diseños atractivos y funcionales en poco tiempo.
                        </p>
                    </section>
                </div>

                <div className={style.card} hidden={selected !== "GitHub"}>
                    <h2>GitHub</h2>
                    <section className={style.contenidos}>
                        <p>
                            Github es una plataforma creada para alojar el código de las aplicaciones de cualquier desarrollador web y, que como usuario,
                            da la opción de descargarse la aplicación o acceder a su perfil para leer o colaborar en el desarrollo de los diferentes proyectos
                        </p>

                    </section>
                </div>

               
                <div className={style.card} hidden={selected !== "Sequelize"}>
                    <h2>Sequelize</h2>
                    <section className={style.contenidos}>
                        <p>
                            Sequelize es un ORM (Object Relational Mapping) para Node.js que permite a los desarrolladores trabajar con bases de datos relacionales como MySQL, PostgreSQL, SQLite y Microsoft SQL Server.
                            Sequelize proporciona una interfaz sencilla y fácil de usar para definir modelos, realizar consultas y realizar operaciones CRUD en la base de datos.
                        </p>
                    </section>
                </div>

                <div className={style.card} hidden={selected !== "PostgreSQL"}>
                    <h2>PostgreSQL</h2>
                    <section className={style.contenidos}>
                        <p>
                            PostgreSQL es un sistema de gestión de bases de datos relacional (RDBMS) de código abierto que permite a los desarrolladores crear y administrar bases de datos relacionales.
                        </p>
                    </section>
                </div>

                <div className={style.card} hidden={selected !== "Firebase"}>
                    <h2>Firebase</h2>
                    <section className={style.contenidos}>
                        <p>
                            Firebase es una plataforma digital diseñada para facilitar el desarrollo de aplicaciones web y móviles de calidad de una forma rápida y eficiente,
                            con el objetivo de mejorar el rendimiento de las mismas a través de la implementación de sus distintos módulos que harán que la aplicación sea mucho más manejable y
                            segura.
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

export default Tecnologías;