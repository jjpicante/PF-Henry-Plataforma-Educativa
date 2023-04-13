const validate = (inputs) => {
  let errors = {};
  console.log(inputs);

  //Name
  if (!inputs.name) {
  } else {
    if (/\d/.test(inputs.name))
      errors.name = "The name must not include numbers!";
    if (inputs.name.length > 35)
      errors.name = "The length of the name must be less than 35 characters";
  }

  //Last name
  if (!inputs.lastname) {
  } else {
    if (/\d/.test(inputs.lastname))
      errors.lastname = "The last name must not include numbers!";
    if (inputs.lastname.length > 35)
      errors.lastname =
        "The length of the last name must be less than 35 characters";
  }

  //Email
  if (!inputs.email) {
  } else {
    if (!/\S+@\S+\.\S+/.test(inputs.email))
      errors.email = "The email you entered is incorrect";
    if (inputs.email.length > 35)
      errors.email = "The email exceeded the 35 available characters";
  }

  //Age
  if (!inputs.age) {
  } else {
    if (inputs.age <= 0) errors.age = "The age has to be above 0";
    if (/\D/.test(inputs.age))
      errors.age = "Please only enter numeric characters for the age!";
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
