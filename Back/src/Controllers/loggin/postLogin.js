const { auth, googleProvider } = require("../../config/firebase");
const { signInWithEmailAndPassword } = require("firebase/auth");
const { Alumnos, Profesores } = require("../../db");

const postLogin = async (email, password) => {
  try {
    // If user exists in Firestore, authenticate with email and password
    const firestoreUser = await signInWithEmailAndPassword(auth, email, password);

    return firestoreUser;
  } catch (firestoreError) {
    try {
      // If user does not exist in Firestore, check if user exists in the Alumnos table
      const dbUser = await Alumnos.findOne({ where: { email: email } });
      if (!dbUser) {
        return { error: "User not found" };
      }
      if (dbUser.password !== password) {
        return { error: "Invalid Credentials" }
      }
      return dbUser;
    } catch (dbError) {
      try {
        const dbProfesor = await Profesores.findOne({ where: { email: email } });
        if (!dbProfesor) {
          return { error: "User not found" };
        }
        if (dbProfesor.password !== password) {
          return { error: "Invalid Credentials" }
        }
        return dbProfesor;
      } catch (error) {
        // Check if the user is authenticated in Firebase
        const currentUser = auth.currentUser;
        if (currentUser && currentUser.email === email) {
          return currentUser;
        }else {
          return { error: "Error Logging In" }
        }
        }
      }
    }
  };

  module.exports = { postLogin, loginGoogle, logOut };
