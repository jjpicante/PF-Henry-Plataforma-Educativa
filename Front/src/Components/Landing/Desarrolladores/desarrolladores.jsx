import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./desarrolladores.module.css";
import Pablo from "./Pablo.jpg";

export default function Desarrolladores() {
  const navigate = useNavigate();
  return (
    <div className={styles.container}>
      <h1>Desarrolladores</h1>
      <h2>Te damos la bienvenida!</h2>
      <p>
        Somos el Grupo 5 del proyecto final de carrera de Henry, conformado por seis Full Stack
        Developers; quienes a largo lo del presente proyecto, hemos puesto en práctica todos
        nuestros conocimientos y habilidades blandas incorporadas durante la carrera, dentro de un
        ambiente comfortable, positivo y de ideas constructivas; a fin de lograr un producto final
        altamente satisfactorio tanto para nosotros como para los usuarios de la Plataforma
        Estudiantil.
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
              Convencido del valor del aprendizaje, siempre me he preocupado por formarme y adquirir
              constantemente nuevas habilidades: Soy Técnico en Informática, Ingeniero Civil, y
              futuro Full Stack Developer; además de contar con estudios en Inglés, Francés y
              Alemán.
            </p>

            <p>
              Disfruto mucho programar, y sobre todo la libertad que brinda poder hacer mi trabajo
              desde cualquier sitio; lo que resulta ideal para alguien que ama viajar y conocer
              lugares nuevos todo el tiempo.
            </p>
          </div>
        </section>
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
              Convencido del valor del aprendizaje, siempre me he preocupado por formarme y adquirir
              constantemente nuevas habilidades: Soy Técnico en Informática, Ingeniero Civil, y
              futuro Full Stack Developer; además de contar con estudios en Inglés, Francés y
              Alemán.
            </p>

            <p>
              Disfruto mucho programar, y sobre todo la libertad que brinda poder hacer mi trabajo
              desde cualquier sitio; lo que resulta ideal para alguien que ama viajar y conocer
              lugares nuevos todo el tiempo.
            </p>
          </div>
        </section>
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
              Convencido del valor del aprendizaje, siempre me he preocupado por formarme y adquirir
              constantemente nuevas habilidades: Soy Técnico en Informática, Ingeniero Civil, y
              futuro Full Stack Developer; además de contar con estudios en Inglés, Francés y
              Alemán.
            </p>

            <p>
              Disfruto mucho programar, y sobre todo la libertad que brinda poder hacer mi trabajo
              desde cualquier sitio; lo que resulta ideal para alguien que ama viajar y conocer
              lugares nuevos todo el tiempo.
            </p>
          </div>
        </section>
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
              Convencido del valor del aprendizaje, siempre me he preocupado por formarme y adquirir
              constantemente nuevas habilidades: Soy Técnico en Informática, Ingeniero Civil, y
              futuro Full Stack Developer; además de contar con estudios en Inglés, Francés y
              Alemán.
            </p>

            <p>
              Disfruto mucho programar, y sobre todo la libertad que brinda poder hacer mi trabajo
              desde cualquier sitio; lo que resulta ideal para alguien que ama viajar y conocer
              lugares nuevos todo el tiempo.
            </p>
          </div>
        </section>
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
              Convencido del valor del aprendizaje, siempre me he preocupado por formarme y adquirir
              constantemente nuevas habilidades: Soy Técnico en Informática, Ingeniero Civil, y
              futuro Full Stack Developer; además de contar con estudios en Inglés, Francés y
              Alemán.
            </p>

            <p>
              Disfruto mucho programar, y sobre todo la libertad que brinda poder hacer mi trabajo
              desde cualquier sitio; lo que resulta ideal para alguien que ama viajar y conocer
              lugares nuevos todo el tiempo.
            </p>
          </div>
        </section>
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
              Convencido del valor del aprendizaje, siempre me he preocupado por formarme y adquirir
              constantemente nuevas habilidades: Soy Técnico en Informática, Ingeniero Civil, y
              futuro Full Stack Developer; además de contar con estudios en Inglés, Francés y
              Alemán.
            </p>

            <p>
              Disfruto mucho programar, y sobre todo la libertad que brinda poder hacer mi trabajo
              desde cualquier sitio; lo que resulta ideal para alguien que ama viajar y conocer
              lugares nuevos todo el tiempo.
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