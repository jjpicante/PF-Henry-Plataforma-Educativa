import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getMateriasById, cleanDetail } from "../../Redux/actions";
import style from "./Detail.module.css"

export default function Detail() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const materiaById = useSelector((state) => state.materiaById);

  useEffect(() => {
    dispatch(getMateriasById(id));
    return () => {
      dispatch(cleanDetail());
    };
  }, [dispatch, id]);

  return (
    <div className={style.fondo}>
      {materiaById[0] ? (
        <div className={style.topDiv}>
          <div className={style.materia}>
            <h1>{materiaById[0].nombre}</h1>
            <h2>{materiaById[0].anio}</h2>
          </div>
          <div>
            <h2>Temas</h2>
            {materiaById[0].temas?.map((e, i) => {
              return <h3 key={i}>{i+1}- {e}</h3>;
            })}
          </div>
        </div>
      ) : (
        <p>Cargando...</p>
      )}
    </div>
  );
}
