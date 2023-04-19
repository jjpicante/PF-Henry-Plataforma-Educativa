const mercadopago = require("mercadopago");
require("dotenv").config();
mercadopago.configure({
  access_token: process.env.ACCESS_TOKEN
});

class PaymentService {
  async createSubscription(req) {
    const url = "https://api.mercadopago.com/preapproval";
    const meses = req.body.description.join(", ")
    let preference = {
      items: [
        {
          title: meses,
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
        success: "http://localhost:3001/feedback",
        failure: "http://localhost:3001/feedback",
        pending: "http://localhost:3001/feedback"
      }
    
  }

   // Crear preferencia de pago en Mercado Pago
  const mp = mercadopago.preferences.create(preference)
  
  .then(function (response) {
    // Enviar ID de preferencia de pago al cliente
    console.log(response);
    return(response);
  })
  .catch(function (error) {
    console.log(error);
    return ({ error: 'Error al crear preferencia de pago' });
  });
  return mp;
};
}
  


module.exports = PaymentService;
