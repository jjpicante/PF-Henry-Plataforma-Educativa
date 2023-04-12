import Navbar from "../NavBar/navBar";
import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import style from "./home.module.css"

const HomeStudent = () => {

    const [date, setDate] = useState(new Date());

    const onChange = date => {
        setDate(date);
    }

    return (

        <div>

            <div><Navbar></Navbar></div>

            <div className={style.title}>
                <h1>¡Bienvenido/a a tu curso virtual XXX!</h1>
            </div>

            <div className={style.p}><p>Calendario</p></div>

            <div className={style.calendar}>

                <Calendar
                    onChange={onChange}
                    value={date}
                />

            </div>

        </div>
    )
}


export default HomeStudent;