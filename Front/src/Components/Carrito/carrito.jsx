import Navbar from "../NavBar/navBar";
import { useState } from "react";
import styles from "./Carrito.module.css";

const Carrito = () => {
  const meses = [
    { nombre: "Febrero", precio: 1200 },
    { nombre: "Marzo", precio: 1200 },
    { nombre: "Abril", precio: 1200 },
    { nombre: "Mayo", precio: 1200 },
    { nombre: "Junio", precio: 1200 },
    { nombre: "Julio", precio: 1200 },
    { nombre: "Agosto", precio: 1200 },
    { nombre: "Septiembre", precio: 1200 },
    { nombre: "Octubre", precio: 1200 },
    { nombre: "Noviembre", precio: 1200 },
    { nombre: "Diciembre", precio: 1200 },
  ];

  const [cartasSeleccionadas, setCartasSeleccionadas] = useState([]);
  const [totalPagar, setTotalPagar] = useState(0);

  const mesesSeleccionables = meses.map((mes) => ({
    nombre: mes.nombre,
    seleccionado: cartasSeleccionadas.includes(mes.nombre),
    id: `checkbox-${mes.nombre}`,
    precio: mes.precio,
  }));
  
  const handleAgregarCarta = (mes) => {
    const nuevasCartas = mesesSeleccionables.map((mesSeleccionado) =>
      mesSeleccionado.nombre === mes.nombre
        ? { ...mesSeleccionado, seleccionado: !mesSeleccionado.seleccionado }
        : mesSeleccionado
    );
    setCartasSeleccionadas(
      nuevasCartas
        .filter((mesSeleccionado) => mesSeleccionado.seleccionado)
        .map((mesSeleccionado) => mesSeleccionado.nombre)
    );
    setTotalPagar(totalPagar + (mes.seleccionado ? -mes.precio : mes.precio));
  };

  return (
    <>
      <Navbar />
      <div className={styles.carrito}>
        <h2>Mensualidades</h2>
        <div className={styles.container}>
        <div>
          <ul className={styles.cartas}>
            <p className={styles.selecc}>Selecciona los meses a pagar</p>
            {mesesSeleccionables.map((mes) => (
              <li className={styles.carta} key={mes.nombre}>
                <label htmlFor={mes.id}>
                  {mes.nombre} - ${mes.precio}
                  <input
                    className={styles.checkbox}
                    type="checkbox"
                    id={mes.id}
                    checked={mes.seleccionado}
                    onChange={() => handleAgregarCarta(mes)}
                  />
                </label>
              </li>
            ))}
          </ul>
        </div>
        <div className={styles.detallePago}>
              <h1>Total</h1>
              <div className={styles.containerMesesTotal}>{cartasSeleccionadas?.map((carta, i) => (
                <p className={styles.palabraTotal}key={i}>{carta}</p>
              ))}</div>
              <h3 className={styles.total}>Monto total: ${totalPagar}</h3>
              <button className={styles.botonPago}>Ir al pago</button>
        </div>

        </div>
      </div>
    </>
  );
};

export default Carrito;
