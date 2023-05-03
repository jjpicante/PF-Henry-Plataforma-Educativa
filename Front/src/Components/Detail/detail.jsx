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
//import { faBooks } from "@fortawesome/free-solid-svg-icons";
//import { faL } from "@fortawesome/free-solid-svg-icons";

export default function Detail() {
  const [visible, setVisible] = useState(false);
  const [document, setDocument] = useState([]);
  const [vista, setVista] = useState("alumnos");
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

  const borrarDocumento = async (e) => {
    const nameDocument = e.target.value;
    await deleteDoc(doc(db, "archivos", nameDocument));
    Swal.fire({
      text: `se a borrado correctamente el archivo: ${nameDocument}`,
      icon: "success",
    });
    navigate(0);
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
      <button className={style.button} hidden={userData.rol === "student"} onClick={activar}>
        Editar Encendido/Apagado
      </button>
      {materiaById ? (
        <div className={style.topDiv}>
          <div className={style.materia}>
            <h1 className={style.nombreMateria}>{materiaById?.namemateria}</h1>
            <h2>{materiaById?.anio}</h2>
          </div>
          <div>
            <button className={style.button} type="button" onClick={() => handleVista("alumnos")}>
              <FontAwesomeIcon className={style.editButton} icon={faGraduationCap} />
              Ver Alumnos
            </button>
            <button className={style.button} type="button" onClick={() => handleVista("temas")}>
              {/* <FontAwesomeIcon className={style.editButton} icon={faBooks} /> */}
              Ver Temas
            </button>
          </div>

          {/* Renderizado condicional de Temas */}
          {vista === "temas" ? (
            <ul>
              <h2>Temas</h2>
              {materiaById?.temas?.map((e, i) => {
                /* console.log(document.filter((doc) => doc.verifyname === e)); */
                const documentosDelTema = document.filter((doc) => doc.verifyname === e);
                return (
                  <>
                    <li key={i}>
                      <h1>
                        {i + 1}- {e}{" "}
                      </h1>
                      <FireStorage visible={visible} url={location} name={e}></FireStorage>
                    </li>

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
                          <nav className={style.navbar}>
                            <div className={style.navbarContainer}>
                              <ul className={style.navList}>
                                <li className={`${style.navItem} ${style.dropdown}`}>
                                  <div className={` ${style.customBtn} ${style.vertical}`}>...</div>
                                  <ul className={style.dropdownContent}>
                                    <li>
                                      <button
                                        value={doc.nombre}
                                        onClick={borrarDocumento}
                                        className={style.buttonli}
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
                  </>
                );
              })}
            </ul>
          ) : (
            /* Renderizado condicional de Alumnos */
            <ul>
              <h2>Alumnos</h2>
              {/* {console.log(alumnos)} */}
              {alumnos?.map((alumno, i) => {
                return (
                  <h1 key={i}>
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
