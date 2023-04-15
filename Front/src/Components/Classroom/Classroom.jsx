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
// import CardAsignature from "../Cards/cards";
import { useState } from "react";
import Paginate from "../Paginado/paginado";

const Classroom = () => {
  const dispatch = useDispatch();
  const asignatures = useSelector((state) => state.materias);
  const [query, setQuery] = useState("");

  useEffect(() => {
    dispatch(getMaterias());
  }, [dispatch]);

  const handleChange = (event) => {
    setQuery(event.target.value);
  };

  const materiasFiltradas = asignatures.filter((materia) =>
    materia.nombre.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className={style.fondo}>
      {/* Iconos */}
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
      ></link>

      <Navbar></Navbar>

      <div className={style.topDiv}>
        <SearchBar value={query} onChange={handleChange}></SearchBar>

        {/* Boton agregativo */}
        <Link to="/formSubject">
          <button
            type="submit"
            className={style.agregarBoton}
            title="Add subject"
          >
            <i className="fa fa-plus"></i>
          </button>
        </Link>
      </div>

      <Paginate itemsPerPage={2} data={materiasFiltradas} />
    </div>
  );
};

export default Classroom;
