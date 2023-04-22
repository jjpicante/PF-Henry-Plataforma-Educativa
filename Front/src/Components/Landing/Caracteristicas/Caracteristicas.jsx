import style from "./Caracteristicas.module.css"

const Caracteristicas = () => {

    return (

        <div className={style.container}>

            <div className={style.container1}>
                <h2>Infraestructura & servicios</h2>

                <li>Biblioteca</li>
                <li>Laboratorio de Ciencias</li>
                <li>Sala de música</li>
                <li>Salón de usos múltiples</li>
                <li>Taller de Arte</li>
                <li>Sala de Informática</li>
                <li>Inst. deportivas en el predio</li>
                <p>El establecimiento cuenta, además, con un kiosko dentro de las instalaciones.</p>
            </div>

            <div className={style.container2}>
                <h2>Orientación Religiosa</h2>
                <a>Es una institución educativa con orientación en valores de la religión Católica. Como infraestructura religiosa, el establecimiento cuenta con una capilla.</a>
            </div>

            <div className={style.container3}>
                <h2>Proyecto educativo</h2>
                <p>La institución educativa promueve las siguientes acciones y prácticas dentro de su propuesta de proyecto educativo:</p>
                <li>Campamentos</li>
                <li>Viajes de Estudio Nacionales</li>
                <li>Jornadas de Convivencia</li>
                <li>Orientación Psicopedagógica</li>
                <li>Orientación Vocacional</li>
                <li>Proyecto Ecológico</li>
                <li>Proyecto Solidario</li>
                <li>Proyecto de Integración</li>
            </div>

            <div className={style.container4}>
                <h2>Tecnología</h2>
                <p>En la institución se reconoce la importancia del recurso tecnológico en el marco de su propuesta educativa, disponiendo de feria de ciencia y tecn., sala de informática y software para alumnos.
                </p>
            </div>


            <div className={style.container5}> 
                <h2>Deportes</h2>
                <p>En la institución educativa se practican 3 deportes (Atletismo, Volleybol y Fútbol).
                </p>
            </div>


            <div className={style.container6}>
                <h2>Área artística</h2>
                <p>Se cuenta con infraestructura instalada asociada al proceso de formación artística (Taller de Arte). La institución realiza actividades artísticas y promueve en su alumnado los siguientes proyectos relacionados:
                </p>
                <li>Artes plásticas</li>
                <li>Música</li>
                <li>Sala de Música e Instrum.</li>
                <li>Taller de Arte</li>
            </div>

        </div>
    )
}

export default Caracteristicas;