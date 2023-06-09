require("dotenv").config();
const Stripe = require("stripe");

const stripe = new Stripe(process.env.STRIPE_ACCES_TOKEN);

const paymentStripe = async (id, amount, description) => {
  const meses = description.join(", ");
  try {
    const payment = await stripe.paymentIntents.create({
      amount,
      currency: "USD",
      description: meses,
      payment_method: id,
      confirm: true,
    });
    if (payment) return payment;
    return { error: "Hubo un error en el pago, Por favor contacte con la administracion" };
  } catch (error) {
    // console.log(error); en caso de haber un error, no reconocido por stripe, o relacionado a error del propio codigo, decomentar esta linea, TAL VEZ ayuda un poco
    return { error: error.raw.message };
  }
};

module.exports = { paymentStripe };
