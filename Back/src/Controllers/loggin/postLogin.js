const { auth, googleProvider } = require('../../config/firebase');
const { signInWithEmailAndPassword, signInWithPopup, signOut } = require("firebase/auth");
const { Alumnos } = require("../../db");

const postLogin = async (email,password) => {
  try {
  // Check if user exists in database
  const user = await Alumnos.findOne({ where: { email: email } });
  if (!user) {
    throw new Error("User not found");
  }
  await signInWithEmailAndPassword(auth, email, password);

  return { success: true };
  } catch (error) {
    return { error: "Algo Fallo. Contacte con un administrador" };
  }
};


const loginGoogle = async (Idcliente) => {
  try {
    //obtener datos del usuario por idcliente y devolverlos
  } catch (error) {
    return { error: "Algo Fallo. Contacte con un administrador" }
  }
}

const logOut = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    return { error: "Algo Fallo. Contacte con un administrador" }
  }
}

module.exports = { postLogin, loginGoogle, logOut };
