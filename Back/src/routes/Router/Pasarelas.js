require("dotenv").config();
const { Router } = require("express");
const mercadopago = require("mercadopago");
const { paymentStripe } = require("../../Controllers/Stripe/stripe");
const { checkpayment } = require("../../Controllers/MercadoPago/checkpayment");
const PaymentController = require("../../Controllers/MercadoPago/PaymentController");
const PaymentService = require("../../Service/PaymentService");
const PaymentInstance = new PaymentController(new PaymentService());

const pasarela = Router();

//Recordar tener el stripe token en tu .env
const stripe = require("stripe")(process.env.STRIPE_ACCES_TOKEN);
//Recordar tener el acces token en tu .env
mercadopago.configure({
  access_token: process.env.ACCESS_TOKEN,
});

//Stripe
pasarela.post("/checkout", async (req, res) => {
  const { id, amount, description } = req.body;
  const respuesta = await paymentStripe(id, amount, description);
  if (!respuesta.error) {
    res.status(200).json(respuesta);
  } else {
    res.status(503).json(respuesta.error);
  }
});

//MercadoPago creacion del pago
pasarela.post("/Pagar", function (req, res, next) {
  PaymentInstance.getSubscriptionLink(req, res);
});
//Mercado pago comprobacion de pago realizado
pasarela.post("/Notificacion", (req, res) => {
  console.log(req.body);
  const respuesta = checkpayment(req.body);
  if (!respuesta.error) res.status(200).json(respuesta);
  res.status(503).json(respuesta.error);
});

//esta funcion, no funca y si funca, basicamente a la hora de hacer el pedido funciona, pero cuand
// se tiene que hacer el pedido a la api de mercado pago, esta tira un error, el cual ni puñetera id de cual es
// pasarela.post("/", (req, res) => {
//   let preference = {
//     items: [
//       {
//         id: 123,
//         title: req.body.description,
//         unit_price: Number(req.body.price),
//         quantity: Number(req.body.quantity),
//         amount: Number(req.body.amount),
//         currency_id: "ARS",
//         category_id: "art",
//       },
//     ],
//     back_urls: {
//       success: "http://localhost:3001/feedback",
//       failure: "http://localhost:3001/feedback",
//       pending: "http://localhost:3001/feedback",
//     },
//     auto_return: "approved",
//     binary_mode: true,
//   };

//   mercadopago.preferences
//     .create(preference)
//     .then(function (response) {
//       console.log(response.body.id, "RESPONSE");
//       res.json({
//         id: response.body.id,
//       });
//     })
//     .catch(function (error) {
//       console.log(error);
//     });
// });

module.exports = pasarela;
