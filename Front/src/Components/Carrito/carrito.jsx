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

  const meses = Object.keys(estadoDeCuenta).slice(2);
  const precio = 1200;
  console.log(estadoDeCuenta);

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
        <h2>Mensualidades</h2>
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
