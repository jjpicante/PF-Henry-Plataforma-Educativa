const { Materias } = require("../../db");

const getMateria = async (id) => {
  try {
    const materia = await Materias.findOne({
      where: { id },
      include: {
        all: true,
      },
    });

    if (materia) return materia.toJSON(); //hola
    else return { message: "No se encontró la materia con el id solicitado" };
  } catch (error) {
    return { error: "Error al buscar una materia" };
  }
};

module.exports = { getMateria };
