require("dotenv").config();
const { Router } = require("express");
const mercadopago = require("mercadopago");
const { paymentStripe } = require("../../Controllers/Stripe/stripe");

const PaymentController = require("../../Controllers/MercadoPago/PaymentController");
const PaymentService = require("../../Service/PaymentService");
const PaymentInstance = new PaymentController(new PaymentService());

const pasarela = Router();

const stripe = require("stripe")(
  "sk_test_51MyKKFEMrSvIo5TexTU8smE4X4cfznLhdNu7uJnsjqL191b60tHyHMgWjxA8B8I88qgCQEb08sspLJfhWD5FmpUu00RSlxQeQT"
);
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

//MercadoPago
pasarela.post("/Pagar", function (req, res, next) {
  PaymentInstance.getSubscriptionLink(req, res);
});

pasarela.get("/feedback/:id", function (req, res) {
  const { id } = req.params;
  mercadopago.payment
    .get(id)
    .then(function (payment) {
      console.log(payment);
    })
    .catch(function (error) {
      console.log(error);
    });
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
