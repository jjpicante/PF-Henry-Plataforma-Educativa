const { Profesores } = require("../../db");

const filterProfesor = async (criterios) => {
  try {
    const criteriosMinuscula = {};
    for (let key in criterios) {
      keyMinuscula = key.toLowerCase();
      valueMinuscula = criterios[key].toLowerCase();
      criteriosMinuscula[keyMinuscula] = valueMinuscula;
    }

    const filtro = await Profesores.findAll({
      where: criteriosMinuscula,
      include: {
        all: true,
      },
    });

    if (filtro.length > 0) {
      const arreglo = filtro.map((profesor) => profesor.toJSON());
      return arreglo;
    } else return { message: "No se encontró el profesor con el filtro solicitado" };
  } catch (error) {
    return { error: "Error al filtrar un Profesor" };
  }
};

module.exports = { filterProfesor };
