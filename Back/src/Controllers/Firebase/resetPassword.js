const { sendPasswordResetEmail } = require('firebase/auth');
const { auth } = require('../../config/firebase')
const { Alumnos, Profesores } = require("../../db");

const ResetPassword = async (email) => {
  const alumno = await Alumnos.findOne({ where: { email: email } });
  if (alumno) {
    try {
      await sendPasswordResetEmail(auth, email);
      return { success: "Password reset email sent" };
    } catch (error) {
      console.error(error);
      return { error: "Failed to send password reset email" };
    }
  }

  const profesor = await Profesores.findOne({ where: { email: email } })
  if (profesor) {
    try {
      await sendPasswordResetEmail(auth, email);
      return { success: "Password reset email sent" };
    } catch (error) {
      console.error(error);
      return { error: "Failed to send password reset email" };
    }
  }

  return { error: "User not found" }
}

module.exports = { ResetPassword };