const mercadopago = require("mercadopago");
require("dotenv").config();
mercadopago.configure({
  access_token: process.env.ACCESS_TOKEN,
});

class PaymentService {
  async createSubscription(req) {
    const meses = req.body.description.join(", ");
    let preference = {
      items: [
        {
          title: meses,
          id: meses,
          quantity: req.body.description.length,
          unit_price: req.body.price,
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
        success: "https://servidor-plataformae2.onrender.com/feedback",
        failure: "https://servidor-plataformae2.onrender.com/feedback",
        pending: "https://servidor-plataformae2.onrender.com/feedback",
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
