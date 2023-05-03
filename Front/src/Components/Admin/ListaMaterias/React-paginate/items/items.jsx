import { Link, useNavigate } from "react-router-dom";
import React, { useEffect /* , useState  */, useState } from "react";
import Swal from "sweetalert2";
import { deleteMateria } from "../../../../../Redux/actions";
import { useDispatch } from "react-redux";
import style from "./ListaMaterias.module.css";
import { DELETE_MATERIAS } from "../../../../../Redux/actionsTypes";

const ItemsAdmin = ({ currentItems }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
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
      <div className={style.cardsContent}>
        {currentItems &&
          currentItems?.map((e, index) => {
            return (
              <div className={style.containerAlumnos} key={e.id}>
                <nav className={style.navbar}>
                  <div className={style.navbarContainer}>
                    <ul className={style.navList}>
                      <li className={`${style.navItem} ${style.dropdown}`}>
                        <div className={` ${style.customBtn} ${style.vertical}`}>...</div>
                        <ul className={style.dropdownContent}>
                          <li>
                            <button value={e.id} onClick={borrarmateria} className={style.navLink}>
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
          })}
      </div>
    </>
  );
};

export default ItemsAdmin;
