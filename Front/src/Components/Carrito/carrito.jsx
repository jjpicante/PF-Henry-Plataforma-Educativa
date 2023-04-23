import Navbar from "../NavBar/navBar";
import { useState, useEffect } from "react";
import styles from "./Carrito.module.css";
import axios from "axios";
import ProductDisplayer from "../MercadoPago/mercadopago2/productDisplayer";
import { Link } from "react-router-dom";
import AppStripe from "../MercadoPago/stripe/appStripe";

const URL = "http://localhost:3001/Meses?username=juanperez";

const Carrito = () => {
  const storagedCartas = JSON.parse(localStorage.getItem("mes") || "[]");
  const storagedTotal = JSON.parse(localStorage.getItem("total") || 0);

  const [mesesTotal, setmesesTotal] = useState(storagedCartas);
  const [totalPagar, setTotalPagar] = useState(storagedTotal);
  const [estadoDeCuenta, setestadoDeCuenta] = useState({});

  const meses = Object.keys(estadoDeCuenta).slice(5);
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
          <h2>Cuotas</h2>
          {/* Icono carrito */}
          <section className={styles.carroPrecio}>
            <h3>${totalPagar}</h3>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-cart4"
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
            <hr />
            <div className={styles.containerPagos}>
              <ProductDisplayer
                className={styles.imgPagos}
                mesesTotal={mesesTotal}
                estadoDeCuenta={estadoDeCuenta}
                totalPagar={precio}
              />
              <div>
                <img
                  className={styles.imgPagos}
                  src="data:image/png;base64,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"
                  alt="Stripe"
                ></img>
                <Link to="/Stripe">
                  <button className={styles["btn-pay"]}>Pagar por Stripe</button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Carrito;
