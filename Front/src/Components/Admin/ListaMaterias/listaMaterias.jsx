import React, { useEffect /* , useState  */, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteMateria, getMateriasAdmin } from "../../../Redux/actions";
import style from "./ListaMaterias.module.css";
import NavBarAdmin from "../navbarAdMIN/NavBar";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { DELETE_MATERIAS } from "../../../Redux/actionsTypes";
import PaginateAdmin from "./React-paginate/Paginate";

const ListaMaterias = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const materias = useSelector((state) => state.materiasAdmin);
  const pageCount1 = useSelector((state) => state.pageCount);

  console.log(pageCount1);
  const borrarmateria = async (e) => {
    const id = e.target.value;
    const responese = await dispatch(deleteMateria(id));
    console.log(responese);
    if (responese.type === DELETE_MATERIAS) {
      Swal.fire({
        text: responese.payload.message,
        icon: "success",
        didDestroy: navigate(0),
      });
    } else {
      Swal.fire({
        text: responese.payload.response.data.error,
        icon: "error",
      });
    }
  };

  return (
    <>
      <div>
        <NavBarAdmin />
      </div>
      <div className={style.container}>
        <h1 className={style.title}>Materias creadas:</h1>

        <PaginateAdmin data={materias} pageCount1={pageCount1} itemsPerPage={7} />
        {/* {materias.length !== 0
          ? materias?.map((e) => {
              return (
                <div className={style.containerAlumnos}>
                  <nav className={style.navbar}>
                    <div className={style.navbarContainer}>
                      <ul className={style.navList}>
                        <li className={`${style.navItem} ${style.dropdown}`}>
                          <div className={` ${style.customBtn} ${style.vertical}`}>...</div>
                          <ul className={style.dropdownContent}>
                            <li>
                              <button
                                value={e.id}
                                onClick={borrarmateria}
                                className={style.navLink}
                              >
                                Delete
                              </button>
                            </li>

                            <li>
                              <Link to={`/EditarMateria/${e.id}`}>
                                <button value={e.id} className={style.navLink}>
                                  Editar
                                </button>
                              </Link>
                            </li>
                          </ul>
                        </li>
                      </ul>
                    </div>
                  </nav>
                  <div key={e.id} className={style.materia}>
                    <h2>{e.anio}</h2>
                    <h2>{e.namemateria}</h2>
                    <ul>
                      {e.temas?.map((e, index) => {
                        return (
                          <>
                            <li>{e}</li>
                          </>
                        );
                      })}
                    </ul>
                  </div>
                </div>
              );
            })
          : "Loading"} */}
      </div>
    </>
  );
};

export default ListaMaterias;
