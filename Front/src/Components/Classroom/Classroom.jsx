// import SearchBar from "../SearchBar/searchBar";
// import CardAsignature from "../Cards/cards";
// import { useDispatch, useSelector } from "react-redux";
// import { useEffect } from "react";
// import { getMaterias } from "../../Redux/actions";
// import style from "./Classroom.module.css"
// import Navbar from "../NavBar/navBar";

// const Classroom = () => {
//   const dispatch = useDispatch();
//   const asignatures = useSelector((state) => state.materias);
//   console.log(asignatures);

//   useEffect(() => {
//     dispatch(getMaterias());
//   }, [dispatch]);

//   return (
//     <div className={style.fondo}>
//       <div>
//         <Navbar></Navbar>
//       </div>
//       <div>
//         <SearchBar></SearchBar>
//       </div>
//       <div className={style.cardsContent}>
//         {asignatures?.map((elem) => {
//           return <CardAsignature name={elem.nombre} />;
//         })}
//       </div>
//     </div>
//   );
// };

// export default Classroom;

import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getMaterias } from "../../Redux/actions";
import style from "./Classroom.module.css";
import Navbar from "../NavBar/navBar";
import SearchBar from "../SearchBar/searchBar";
import CardAsignature from "../Cards/cards";
import { useState } from "react";
import { Link } from "react-router-dom";
import Paginate from "../Paginado/paginado";
import axios from "axios";
import Items from "../Paginado/items";
import ReactPaginate from "react-paginate";

const Classroom = () => {
  const dispatch = useDispatch();
  const asignatures = useSelector((state) => state.materias);
  const [query, setQuery] = useState("");
  const [pageNumber, setPageNumber] = useState(0);
  const [pageCount, setPageCount] = useState(0);
  const [data, setData] = useState([]);

  useEffect(() => {
    async function data() {
      try {
        let response = await axios.get(`http://localhost:3001/Materias?page=${pageNumber}`);
        setData(response.data.materias);
        setPageCount(response.data.pageCount);
        console.log(response.data.pageCount);
      } catch (error) {
        console.log(error);
      }
    }
    data();
  }, [pageNumber, dispatch]);

  const handleChange = (event) => {
    setQuery(event.target.value);
  };

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
        <SearchBar value={query} onChange={handleChange}></SearchBar>

        {/* Boton agregativo */}
        <Link to="/formSubject">
          <button type="submit" className={style.agregarBoton} title="Add subject">
            <i className="fa fa-plus"></i>
          </button>
        </Link>
      </div>
      <ReactPaginate
        previousLabel={"previous"}
        nextLabel={"next"}
        breakLabel={"..."}
        pageCount={pageCount}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={(selectedPage) => setPageNumber(selectedPage.selected)}
        containerClassName={"pagination"}
        activeClassName={"active"}
      ></ReactPaginate>
      <Items currentItems={data}></Items>
    </div>
  );
};

export default Classroom;
