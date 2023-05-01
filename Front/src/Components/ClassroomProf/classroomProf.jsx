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
      <CardAsignature
      name= "matematica"
      year= "1ro"
      />

      </div>
     
    </div>
  );
};

export default ClassroomProf;
