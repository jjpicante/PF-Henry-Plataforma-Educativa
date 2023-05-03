const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
const emailRegex = /\S+@\S+\.\S+/;

const validate = (inputs) => {
    let errors = {};

    if(!inputs.username) {errors.username = "Debe existir un usuario"}

    if(inputs.username.length < 4) {errors.username = "El nombre de usuario debe tener 4 caracteres o mas"}

    if(inputs.username.length > 20) {errors.username = "El nombre de usuario no puede tener mas de 20 caracteres"}

    if (!emailRegex.test(inputs.email)) {errors.email = "El email introducido es incorrecto";}

    if (inputs.password.length < 6) {errors.password = "La constraseña debe tener mas de 6 caracteres"}

    if (specialChars.test(inputs.username)) {errors.name = "El nombre de usuario no puede tener caracteres especiales"};

    return errors;
}

export default validate