require("dotenv").config();
const { MERCADOPAGO_ACCESTOKEN } = process.env;
const mercadopago = require("mercadopago");

mercadopago.configure({
  access_token: MERCADOPAGO_ACCESTOKEN,
});

module.exports = {
  mercadopago,
};
