const checkpayment = (body) => {
  //todo puede que haya error a la hora de vincular mercado pago con las notificaciones, y no se pueda modularizar, pero no es seguro
  try {
    if (body.payment === "payment") return { aprob: "El pago se realizo con exito" };
    return {
      error: "El pago no fue realizado, en caso de que sea un error, contacte con administracion",
    };
  } catch (error) {
    console.log(error);
    return {
      error:
        "No se pudo comprobar correctamente el pago, Si el pago fue realizado, por favor contacte con administracion",
    };
  }
};

module.exports = { checkpayment };
