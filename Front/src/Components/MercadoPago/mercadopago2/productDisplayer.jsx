import React from "react";
import axios from "axios";

const ProductDisplayer = ({ mesesTotal, totalPagar, estadoDeCuenta }) => {
  const onsubmit = async (ev) => {
    ev.preventDefault();
    const response = await axios.post("http://localhost:3001/Pagar", {
      description: mesesTotal.split(", "),
      price: totalPagar,
      name: estadoDeCuenta.name,
      email: estadoDeCuenta.email,
      surname: estadoDeCuenta.apellido,
      username: estadoDeCuenta.username,
    });
    const pagar = response.data.init_point;
    window.location.href = pagar;
  };
  return (
    <div>
      <button onClick={onsubmit}>PAGAR!</button>
    </div>
  );
};

export default ProductDisplayer;

