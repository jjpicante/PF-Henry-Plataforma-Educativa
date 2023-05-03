const { Op } = require("sequelize");
const { Admin } = require("../../db");
const { auth } = require("../../config/firebase");
const { createUserWithEmailAndPassword } = require("firebase/auth");
const { createUserDocument } = require("../Firebase/createUser");

const postAdmin = async (name, pais, username, email, password) => {
  try {
    console.log(name, pais, username, email, password);
    if (
      await Admin.findOne({
        where: { email: email },
      })
    )
      return {
        error: `No se pudo completar la carga. Ya existe el email ${email}`,
      };
    if (
      name === null &&
      pais === null &&
      username === null &&
      email === null &&
      password === null
    ) {
      return { error: "Te faltaron datos a completar!" };
    }
    const newAdmin = {
      name: name.toLowerCase(),
      pais: pais.toLowerCase(),
      username: username.toLowerCase(),
      email: email.toLowerCase(),
      password: password.toLowerCase(),
    };

    // Create a user in Firebase Authentication
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    console.log("User created in Firebase Authentication:", user.uid);

    // Create a user document in Firestore to store additional user details
    const role = "admin"; // Set the user's role to "admin"
    await createUserDocument(user, name, role, email);

    // Associate the new user with the created `Alumnos` record
    const admindb = await Admin.create(newAdmin);

    return { message: "Admin creado con exito" };
  } catch (error) {
    console.log(error);
    if (error.code === "/email-already-in-use") {
      return { error: "El email ya está en uso. Por favor, seleccione otro." };
    } else if (error.code === "/weak-password") {
      return {
        error: "La contraseña es demasiado débil. Por favor, elija una contraseña más segura.",
      };
    } else {
      return { error: "No se pudo agregar el Admin solicitado" };
    }
  }
};

module.exports = { postAdmin };
