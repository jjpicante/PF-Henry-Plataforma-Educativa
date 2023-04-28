const { auth } = require("../../config/firebase");
const { Alumnos, Profesores } = require("../../db");

const ResetPassword = async (email, newPassword) => {
  const alumno = await Alumnos.findOne({ where: { email: email } });
  if (alumno) {
    try {
      const userRecord = await auth.getUserByEmail(email);
      await auth.updateUser(userRecord.uid, {
        password: newPassword,
      });
      await alumno.update({ password: newPassword });
      return { success: "Password updated" };
    } catch (error) {
      console.error(error);
      return { error: "Failed to update password" };
    }
  }

  const profesor = await Profesores.findOne({ where: { email: email } })
  if (profesor) {
    try {
      const userRecord = await auth.getUserByEmail(email);
      await auth.updateUser(userRecord.uid, {
        password: newPassword,
      });
      await profesor.update({ password: newPassword });
      return { success: "Password updated" };
    } catch (error) {
      console.error(error);
      return { error: "Failed to update password" };
    }
  }

  return { error: "User not found" }
}

module.exports = { ResetPassword };