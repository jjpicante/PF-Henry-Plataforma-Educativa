const { auth, googleProvider } = require('../../config/firebase')
import { signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth"

const postLogin = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password)
  } catch (error) {
    console.log(error);
    return { error: "Algo Fallo. Contacte con un administrador" };
  }
};

const loginGoogle = async () => {
  try {
    await signInWithPopup(auth, googleProvider)
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
