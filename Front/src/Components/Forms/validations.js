//Regex
const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
const emailRegex = /\S+@\S+\.\S+/;
const numbers = /\d/;

const validate = (inputs) => {
  let errors = {};

  //Nombre
  if (!inputs.name) {
  } else {
    if (numbers.test(inputs.name))
      errors.name = "El nombre no puede incluir numeros";
    if (inputs.name.length > 35)
      errors.name = "El nombre no puede contener mas de 35 caracteres";
    if (specialChars.test(inputs.name))
      errors.name = "El nombre no puede tener caracteres especiales";
  }

  //Apellido
  if (!inputs.apellido) {
  } else {
    if (numbers.test(inputs.apellido))
      errors.apellido = "El apellido no puede incluir numeros";
    if (inputs.apellido.length > 35)
      errors.apellido =
        "El apellido no puede contener mas de 35 caracteres";
    if (specialChars.test(inputs.apellido))
      errors.apellido = "El apellido no puede tener caracteres especiales";
  }

  //Email
  if (!inputs.email) {
  } else {
    if (!emailRegex.test(inputs.email))
      errors.email = "El email introducido es incorrecto";
  }

  return errors;
};

module.exports = {
  validate,
};
