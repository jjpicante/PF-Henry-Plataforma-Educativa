import React, { useState } from "react";
import axios from "axios";
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react'

 initMercadoPago('TEST-03d431fb-a546-41fd-b409-9f0a04a7440b');

const ProductDisplayer = ({ mesesTotal, totalPagar, estadoDeCuenta }) => {
  const [id, setid] = useState("");
  const onsubmit = async (ev) => {
    ev.preventDefault();
    const response = await axios.post("http://localhost:3001/Pagar", {
      description: mesesTotal,
      price: totalPagar,
      name: estadoDeCuenta.name,
      email: estadoDeCuenta.email,
      surname: estadoDeCuenta.apellido,
      username: estadoDeCuenta.username,
    });
    console.log(response.data);
    const pagar = response.data.body.init_point;
    window.open(pagar)

  };
  return(
    <div>
      <button onClick={(ev)=> onsubmit(ev)}>PAGAR!</button>
    </div>
  );
    };
    
    



export default ProductDisplayer;


/*return(
  <div>
    <button onClick={(ev)=> onsubmit(ev)}>PAGAR!</button>
  </div>
); */