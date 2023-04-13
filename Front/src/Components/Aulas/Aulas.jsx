import SearchBar from "../SearchBar/searchBar";
import CardAsignature from "../Cards/cards";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getMaterias } from "../../Redux/actions";
import style from "./Classroom.module.css"

const Classroom = () => {
  const dispatch = useDispatch();
  const asignatures = useSelector((state) => state.materias);
  console.log(asignatures);

  useEffect(() => {
    dispatch(getMaterias());
  }, [dispatch]);

  return (
    <div>
      <div>
        <SearchBar></SearchBar>
      </div>
      <div className={style.cardsContent}>
        {asignatures?.map((elem) => {
          return <CardAsignature name={elem.nombre}/>;
        })}
      </div>
    </div>
  );
};

export default Classroom;
