import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getMateriasByAnio } from "../../Redux/actions";
import style from "./Classroom.module.css";
import Navbar from "../NavBar/navBar";
import SearchBar from "../SearchBar/searchBar";
import Paginate from "../Paginado/paginado";

const Classroom = () => {
  const dispatch = useDispatch();
  const asignatures = useSelector((state) => state.materias);
  const pageCount1 = useSelector((state) => state.pageCount);

  const [pageNumber, setPageNumber] = useState(0);
  const userData = useSelector((state) => state.userData);
  const anio = userData?.anio;

  console.log(anio);


  useEffect(() => {
    dispatch(getMateriasByAnio(anio));
  }, [dispatch]);

  return (
    <div className={style.fondo}>
      {console.log("asignatures classroom ---> ", asignatures)}
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
        {/* <NavLink to="/formSubject">
          <button type="submit" className={style.agregarBoton} title="Add subject">
            {<i className="fa fa-plus"></i>}
          </button>
        </NavLink> */}
      </div>
      <Paginate pageCount1={pageCount1} asignatures={asignatures}></Paginate>
    </div>
  );
};

export default Classroom;
