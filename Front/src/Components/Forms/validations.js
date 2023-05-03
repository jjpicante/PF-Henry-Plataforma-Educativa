//Regex
const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
const emailRegex = /\S+@\S+\.\S+/;
const numbers = /\d/;

const validate = (inputs) => {
  console.log(inputs, "validate");

  let errors = {};

  //error materias
  if (!inputs.namemateria) {
  } else {
    if (inputs.namemateria.length === 0) errors.namemateria = "El nombre no puede estar vacio";
    if (numbers.test(inputs.namemateria)) errors.namemateria = "El nombre no puede incluir numeros";
    if (inputs.namemateria.length > 35)
      errors.namemateria = "El nombre no puede contener mas de 35 caracteres";
    if (specialChars.test(inputs.namemateria))
      errors.namemateria = "El nombre no puede tener caracteres especiales";
  }

  //Nombre
  if (!inputs.name) {
  } else {
    if (numbers.test(inputs.name)) errors.name = "El nombre no puede incluir numeros";
    if (inputs.name.length > 35) errors.name = "El nombre no puede contener mas de 35 caracteres";
    if (specialChars.test(inputs.name))
      errors.name = "El nombre no puede tener caracteres especiales";
  }

  //Apellido
  if (!inputs.apellido) {
  } else {
    if (numbers.test(inputs.apellido)) errors.apellido = "El apellido no puede incluir numeros";
    if (inputs.apellido.length > 35)
      errors.apellido = "El apellido no puede contener mas de 35 caracteres";
    if (specialChars.test(inputs.apellido))
      errors.apellido = "El apellido no puede tener caracteres especiales";
  }

  //Email
  if (!inputs.email) {
  } else {
    if (!emailRegex.test(inputs.email)) errors.email = "El email introducido es incorrecto";
  }

  //Año-Materia
  if (
    inputs.materia1 === "materia" &&
    inputs.materia2 === "materia" &&
    inputs.materia3 === "materia"
  )
    errors.anio3 = "Debe elegirse al menos un par año-materia";

  return errors;
};

const validateSubmit = (input, asd) => {
  console.log(input, asd);

  let errors = {};
  if (!input.namemateria) {
    if (input.namemateria.length === 0) errors.namemateria = "El nombre no puede estar vacio";
  } else {
    if (numbers.test(input.namemateria)) errors.namemateria = "El nombre no puede incluir numeros";
    if (input.namemateria.length > 35)
      errors.namemateria = "El nombre no puede contener mas de 35 caracteres";
    if (specialChars.test(input.namemateria))
      errors.namemateria = "El nombre no puede tener caracteres especiales";
  }

  return errors;
};

module.exports = {
  validate,
  validateSubmit,
};
