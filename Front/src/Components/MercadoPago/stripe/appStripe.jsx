import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { SpinnerCircular } from "spinners-react";
import axios from "axios";

const stripePromise = loadStripe(
  "pk_test_51MyKKFEMrSvIo5TelOcFEibdaZGoqsotLAFMfxk0OKMH5LbzMT4f432EWC6FSzkFTQaG3OgHg6ab3mawUDAJY4jQ00w05gfSKy"
);
const CheckautForm = () => {
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
          amount: 10000,
        });
        console.log(response.data);

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
        <div className="spinner-wrapper">
          <SpinnerCircular сolor="#009EE3" />
        </div>
      );
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <CardElement></CardElement>
      {renderSpinner()}
      <button disabled={stripe ? false : true}>Pagar</button>
    </form>
  );
};

const AppStripe = () => {
  return (
    <Elements stripe={stripePromise}>
      <CheckautForm></CheckautForm>
    </Elements>
  );
};

export default AppStripe;
