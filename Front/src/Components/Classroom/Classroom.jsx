import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getMaterias } from "../../Redux/actions";
import style from "./Classroom.module.css";
import Navbar from "../NavBar/navBar";
import SearchBar from "../SearchBar/searchBar";
import { useState } from "react";
import { Link } from "react-router-dom";
import Paginate from "../Paginado/paginado";

const Classroom = () => {
  const dispatch = useDispatch();
  const asignatures = useSelector((state) => state.materias);
  const pageCount1 = useSelector((state) => state.pageCount);
  const [pageNumber, setPageNumber] = useState(0);

  useEffect(() => {
    dispatch(getMaterias());
  }, [dispatch]);


  return (
    <div className={style.fondo}>
      {/* Iconos */}
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
      ></link>

      <div>
        <Navbar></Navbar>
      </div>
      <div className={style.topDiv}>
        <SearchBar></SearchBar>

        {/* Boton agregativo */}
        <Link to="/formSubject">
          <button type="submit" className={style.agregarBoton} title="Add subject">
            <i className="fa fa-plus"></i>
          </button>
        </Link>
      </div>
      <Paginate pageCount1={pageCount1} asignatures={asignatures}></Paginate>
    </div>
  );
};

export default Classroom;
