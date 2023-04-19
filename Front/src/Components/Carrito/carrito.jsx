import Navbar from "../NavBar/navBar";
import { useState, useEffect } from "react";
import styles from "./Carrito.module.css";
import axios from "axios";
const URL = "http://localhost:3001/Meses?username=juanperez";

const Carrito = () => {
  const storagedCartas = JSON.parse(localStorage.getItem("mes") || "[]");
  const storagedTotal = JSON.parse(localStorage.getItem("total") || 0);

  const [mesesTotal, setmesesTotal] = useState(storagedCartas);
  const [totalPagar, setTotalPagar] = useState(storagedTotal);
  const [estadoDeCuenta, setestadoDeCuenta] = useState({});

  const meses = Object.keys(estadoDeCuenta).slice(5);
  console.log(meses);
  const precio = 1200;

  useEffect(() => {
    localStorage.setItem("mes", JSON.stringify(mesesTotal));
    localStorage.setItem("total", JSON.stringify(totalPagar));
  }, [mesesTotal, totalPagar]);

  useEffect(() => {
    const axiosData = async () => {
      try {
        const response = await axios.get(URL);
        setestadoDeCuenta(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    axiosData();
  }, []);

  const mesesTotalSeleccionables = meses.map((mes) => ({
    nombre: mes,
    seleccionado: mesesTotal.includes(mes),
    id: `checkbox-${mes}`,
    precio: precio,
  }));

  const handleAgregarCarta = (mes) => {
    const nuevasCartas = mesesTotalSeleccionables.map((mesSeleccionado) =>
      mesSeleccionado.nombre === mes.nombre
        ? { ...mesSeleccionado, seleccionado: !mesSeleccionado.seleccionado }
        : mesSeleccionado
    );
    setmesesTotal(
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
        <div className={styles.header}>
          <h2>Mensualidades</h2>
          {/* Icono carrito */}
          <section className={styles.carroPrecio}>
            <h3>${totalPagar}</h3>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-cart4"
              viewBox="0 0 16 16"
            >
              <path d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5zM3.14 5l.5 2H5V5H3.14zM6 5v2h2V5H6zm3 0v2h2V5H9zm3 0v2h1.36l.5-2H12zm1.11 3H12v2h.61l.5-2zM11 8H9v2h2V8zM8 8H6v2h2V8zM5 8H3.89l.5 2H5V8zm0 5a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0zm9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0z" />
            </svg>
          </section>
        </div>
        <div className={styles.container}>
          <div>
            <ul className={styles.cartas}>
              <p className={styles.selecc}>Selecciona los meses a pagar</p>
              {mesesTotalSeleccionables.map((mes) => (
                <li className={styles.carta} key={mes.nombre}>
                  {estadoDeCuenta[mes.nombre] === false ? (
                    <label className={styles.palabra} htmlFor={mes.id}>
                      {mes.nombre} - ${mes.precio}
                      <input
                        className={styles.checkbox}
                        type="checkbox"
                        id={mes.id}
                        checked={mes.seleccionado}
                        onChange={() => handleAgregarCarta(mes)}
                      />
                    </label>
                  ) : (
                    <label className={styles.palabraPagado} htmlFor={mes.id}>
                      {mes.nombre} - ${mes.precio}
                    </label>
                  )}
                </li>
              ))}
            </ul>
          </div>
          <div className={styles.detallePago}>
            <h1>Total</h1>
            <div className={styles.containerMesesTotal}>
              {mesesTotal?.map((carta, i) => (
                <p className={styles.palabraTotal} key={i}>
                  {carta}
                </p>
              ))}
            </div>
            <h3 className={styles.total}>Monto total: ${totalPagar}</h3>
            <button className={styles.botonPago}>Ir al pago</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Carrito;
