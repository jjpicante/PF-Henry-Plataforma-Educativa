const { Materias } = require("../../db");

const filterMateria = async (criterios) => {
  try {
    const criteriosMinuscula = {};
    for (let key in criterios) {
      keyMinuscula = key.toLowerCase();
      valueMinuscula = criterios[key].toLowerCase();
      criteriosMinuscula[keyMinuscula] = valueMinuscula;
    }

    const filtro = await Materias.findAll({
      where: criteriosMinuscula,
      include: {
        all: true,
      },
    });

    if (filtro.length > 0) {
      const arreglo = filtro.map((materia) => materia.toJSON());
      return arreglo;
    } else return { message: "No se encontró la materia con el filtro solicitado" };
  } catch (error) {
    return { error: "Error al filtrar una Materia" };
  }
};

module.exports = { filterMateria };
