const { Alumnos, Profesores, Admin } = require("../../db");

const googleVerifier = async (email) => {
  const alumno = await Alumnos.findOne({
    where: { email },
  });
  const profesor = await Profesores.findOne({
    where: { email },
  });
  const admin = await Admin.findOne({
    where: { email },
  });
  console.log(admin);
  console.log(alumno);
  console.log(profesor);
  if (!alumno && !profesor && !admin) {
    throw new Error(
      "No esta registrado en la base de datos, por favor contacte con la intitucion educativa"
    );
  }
  if (admin) return admin;
  if (alumno) return alumno;
  if (profesor) return profesor;
};

module.exports = { googleVerifier };
