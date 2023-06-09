const { Alumnos } = require("../../db");

const getAlumnos = async (username) => {
  try {
    const alumno = await Alumnos.findOne({
      where: { username: username },
      include: {
        all: true,
      },
    });

    if (alumno) return alumno.toJSON();
    else
      return {
        message: "No se encontro el Alumno con el username solicitado",
      };
  } catch (error) {
    return { error: "Error al buscar un Alumno" };
  }
};

module.exports = { getAlumnos };
