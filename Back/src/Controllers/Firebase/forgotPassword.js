const { Alumnos, Profesores } = require("../../db");
const { sendPasswordByEmail } = require('./sendEmail');


const ForgotPassword = async (email) => {
  const alumno = await Alumnos.findOne({ where: { email: email } });
  if (alumno) {
    try {
      const password = alumno.password; // retrieve the user's password from your database
      await sendPasswordByEmail(email, password);
      return { success: "Password sent" };
    } catch (error) {
      return { error: "Failed to send password" };
    }
  }

  const profesor = await Profesores.findOne({ where: { email: email } })
  if (profesor) {
    try {
      const password = profesor.password; // retrieve the user's password from your database
      await sendPasswordByEmail(email, password);
      return { success: "Password sent" };
    } catch (error) {
      return { error: "Failed to send password" };
    }
  }

  return { error: "User not found" }
}
module.exports = { ForgotPassword };