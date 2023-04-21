const { Op } = require("sequelize");
const { Alumnos, Profesores } = require("../../db");

const googleVerifier = async (email) => {
  const alumno = await Alumnos.findOne({
    where: { email },
  });
  const profesor = await Profesores.findOne({
    where: { email },
  });

  if (!alumno && !profesor) {
    throw new Error(
      "No esta registrado en la base de datos, por favor contacte con la intitucion educativa"
    );
  }

  if (alumno) return alumno;
  if (profesor) return profesor;
};

module.exports = { googleVerifier };
