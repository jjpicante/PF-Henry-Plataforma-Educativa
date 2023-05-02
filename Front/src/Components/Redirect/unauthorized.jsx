import React from "react";
import { useEffect } from "react";
import "./Unauthorized.css";
import robotImage from "./BrokenRobot.png";

const Unauthorized = () => {
  useEffect(() => {
    const timeout = setTimeout(() => {
      // 👇️ redirects to an external URL
      window.location.replace("/home");
    }, 3000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="unauthorized-container">
      <img
        src={robotImage}
        alt="Unauthorized robot"
        className="unauthorized-image"
      />
      <h2 className="unauthorized-title">
        Oops... No estás autorizado para ingresar aquí
      </h2>
    </div>
  );
};

export default Unauthorized;
