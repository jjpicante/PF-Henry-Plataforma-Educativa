import React, {useState} from "react";
import {useDispatch} from "react-redux";


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
    <div>
        <label>Buscar Asignatura:</label><input type="search" value={subject} onChange={handleChangeSubject}></input>
        <button>Buscar</button>
    </div>
)


}

export default SearchBar;