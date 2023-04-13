import React, {useState} from "react";
import {useDispatch} from "react-redux";
import style from "./SearchBar.module.css"

const SearchBar = () => {

const dispatch = useDispatch()
const [subject, setsubject] = useState("")

const handleChangeSubject = (event) => {

    setsubject(event.target.value);
}

const handleSubmitSubject = (event) => {
    event.preventDefault()
    dispatch()
}

return(
    <div className={style.SearchBar}>
        <input type="search" value={subject} onChange={handleChangeSubject} className={style.input} placeholder="Buscar Asignatura"></input>
        <button className={style.button}>Buscar</button>
    </div>
)


}

export default SearchBar;