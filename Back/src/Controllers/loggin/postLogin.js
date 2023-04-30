const { auth, db } = require("../../config/firebase");
const { signInWithEmailAndPassword } = require("firebase/auth");
const { Alumnos, Profesores } = require("../../db");
const { doc, getDoc } = require("firebase/firestore")

const postLogin = async (email, password) => {
  try {
    // Authenticate user with email and password
    const { user } = await signInWithEmailAndPassword(auth, email, password);
    // Fetch user's role from Firestore
    const userDocRef = doc(db, "users", user.uid);
    const userData = (await getDoc(userDocRef)).data()
    if(userData && userData.email){
      const datauser = await Promise.all([
        Alumnos.findOne({ where: { email:userData.email } }),
        Profesores.findOne({ where: { email:userData.email } }),
      ]);
      return datauser;
    }
    return userData
  } catch (firestoreError) {
    try {
      // Check if user exists in either the Alumnos or Profesores tables
      const [dbUser, dbProfesor] = await Promise.all([
        Alumnos.findOne({ where: { email } }),
        Profesores.findOne({ where: { email } }),
      ]);

      if (dbUser && dbUser.password === password) {
        return dbUser;
      } else if (dbProfesor && dbProfesor.password === password) {
        return dbProfesor;
      } else {
        return { error: "Invalid Credentials" };
      }
    } catch (error) {
      // Check if the user is authenticated in Firebase
      const currentUser = auth.currentUser;
      if (currentUser && currentUser.email === email) {
        return currentUser;
      } else {
        return { error: "Error Logging In" };
      }
    }
  }
};

module.exports = { postLogin };
