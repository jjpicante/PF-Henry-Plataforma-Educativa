import { useLocation, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { storage, /* app, */ db } from "../../config/firebase";
import { doc, setDoc, collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { getMateriasById, cleanDetail } from "../../Redux/actions";
import style from "./Detail.module.css";
import Navbar from "../NavBar/navBar";
import FireStorage from "../almacenamiento/Firestoragev2";
import Disqus from "../Coments/disqus";
import styles from "../almacenamiento/FireStorage.module.css";
//import { faL } from "@fortawesome/free-solid-svg-icons";

export default function Detail() {
  const [visible, setVisible] = useState(false);
  const [document, setDocument] = useState([]);
  const location = useLocation();
  const dispatch = useDispatch();
  const { id } = useParams();
  const materiaById = useSelector((state) => state.materiaById);
  console.log(document);
  const activar = () => {
    if (visible === false) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  };

  const nametema = (name) => {
    return name;
  };

  useEffect(() => {
    async function documentos() {
      const documentlist = await getDocs(collection(db, "archivos"));
      setDocument(documentlist.docs.map((doc) => doc.data()));
    }
    documentos();
  }, []);

  useEffect(() => {
    dispatch(getMateriasById(id));
    return () => {
      dispatch(cleanDetail());
    };
  }, [dispatch, id]);

  return (
    <div className={style.fondo}>
      <Navbar />
      <button onClick={activar}>Editar Encendido/Apagado</button>
      {materiaById ? (
        <div className={style.topDiv}>
          <div className={style.materia}>
            <h1 className={style.nombreMateria}>{materiaById?.namemateria}</h1>
            <h2>{materiaById?.anio}</h2>
          </div>
          <ul>
            <h2>Temas</h2>
            {materiaById?.temas?.map((e, i) => {
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
                      <a
                        key={index}
                        href={doc.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.documentList}
                      >
                        {doc.nombre !== undefined ? doc.nombre : "HOLa"}
                      </a>
                    );
                  })}
                </>
              );
            })}
          </ul>
        </div>
      ) : (
        <p>Cargando...</p>
      )}
      <Disqus></Disqus>
    </div>
  );
}
