const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
const emailRegex = /\S+@\S+\.\S+/;
const numbers = /\d/;


const validate = (inputs) => {
    let errors = {};

    if (!emailRegex.test(inputs.email)) errors.email = "El email introducido es incorrecto";

    if (inputs.password.length < 6) errors.password = "La constraseña debe tener mas de 6 caracteres"

    if (specialChars.test(inputs.username)) errors.name = "El nombre de usuario no puede tener caracteres especiales";

    return errors;
}

export default validate