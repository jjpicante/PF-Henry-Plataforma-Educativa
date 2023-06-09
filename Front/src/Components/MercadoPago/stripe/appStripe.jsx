import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { SpinnerCircular } from "spinners-react";
import axios from "axios";
import Navbar from "../../NavBar/navBar";
import styles from "./checkautForm.module.css";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";

const stripePromise = loadStripe(
  "pk_test_51MyKKFEMrSvIo5TelOcFEibdaZGoqsotLAFMfxk0OKMH5LbzMT4f432EWC6FSzkFTQaG3OgHg6ab3mawUDAJY4jQ00w05gfSKy"
);
const CheckautForm = () => {
  const storagedCartas = JSON.parse(localStorage.getItem("mes") || "[]");
  /* const storagedUsername =  */ JSON.parse(localStorage.getItem("username") || "[]");
  const storagedTotal = JSON.parse(localStorage.getItem("total") || 0);
  const [isLoading, setIsLoading] = useState(false);
  const userData = useSelector((state)=> state.userData)
  const userName = userData.username
  const stripe = useStripe();
  const element = useElements();
  const pagado = {};

  for (let mes of storagedCartas) {
    pagado[mes] = true;
  }

  console.log(pagado);
  const handleSubmit = async (e) => {
    e.preventDefault();

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: element.getElement(CardElement),
    });
    setIsLoading(true);
    if (!error) {
      try {
        const { id } = paymentMethod;
        const response = await axios.post("/checkout", {
          id,
          amount: storagedTotal * 100,
          description: storagedCartas,
        });
        console.log(response.data.client_secret);

        const clientSecret = response.data.client_secret;
        //esta funcion check si esta terminada correctamente devuelve un objeto PaymentIntent
        //y signifca que el pago se realizo, tienen el PatmentIntent.status
        const check = await stripe.retrievePaymentIntent(clientSecret);

        console.log(check);
        if (check.paymentIntent) {
          const respuesta = await axios.put(`/Meses/${userName}`, pagado);
          if (respuesta) {
            Swal.fire({
              text: "Pago realizado con éxito",
              icon: "success",
            });
            window.location.href = "https://pf-henry-plataforma-educativa.vercel.app/carrito";
          }
        } else 
        Swal.fire({
          text: "El pago no se realizó",
          icon: "warning",
        })

        element.getElement(CardElement).clear();
        window.localStorage.removeItem("mes");
        window.localStorage.removeItem("total");
      } catch (error) {
        const err = error.response.data;
        window.localStorage.removeItem("mes");
        window.localStorage.removeItem("total");
        window.alert("El pago no se realizó");
        window.location.href = "https://pf-henry-plataforma-educativa.vercel.app/carrito";
      }
    }
    setIsLoading(false);
  };
  const renderSpinner = () => {
    if (isLoading) {
      return (
        <div className={styles["spinner-wrapper"]}>
          <SpinnerCircular сolor="#009EE3" />
        </div>
      );
    }
  };
  return (
    <form onSubmit={handleSubmit} className={styles["form-container"]}>
      {/* Se puede agregar mas informacion para rellenar */}
      <CardElement className={styles.StripeElement}></CardElement>
      {renderSpinner()}
      <button disabled={stripe ? false : true} className={styles["submit-btn"]}>
        Pagar
      </button>
    </form>
  );
};

const AppStripe = () => {
  return (
    <Elements stripe={stripePromise}>
      <Navbar></Navbar>
      <CheckautForm></CheckautForm>
    </Elements>
  );
};

export default AppStripe;
