import { useLocation, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { getMateriasById, cleanDetail } from "../../Redux/actions";
import style from "./Detail.module.css";
import Navbar from "../NavBar/navBar";
import FireStorage from "../almacenamiento/Firestoragev2";
import Disqus from "../Coments/disqus";
//import { faL } from "@fortawesome/free-solid-svg-icons";

export default function Detail() {
  const [visible, setVisible] = useState(false);
  const location = useLocation();
  const dispatch = useDispatch();
  const { id } = useParams();
  const materiaById = useSelector((state) => state.materiaById);
  console.log(visible);
  const activar = () => {
    if (visible === false) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  };

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
              return (
                <li key={i}>
                  {i + 1}- {e}
                  <FireStorage visible={visible} url={location}></FireStorage>
                </li>
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
