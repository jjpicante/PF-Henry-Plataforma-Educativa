//Regex
const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
const emailRegex = /\S+@\S+\.\S+/;
const numbers = /\d/;

const validate = (inputs) => {
  let errors = {};

  //Name
  if (!inputs.name) {
  } else {
    if (numbers.test(inputs.name))
      errors.name = "The name must not include numbers!";
    if (inputs.name.length > 35)
      errors.name = "The length of the name must be less than 35 characters";
    if (specialChars.test(inputs.name))
      errors.name = "The name cannot have special characters!";
  }

  //Last name
  if (!inputs.apellido) {
  } else {
    if (numbers.test(inputs.apellido))
      errors.apellido = "The last name must not include numbers!";
    if (inputs.apellido.length > 35)
      errors.apellido =
        "The length of the last name must be less than 35 characters";
    if (specialChars.test(inputs.apellido))
      errors.apellido = "The last name cannot have special characters!";
  }

  //Email
  if (!inputs.email) {
  } else {
    if (!emailRegex.test(inputs.email))
      errors.email = "The email you entered is incorrect";
    if (inputs.email.length > 35)
      errors.email = "The email exceeded the 35 available characters";
  }

  //datebirth
  /* if (!inputs.datebirth) {
  } else {
    if (inputs.datebirth <= 0) errors.datebirth = "The datebirth has to be above 0";
    if (/\D/.test(inputs.datebirth))
      errors.datebirth = "Please only enter numeric characters for the datebirth!";
  } */

  //Subject
  if (!inputs.subjectName) {
  } else {
    if (specialChars.test(inputs.subjectName))
      errors.subjectName = "The subject cannot have special characters!";
  }

  return errors;
};

const validateSubmit = (student, error) => {
  for (const property in student) {
    if (!student[property]) return false;
  }

  for (const property in error) {
    if (!error[property]) return false;
  }

  return true;
};

module.exports = {
  validate,
  validateSubmit,
};
