import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./desarrolladores.module.css";
import Pablo from "./Pablo.jpg";
import Ingrid from "./Ingrid.jpg";
import Juan from "./Juan.jpg";
import Dylan from "./Dylan.jpg";
import Roberto from "./Roberto.jpg";

import Jere from "./jere.jpg";

export default function Desarrolladores() {
  const navigate = useNavigate();
  return (
    <div className={styles.container}>
      <h1>Desarrolladores</h1>
      <h2>Te damos la bienvenida!</h2>
      <p>
        Somos el Grupo 5 del proyecto final de carrera de Henry, conformado por
        seis Full Stack Developers; quienes a largo lo del presente proyecto,
        hemos puesto en práctica todos nuestros conocimientos y habilidades
        blandas incorporadas durante la carrera, dentro de un ambiente
        comfortable, positivo y de ideas constructivas; a fin de lograr un
        producto final altamente satisfactorio tanto para nosotros como para los
        usuarios de la Plataforma Estudiantil.
      </p>
      <h3>Desplazate hacia abajo y conocenos un poco mas!</h3>
      <br />
      <div className={styles.allIntegrantes}>
        <section className={styles.integrante}>
          <img className={styles.img} src={Pablo} alt="Pablo" />
          <div className={styles.textos}>
            <h3 className={styles.nombre}>Pablo Salituri</h3>
            <div className={styles.mail}>
              <svg
                className={styles.sobre}
                xmlns="http://www.w3.org/2000/svg"
                width={"1vw"}
                height={"5vh"}
                fill="currentColor"
                class="bi bi-envelope-fill"
                viewBox="0 0 16 16"
              >
                <path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414.05 3.555ZM0 4.697v7.104l5.803-3.558L0 4.697ZM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586l-1.239-.757Zm3.436-.586L16 11.801V4.697l-5.803 3.546Z" />
              </svg>
              <p>pablo_salituri@live.com.ar</p>
            </div>
            <p>Tengo 33 años y nací en Tandil, Argentina. </p>
            <p>
              Convencido del valor del aprendizaje, siempre me he preocupado por
              formarme y adquirir constantemente nuevas habilidades: Soy Técnico
              en Informática, Ingeniero Civil, y futuro Full Stack Developer;
              además de contar con estudios en Inglés, Francés y Alemán.
            </p>

            <p>
              Disfruto mucho programar, y sobre todo la libertad que brinda
              poder hacer mi trabajo desde cualquier sitio; lo que resulta ideal
              para alguien que ama viajar y conocer lugares nuevos todo el
              tiempo.
            </p>
          </div>
        </section>
        <section className={styles.integrante}>
          <img className={styles.image} src={Ingrid} alt="Ingrid" />
          <div className={styles.textos}>
            <h3 className={styles.nombre}>Ingrid Lazarte</h3>
            <div className={styles.mail}>
              <svg
                className={styles.sobre}
                xmlns="http://www.w3.org/2000/svg"
                width={"1vw"}
                height={"5vh"}
                fill="currentColor"
                class="bi bi-envelope-fill"
                viewBox="0 0 16 16"
              >
                <path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414.05 3.555ZM0 4.697v7.104l5.803-3.558L0 4.697ZM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586l-1.239-.757Zm3.436-.586L16 11.801V4.697l-5.803 3.546Z" />
              </svg>
              <p>ingridlazartev@gmail.com.ar</p>
            </div>
            <p>Tengo 21 años y soy de Córdoba, Argentina. </p>
            <p>
              Desde que tengo uso de razón, he buscado oportunidades para
              ampliar mi conocimiento en distintas áreas. He estudiado música,
              soy preceptora en nivel secundario y también me desempeño como
              peluquera canina. Actualmente, estoy cursando la carrera de
              Ingeniería Industrial.
            </p>

            <p>
              Motivada por mi interés en adquirir nuevos conocimientos y por el
              afán de seguir incursionando en nuevas disciplinas, me interesé
              por la programación. Creo que esta disciplina ofrece muchas
              posibilidades y puedo utilizarla como complemento para mi
              formación universitaria.
            </p>
          </div>
        </section>
        <section className={styles.integrante}>
          <img className={styles.imagen} src={Juan} alt="Juan" />
          <div className={styles.textos}>
            <h3 className={styles.nombre}>Juan Fiorovic</h3>
            <div className={styles.mail}>
              <svg
                className={styles.sobre}
                xmlns="http://www.w3.org/2000/svg"
                width={"1vw"}
                height={"5vh"}
                fill="currentColor"
                class="bi bi-envelope-fill"
                viewBox="0 0 16 16"
              >
                <path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414.05 3.555ZM0 4.697v7.104l5.803-3.558L0 4.697ZM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586l-1.239-.757Zm3.436-.586L16 11.801V4.697l-5.803 3.546Z" />
              </svg>
              <p>jjfiorovic@gmail.com</p>
            </div>
            <p>Tengo 32 años. Soy de Gualeguaychu, Entre Rios, Argentina.</p>
            <p>
              Aunque soy Preparador Físico de formación, siempre he tenido una
              pasión por la tecnología. Ahora quiero centrarme en mi pasión
              tecnológica y hacer del deporte un hobby. Durante mi formación
              como programador he aprendido a estar muy enfocado en los
              objetivos, lo cual me ha ayudado a estar preparado para cualquier
              desafío que se me presente en el futuro.
            </p>

            <p>
              Me emociona pensar dónde me llevará mi futuro como desarrollador y
              estoy ansioso por seguir aprendiendo y creciendo en mi carrera.
            </p>
          </div>
        </section>
        <section className={styles.integrante}>
          <img className={styles.img} src={Jere} alt="Jeremias" />
          <div className={styles.textos}>
            <h3 className={styles.nombre}>Jeremias De Miguel</h3>
            <div className={styles.mail}>
              <svg
                className={styles.sobre}
                xmlns="http://www.w3.org/2000/svg"
                width={"1vw"}
                height={"5vh"}
                fill="currentColor"
                class="bi bi-envelope-fill"
                viewBox="0 0 16 16"
              >
                <path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414.05 3.555ZM0 4.697v7.104l5.803-3.558L0 4.697ZM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586l-1.239-.757Zm3.436-.586L16 11.801V4.697l-5.803 3.546Z" />
              </svg>
              <p>jeremiasdemiguel08@gmail.com</p>
            </div>
            <p>
              Soy Jeremías de Miguel, un apasionado desarrollador de software de
              19 años. Completé un curso en Herny y actualmente estudio
              Desarrollo de Software en la Universidad Nacional de Cuyo. Con mi
              equipo, desarrollamos con éxito una página web eficiente y fácil
              de usar.
            </p>
            <p>
              Mi amor por la tecnología va más allá del desarrollo de software;
              disfruto explorando nuevos programas y herramientas. Entreno y me
              divierto con la cultura japonesa y los videojuegos. Aunque puedo
              ser impaciente, siempre manejo mis emociones para no afectar mi
              trabajo. La música es una de mis pasiones y siempre busco mejorar
              mis habilidades y aprender nuevas tecnologías. ¡Estoy emocionado
              de mostrar todo lo que he aprendido!
            </p>

            <p></p>
          </div>
        </section>
        <section className={styles.integrante}>
          <img className={styles.img} src={Roberto} alt="Roberto" />
          <div className={styles.textos}>
            <h3 className={styles.nombre}>Roberto Perez</h3>
            <div className={styles.mail}>
              <svg
                className={styles.sobre}
                xmlns="http://www.w3.org/2000/svg"
                width={"1vw"}
                height={"5vh"}
                fill="currentColor"
                class="bi bi-envelope-fill"
                viewBox="0 0 16 16"
              >
                <path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414.05 3.555ZM0 4.697v7.104l5.803-3.558L0 4.697ZM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586l-1.239-.757Zm3.436-.586L16 11.801V4.697l-5.803 3.546Z" />
              </svg>
              <p>smile.roberto3@gmail.com</p>
            </div>
            <p>Tengo 21 años, soy de Chihuahua, Chihuahua, Mexico</p>
            <p>
              Soy una persona apasionada por el aprendizaje, siempre interesado
              en adquirir nuevos conocimientos y habilidades. Actualmente estoy
              estudiando ingeniería en software. Me gusta incursionar y explorar
              en el mundo del software, y estoy comprometido con seguir
              aprendiendo y desarrollando mis habilidades en este campo.
            </p>

            <p>
              Considero que tengo la capacidad de mirar introspectivamente para
              aceptar y mejorar mis errores. Y tengo altas espectativas de lo
              que me depara para el futuro.
            </p>
          </div>
        </section>
        <section className={styles.integrante}>
          <img className={styles.img} src={Dylan} alt="Dylan" />
          <div className={styles.textos}>
            <h3 className={styles.nombre}>Dylan Maldonado</h3>
            <div className={styles.mail}>
              <svg
                className={styles.sobre}
                xmlns="http://www.w3.org/2000/svg"
                width={"1vw"}
                height={"5vh"}
                fill="currentColor"
                class="bi bi-envelope-fill"
                viewBox="0 0 16 16"
              >
                <path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414.05 3.555ZM0 4.697v7.104l5.803-3.558L0 4.697ZM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586l-1.239-.757Zm3.436-.586L16 11.801V4.697l-5.803 3.546Z" />
              </svg>
              <p>dylanmaldonado22@hotmail.com</p>
            </div>
            <p>Tengo 25 años. Soy de Pinamar, Buenos Aires, Argentina.</p>
            <p>
              Soy un apasionado de la programación y el aprendizaje en diversos
              campos también estoy altamente interesado en la educación continua
              y la mejora constante. He estudiado inglés y actualmente estoy
              tomando un curso de radiolocutor aficionado, lo que me ha
              permitido desarrollar mis habilidades de comunicación y expresión
              en diversos formatos.
            </p>

            <p>
              En general, me considero una persona curiosa, creativa y
              comprometida con el éxito en todo lo que hago. Estoy ansioso por
              seguir desarrollando mis habilidades en el campo de la tecnología
              y contribuir al éxito de cualquier equipo o empresa en la que me
              encuentre.
            </p>
          </div>
        </section>
      </div>

      <br />
      <button
        type="button"
        className={styles.button}
        onClick={() => {
          navigate(-1);
        }}
      >
        Volver
      </button>
      <br />
    </div>
  );
}
