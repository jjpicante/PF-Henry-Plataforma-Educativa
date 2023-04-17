const { Profesores } = require("../../db");

const getProfesor = async (username) => {
  try {
    const profesor = await Profesores.findOne({
      where: { username: username },
      include: {
        all: true,
      },
    });

    if (profesor) return profesor.toJSON();
    else return { message: "No se encontro el profesor con el username solicitado" };
  } catch (error) {
    return { error: "Error al buscar un Profesor" };
  }
};

module.exports = { getProfesor };
