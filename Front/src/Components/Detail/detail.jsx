import { useLocation, useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { db } from "../../config/firebase";
import { doc, collection, getDocs, deleteDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { getStudents, getMateriasById, cleanDetail } from "../../Redux/actions";
import style from "./Detail.module.css";
import Navbar from "../NavBar/navBar";
import Swal from "sweetalert2";
import FireStorage from "../almacenamiento/Firestoragev2";
import Disqus from "../Coments/disqus";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGraduationCap } from "@fortawesome/free-solid-svg-icons";
import { faBook } from "@fortawesome/free-solid-svg-icons";
//import { faL } from "@fortawesome/free-solid-svg-icons";

export default function Detail() {
  const [visible, setVisible] = useState(false);
  const [document, setDocument] = useState([]);
  const [vista, setVista] = useState("temas");
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const materiaById = useSelector((state) => state.materiaById);

  const userData = useSelector((state) => state.userData);
  const allAlumnos = useSelector((state) => state.students);
  const alumnos = allAlumnos?.filter((elem) => elem[0].anio === materiaById.anio);

  alumnos.sort((a, b) =>
    a[0].apellido < b[0].apellido ? -1 : a[0].apellido > b[0].apellido ? 1 : 0
  );

  //console.log(document);

  const activar = () => {
    if (visible === false) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  };

  function handleVista(criterio) {
    if (criterio === "alumnos") setVista("alumnos");
    else setVista("temas");
  }

  const [confirmacion, setConfirmacion] = useState(false);
  const borrarDocumento = async (e) => {
    if (confirmacion === false) {
      setConfirmacion(true);
    } else {
      setConfirmacion(false);
    }
  };
  const siBorrar = async (e) => {
    const nameDocument = e.target.value;
    await deleteDoc(doc(db, "archivos", nameDocument));
    Swal.fire({
      text: `se a borrado correctamente el archivo: ${nameDocument}`,
      icon: "success",
    });
    navigate(0);
  };

  const noBorrar = (e) => {
    setConfirmacion(false);
  };

  useEffect(() => {
    async function documentos() {
      const documentlist = await getDocs(collection(db, "archivos"));
      setDocument(documentlist.docs.map((doc) => doc.data()));
    }
    documentos();
  }, []);

  useEffect(() => {
    dispatch(getStudents());
    dispatch(getMateriasById(id));
    return () => {
      dispatch(cleanDetail());
    };
  }, [dispatch, id]);

  return (
    <div className={style.fondo}>
      <Navbar />

      {materiaById ? (
        <div className={style.topDiv}>
          <div className={style.materia}>
            <h1 className={style.nombreMateria}>{materiaById?.namemateria}</h1>
            <h2>{materiaById?.anio}</h2>
          </div>
          <div className={style.botones}>
            <h5 hidden={userData.rol !== "profesor"}>Cargar Temas</h5>
            <section className={style.alumnostemas}>
              <button type="button" onClick={() => handleVista("alumnos")}>
                <FontAwesomeIcon className={style.editButton} icon={faGraduationCap} />
                Ver Alumnos
              </button>
              <button type="button" onClick={() => handleVista("temas")}>
                <FontAwesomeIcon className={style.editButton} icon={faBook} />
                Ver Temas
              </button>
            </section>
            <div hidden={visible === true || userData.rol !== "profesor"}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="160"
                fill="currentColor"
                class="bi bi-toggle-off"
                viewBox="0 0 16 16"
                className={style.toggleOff}
                onClick={activar}
              >
                <path d="M11 4a4 4 0 0 1 0 8H8a4.992 4.992 0 0 0 2-4 4.992 4.992 0 0 0-2-4h3zm-6 8a4 4 0 1 1 0-8 4 4 0 0 1 0 8zM0 8a5 5 0 0 0 5 5h6a5 5 0 0 0 0-10H5a5 5 0 0 0-5 5z" />
              </svg>
            </div>
            <div hidden={visible === false || userData.rol !== "profesor"}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="160"
                fill="currentColor"
                class="bi bi-toggle-on"
                viewBox="0 0 16 16"
                className={style.toggleOn}
                onClick={activar}
              >
                <path d="M5 3a5 5 0 0 0 0 10h6a5 5 0 0 0 0-10H5zm6 9a4 4 0 1 1 0-8 4 4 0 0 1 0 8z" />
              </svg>
            </div>

            {/* <button
              className={style.encendido}
              hidden={userData.rol === "student"}
              onClick={activar}
            >
              Editar Encendido/Apagado
            </button> */}
          </div>

          {/* Renderizado condicional de Temas */}
          {vista === "temas" ? (
            <section className={style.render}>
              <h2>Temas</h2>
              <ul className={style.cards}>
                {materiaById?.temas?.map((e, i) => {
                  /* console.log(document.filter((doc) => doc.verifyname === e)); */
                  const documentosDelTema = document.filter((doc) => doc.verifyname === e);
                  return (
                    <>
                      <li key={i} className={style.card}>
                        <h3>
                          {i + 1}- {e}{" "}
                        </h3>
                        <FireStorage visible={visible} url={location} name={e}></FireStorage>

                        {documentosDelTema.map((doc, index) => {
                          return (
                            <div className={style.containerdoc}>
                              <a
                                key={index}
                                href={doc.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={style.documentList}
                              >
                                {doc.nombre !== undefined ? doc.nombre : "HOLa"}
                              </a>

                              <div
                                className={
                                  confirmacion ? style.confirmacioncss : style.noConfirmacion
                                }
                              >
                                <h1>Estas seguro de querer eliminar el archivo: {doc.nombre}</h1>
                                <button
                                  value={doc.nombre}
                                  className={style.buttonsi}
                                  onClick={siBorrar}
                                >
                                  Si
                                </button>
                                <button className={style.buttonno} onClick={noBorrar}>
                                  No
                                </button>
                              </div>

                              <nav className={style.navbar}>
                                <div className={style.navbarContainer}>
                                  <ul className={style.navList}>
                                    <li className={`${style.navItem} ${style.dropdown}`}>
                                      <div className={` ${style.customBtn} ${style.vertical}`}>
                                        ...
                                      </div>
                                      <ul className={style.dropdownContent}>
                                        <li>
                                          <button
                                            value={doc.nombre}
                                            onClick={borrarDocumento}
                                            className={style.navLink}
                                          >
                                            Delete
                                          </button>
                                        </li>
                                      </ul>
                                    </li>
                                  </ul>
                                </div>
                              </nav>
                            </div>
                          );
                        })}
                      </li>
                    </>
                  );
                })}
              </ul>
            </section>
          ) : (
            /* Renderizado condicional de Alumnos */
            <ul>
              <h2>Alumnos</h2>
              {/* {console.log(alumnos)} */}
              {alumnos?.map((alumno, i) => {
                return (
                  <h1 className={style.txtAlumnos} key={i}>
                    {i + 1}- {alumno[0].apellido}, {alumno[0].name}
                  </h1>
                );
              })}
            </ul>
          )}
        </div>
      ) : (
        <p>Cargando...</p>
      )}
      <Disqus></Disqus>
    </div>
  );
}