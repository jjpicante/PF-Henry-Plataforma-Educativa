//Regex
const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
const emailRegex = /\S+@\S+\.\S+/;
const numbers = /\d/;

const validate = (inputs) => {
  let errors = {};

  //Nombre
  if (numbers.test(inputs.name)) errors.name = "El nombre no puede incluir numeros";
  if (inputs.name.length < 3) errors.name = "El nombre debe contener al menos de 3 caracteres";
  if (inputs.name.length > 35) errors.name = "El nombre no puede contener mas de 35 caracteres";
  if (specialChars.test(inputs.name))
    errors.name = "El nombre no puede tener caracteres especiales";

  //Apellido
  if (numbers.test(inputs.apellido)) errors.apellido = "El apellido no puede incluir numeros";
  if (inputs.apellido.length < 3)
    errors.apellido = "El apellido debe contener al menos de 3 caracteres";
  if (inputs.apellido.length > 35)
    errors.apellido = "El apellido no puede contener mas de 35 caracteres";
  if (specialChars.test(inputs.apellido))
    errors.apellido = "El apellido no puede tener caracteres especiales";

  //Año-Materia
  if (
    inputs.materia1 === "materia" &&
    inputs.materia2 === "materia" &&
    inputs.materia3 === "materia"
  )
    errors.anio3 = "Debe elegirse al menos un par año-materia";

  return errors;
};

module.exports = {
  validate,
};
