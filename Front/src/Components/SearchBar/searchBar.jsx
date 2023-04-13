// import React, { useState } from 'react';
// import { materias } from '../../Redux/Base de datos HC'; // importa tu array de materias

// function SearchBar() {

//   const [subject, setSubject] = useState('');
//   const materiasFiltradas = materias.filter(materia =>
//     materia.nombre.toLowerCase().includes(subject.toLowerCase())
//   );

//   const handleChange = event => {
//     setSubject(event.target.value);
//   };

//   return (
//     <div>
//       <input type="text" placeholder="Buscar materia" value={subject} onChange={handleChange} />
//       {materiasFiltradas.length === 0 ? "No se encontraron matrias" : materiasFiltradas.map(materia => (
//         <div key={materia.id}>
//           <h2>{materia.nombre}</h2>
//         </div>
//       ))}
//     </div>
//   );
// }

// export default SearchBar;

import React from 'react';

function SearchBar({ value, onChange }) {

  return (
    <div>
      <input type="text" placeholder="Buscar materia" value={value} onChange={onChange} />
    </div>
  );
}

export default SearchBar;


