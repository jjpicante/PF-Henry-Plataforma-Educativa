import React, { useState } from "react";
import styles from "./MercadoPagoButton.module.css";
import axios from "axios";
import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";

initMercadoPago("TEST-3c99da26-96ee-4715-9784-826a780f3f38");

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
    console.log(response.data.response);
    console.log(response.data);
    const pagar = response.data.response.init_point;
    window.open(pagar);

  };
  return (
    <div className={styles.mpBtnContainer}>
      <button className={styles.mpBtn} onClick={(ev) => onsubmit(ev)}>
        Pagar con MercadoPago
      </button>
      <img
        src="https://logotipoz.com/wp-content/uploads/2021/10/version-horizontal-large-logo-mercado-pago.webp"
        alt="Logo de MercadoPago"
        className={styles.mpLogo}
      />
    </div>
  );
};

export default ProductDisplayer;

/*return(
  <div>
    <button onClick={(ev)=> onsubmit(ev)}>PAGAR!</button>
  </div>
); */
