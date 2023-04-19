const mercadopago = require("mercadopago");
require("dotenv").config();

class PaymentService {
  async createSubscription(req) {
    const url = "https://api.mercadopago.com/preapproval";

    let preference = {
      items: [
        {
          title: req.body.description,
          unit_price: req.body.price,
          quantity: req.body.description.length
        }
      ],
      payer: {
        name: req.body.name,
        surname: req.body.surname,
        email: req.body.email,
        username: req.body.username,
      },
      back_urls: {
        success: "http://localhost:8080/feedback",
        failure: "http://localhost:8080/feedback",
        pending: "http://localhost:8080/feedback"
      }
    
  }

   // Crear preferencia de pago en Mercado Pago
  mercadopago.preferences.create(preference)
  .then(function (response) {
    // Enviar ID de preferencia de pago al cliente
    console.log(response);
    return({ preferenceId: response.body.id });
  })
  .catch(function (error) {
    console.log(error);
    return ({ error: 'Error al crear preferencia de pago' });
  });
  return preference;
};
}
  


module.exports = PaymentService;
