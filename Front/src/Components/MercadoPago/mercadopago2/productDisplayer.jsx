import React from "react";
import styles from "./MercadoPagoButton.module.css";
import axios from "axios";
import { initMercadoPago } from "@mercadopago/sdk-react";
import Swal from "sweetalert2";

initMercadoPago("TEST-3c99da26-96ee-4715-9784-826a780f3f38");

const ProductDisplayer = ({ mesesTotal, totalPagar, estadoDeCuenta }) => {
  /* const storagedUsername =  */ JSON.parse(localStorage.getItem("username") || "[]");
  const pagado = {};

  for (let mes of mesesTotal) {
    pagado[mes] = true;
  }

  //const [id, setid] = useState("");
  const onsubmit = async (ev) => {
    ev.preventDefault();
    try {
      const response = await axios.post("/Pagar", {
        description: mesesTotal,
        price: totalPagar,
        name: estadoDeCuenta.name,
        email: estadoDeCuenta.email,
        surname: estadoDeCuenta.apellido,
        username: estadoDeCuenta.username,
      });
      const pagar = response.data.response.init_point;
      window.open(pagar);
      /* Caso cuando deployemos:
    objeto vacio, solo se le debe llamar
      const checkPayment = await axios.post("url/Notificaciones" {})
      if(checkPayment.aprob){
         const respuesta = await axios.put(`http://localhost:3001/Meses/${storagedUsername}`, pagado)   
          if (respuesta) {
            window.alert(checkPayment.aprob);
            window.location.href = "http://localhost:3000/carrito";
          }else window.alert(respuesta.error)
      }else return window.alert(checkPayment.error)

       window.localStorage.removeItem("mes");
        window.localStorage.removeItem("total");  
    */
    } catch (error) {
      console.log(error);
      window.localStorage.removeItem("mes");
      window.localStorage.removeItem("total");
      Swal.fire({
        text: error.data.message,
        icon: "warning",
      });
      window.location.href = "http://localhost:3000/carrito";
    }
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
