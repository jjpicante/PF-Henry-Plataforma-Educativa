import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMateriasByName, getMaterias } from "../../Redux/actions";
import style from "./SearchBar.module.css";

function SearchBar() {
  const userData = useSelector((state) => state.userData);
  console.log(userData.anio);

  const dispatch = useDispatch();
  const [name, setName] = useState("");

  const handleChange = (event) => {
    setName(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!name) {
      console.log("no");
    } else {
      dispatch(getMateriasByName(name, userData.anio));
    }
  };

  const handleInput = (event) => {
    if (event.target.value === "") {
      dispatch(getMaterias());
    }
  };

  return (
    <div>
      <input
        className={style.input}
        type="search"
        placeholder="Buscar materia"
        value={name}
        onChange={handleChange}
        onInput={handleInput}
      />
      <button
        onClick={(event) => {
          handleSubmit(event);
        }}
      >
        Buscar
      </button>
    </div>
  );
}

export default SearchBar;
