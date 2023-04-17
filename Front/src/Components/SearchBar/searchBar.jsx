 import React, { useState } from 'react';
 import { useDispatch } from 'react-redux';
 import { getMateriasByName, getMaterias } from '../../Redux/actions';


 function SearchBar() {


   const dispatch = useDispatch()
   const [name, setName] = useState("")



   const handleChange = event => {
     setName(event.target.value);

   };


   const handleSubmit = (event) => {
     event.preventDefault()
    dispatch(getMateriasByName(name))
   }

   const handleInput = (event) => {
     if (event.target.value === '') {
       dispatch(getMaterias());
     }
   }

   return (
     <div>
       <input type="search" placeholder="Buscar materia" value={name} onChange={handleChange} onInput={handleInput}/>
       <button onClick={(event) => { handleSubmit(event) }}>Buscar</button>
     </div>
   );
 }

 export default SearchBar;



