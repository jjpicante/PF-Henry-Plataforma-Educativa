import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import style from "./home.module.css";
import Navbar from "../NavBar/navBar";

const HomeStudent = () => {
    const [date, setDate] = useState(new Date());
    const [events, setEvents] = useState(JSON.parse(localStorage.getItem('events')) || []);

    const onChange = date => {
        setDate(date);
    }

    const onSubmit = event => {
        event.preventDefault();
        // Obtener los datos del formulario
        const { title } = event.target.elements;
        // Crear un nuevo evento
        const newEvent = {
            date: date,
            title: title.value,
        };
        // Agregar el evento al arreglo de eventos
        setEvents([...events, newEvent]);
        // Limpiar el formulario
        event.target.reset();
    }

    const onDelete = (eventToDelete) => {
        // Filtrar los eventos que no son el evento a eliminar
        const updatedEvents = events.filter((event) => {
          return event !== eventToDelete;
        });
        // Actualizar el arreglo de eventos
        setEvents(updatedEvents);
      };

    const tileContent = ({ date, view }) => {
        if (view === "month") {
            // Buscar si hay algun evento en esta fecha
            const event = events.find(event => {
                // Convertir la fecha del evento y la fecha actual a formato de cadena (string)
                const eventDateStr = new Date(event.date).toDateString();
                const currentDateStr = new Date(date).toDateString();
                // Comparar las cadenas de fecha para determinar si hay un evento en esta fecha
                return eventDateStr === currentDateStr;
            });
            // Si hay un evento, renderizar una marca o etiqueta
            if (event) {
                return (
                    <div className="event-marker">
                        <div>{event.title}</div>
            <button onClick={() => onDelete(event)}>Eliminar</button>
          </div>

                );
            }
        }
    }

    useEffect(() => {
        // Guardar los eventos en el almacenamiento local
        localStorage.setItem("events", JSON.stringify(events));
    }, [events]);

    useEffect(() => {
        // Carga los eventos desde el almacenamiento local al componente a montar
        const storedEvents = JSON.parse(localStorage.getItem("events"));
        if (storedEvents) {
            setEvents(storedEvents);
        }
    }, []);

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

                    <input type="text" name="title" required className={style.input} placeholder="Titulo del Evento" />

                    {/* <label>
                         Descripcion:
                         <textarea name="description" required></textarea>
                     </label>  */}
                    <button type="submit" className={style.button}>Agregar evento</button>
                </form>
            </div>

        </div>
    );
}

export default HomeStudent;