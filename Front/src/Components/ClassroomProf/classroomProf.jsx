import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import style from "./classroomProf.module.css";
import Navbar from "../NavBar/navBar";
import CardAsignature from "../Cards/cards";


const ClassroomProf = () => {
  
  const userData = useSelector((state) => state.userData);
  console.log("userdata =>", userData);

  return (
    <div className={style.fondo}>
      <div>
        <Navbar></Navbar>
      </div>
      <div className={style.topDiv}>
        {userData.materias.map((elem) => 
        <CardAsignature
        id= {elem.id}
        name= {elem.namemateria}
        year= {elem.anio}
        />)}
      

      </div>
     
    </div>
  );
};

export default ClassroomProf;
