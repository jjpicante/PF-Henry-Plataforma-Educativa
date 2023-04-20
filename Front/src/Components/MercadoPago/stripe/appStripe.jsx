import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { SpinnerCircular } from "spinners-react";
import axios from "axios";
import Navbar from "../../NavBar/navBar";
import styles from "./checkautForm.module.css";

const stripePromise = loadStripe(
  "pk_test_51MyKKFEMrSvIo5TelOcFEibdaZGoqsotLAFMfxk0OKMH5LbzMT4f432EWC6FSzkFTQaG3OgHg6ab3mawUDAJY4jQ00w05gfSKy"
);
const CheckautForm = () => {
  const storagedCartas = JSON.parse(localStorage.getItem("mes") || "[]");
  const storagedTotal = JSON.parse(localStorage.getItem("total") || 0);
  const [isLoading, setIsLoading] = useState(false);
  const stripe = useStripe();
  const element = useElements();

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
        const response = await axios.post("http://localhost:3001/checkout", {
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

        element.getElement(CardElement).clear();
      } catch (error) {
        const err = error.response.data;
        console.log(err);
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
