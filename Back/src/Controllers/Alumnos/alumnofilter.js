const { Alumnos } = require("../../db");

const filterAlumnos = async (criterios) => {
  try {
    const where = {};
    let minusculas = JSON.stringify(criterios).toLowerCase();
    let criteriosM = JSON.parse(minusculas);

    for (const key in criteriosM) {
      where[key] = criteriosM[key];
    }

    const filtro = await Alumnos.findAll({
      where,
      include: {
        all: true,
      },
    });

    if (filtro.length > 0) {
      const arreglo = filtro.map((profesor) => profesor.toJSON());
      return arreglo;
    } else {
      return { message: "No se encontro el alumno con el filtro solicitado" };
    }
  } catch (error) {
    return { error: "Error al buscar un Alumno" };
  }
};

module.exports = { filterAlumnos };
