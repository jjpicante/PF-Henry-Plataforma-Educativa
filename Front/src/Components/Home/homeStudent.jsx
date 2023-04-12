import Navbar from "../NavBar/navBar";
import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const HomeStudent = () => {


    const [date, setDate] = useState(new Date());

    const onChange = date => {
        setDate(date);
    }

        return (

            <div>


              
                    <h1>Calendario</h1>
                     <Calendar
                        onChange={onChange}
                        value={date}
                    />
                

            </div>

        )
    }


export default HomeStudent;