const { Op } = require("sequelize");
const { Alumnos, Profesores } = require("../../db");

const postLogin = async (password, username) => {
  try {
    const alumno = await Alumnos.findOne({
      where: { [Op.and]: [{ username: username }, { password: password }] },
    });
    const profesor = await Profesores.findOne({
      where: { [Op.and]: [{ username: username }, { password: password }] },
    });

    if (alumno) {
      return alumno.rol;
    } else if (profesor) {
      return profesor.rol;
    } else {
      return { message: "Userario o password invalidos" };
    }
  } catch (error) {
    console.log(error);
    return { error: "No se pudo agregar la materia solicitada." };
  }
};

module.exports = { postLogin };
