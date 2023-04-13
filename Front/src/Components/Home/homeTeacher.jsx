import Navbar from "../NavBar/navBar";
import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const HomeTeacher = () => {

    const [date, setDate] = useState(new Date());

    const onChange = date => {
        setDate(date);
    }

    return (

        <div>

        <div><Navbar></Navbar></div>

        <div>
            <h1>Calendario</h1>
            <Calendar
                onChange={onChange}
                value={date}
            />

        </div>

        </div>
    )
}


export default HomeTeacher;