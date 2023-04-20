const mercadopago = require("mercadopago");
require("dotenv").config();
mercadopago.configure({
  access_token: process.env.ACCESS_TOKEN,
});

class PaymentService {
  async createSubscription(req) {
    const url = "https://api.mercadopago.com/preapproval";
    const meses = req.body.description.join(", ");
    console.log(req.body.price * req.body.description.length);
    let preference = {
      items: [
        {
          id: 135363,
          title: meses,
          unit_price: req.body.price,
          quantity: req.body.description.length,
          product_id: "hola",
        },
      ],
      external_reference: meses + req.body.surname + req.body.username,
      payer: {
        name: req.body.name,
        surname: req.body.surname,
        email: req.body.email,
        username: req.body.username,
      },
      back_urls: {
        success: "http://localhost:3001/feedback",
        failure: "http://localhost:3001/feedback",
        pending: "http://localhost:3001/feedback",
      },
      total_amoun: req.body.price * req.body.description.length,
      auto_return: "approved",
    };

    const mp = mercadopago.preferences
      .create(preference)

      .then(function (response) {
        console.log(response);
        return response;
      })
      .catch(function (error) {
        console.log(error);
        return { error: "Error al crear preferencia de pago" };
      });
    return mp;
  }
}

module.exports = PaymentService;
