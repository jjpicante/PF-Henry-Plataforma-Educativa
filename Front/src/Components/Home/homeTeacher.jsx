// import Navbar from "../NavBar/navBar";
// import React, { useState } from "react";
// import Calendar from "react-calendar";
// import "react-calendar/dist/Calendar.css";


// const HomeTeacher = () => {

//     const [date, setDate] = useState(new Date());

//     const onChange = date => {
//         setDate(date);
//     }

//     return (

//         <div>

//         <div><Navbar></Navbar></div>

//         <div>
//             <h1>Calendario</h1>
//             <Calendar
//                 onChange={onChange}
//                 value={date}
//             />

//         </div>

//         </div>
//     )
// }


// export default HomeTeacher;


 import React, { useState } from "react";
 import Calendar from "react-calendar";
 import "react-calendar/dist/Calendar.css";
 import style from "./home.module.css";
 import Navbar from "../NavBar/navBar";

 const HomeTeacher = () => {
     const [date, setDate] = useState(new Date());
     const [events, setEvents] = useState([]);

     const onChange = date => {
         setDate(date);
     }

     const onSubmit = event => {
         event.preventDefault();
         // Obtener los datos del formulario
         const { title, description } = event.target.elements;
         // Crear un nuevo evento
         const newEvent = {
             date: date,
             title: title.value,
             // description: description.value,
         };
         // Agregar el evento al arreglo de eventos
         setEvents([...events, newEvent]);
         // Limpiar el formulario
         event.target.reset();
     }

     const tileContent = ({ date, view }) => {
         if (view === "month") {
             // Buscar si hay algún evento en esta fecha
             const event = events.find(event => {
                 return event.date.toDateString() === date.toDateString();
             });
             // Si hay un evento, renderizar una marca o etiqueta
             if (event) {
                 return (
                     <div className="event-marker">
                         {event.title}
                     </div>
                 );
             }
         }
     }

     return (

         <div className={style.container} style={{ overflowY: 'scroll' }}>


             <div><Navbar></Navbar></div>

             <div className={style.container2}>

                 <div className={style.title}>
                     <h1>Área Personal</h1>
                 </div>

                 {/* <div className={style.p}><p>Calendario</p></div> */}
                 <div className={style.calendar}>
                     <Calendar
                         onChange={onChange}
                         value={date}
                         tileContent={tileContent}
                         className={style.scale}
                     />
                 </div>
                <form onSubmit={onSubmit} className={style.form}>
                     
                         <input type="text" name="title" required  className={style.input} placeholder="Titulo del Evento"/>
                     
                     {/* <label>
                         Descripción:
                         <textarea name="description" required></textarea>
                     </label>  */}
                     <button type="submit" className={style.button}>Agregar evento</button>
                 </form>
             </div>

         </div>
     );
 }

 export default HomeTeacher;


// import React, { useState } from 'react';
// import FullCalendar from '@fullcalendar/react';
// import dayGridPlugin from '@fullcalendar/daygrid';
// import style from "./home.module.css";
// import Navbar from '../NavBar/navBar';

// const HomeTeacher = () => {
//     const [events, setEvents] = useState([]);

//     const handleEventAdd = (arg) => {
//         setEvents([...events, {
//             title: arg.event.title,
//             start: arg.event.start,
//             end: arg.event.end,
//         }]);
//     };

//     const handleDateSelect = (arg) => {
//         const title = prompt('Enter a title for your event:');
//         if (title) {
//             setEvents([...events, {
//                 title,
//                 start: arg.start,
//                 end: arg.end,
//             }]);
//         }
//     };

//     return (
//         <div className={style.container}> 

// {/* style={{ overflowY: 'auto' }} */}

//             <div><Navbar></Navbar></div>

//             <div className={style.container2}>

//                 <div className={style.title}>
//                     <h1>¡Bienvenido/a a tu curso virtual XXX!</h1>
//                 </div>
//                 <FullCalendar
//                     plugins={[dayGridPlugin]}
//                     events={events}
//                     editable={true}
//                     selectable={true}
//                     select={handleDateSelect}
//                     eventAdd={handleEventAdd}
//                     className={style.scale}
//                 />
//             </div>

//         </div>
//     );
// };

// export default HomeTeacher;




