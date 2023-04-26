import React from "react";
import { useEffect } from "react";

const Unauthorized = () => {
  useEffect(() => {
    const timeout = setTimeout(() => {
      // 👇️ redirects to an external URL
      window.location.replace("/home");
    }, 3000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <h1>
      Estas intentado ingresar a una ruta a la cual no estas autorizado, seras
      redirreccionado al home en 3 segundos...
    </h1>
  );
};

export default Unauthorized;
