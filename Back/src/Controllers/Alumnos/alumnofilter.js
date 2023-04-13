const { Alumnos } = require("../../db");

const filterAlumnos = async (criterios) => {
  console.log(criterios);
  try {
    const filtro = await Alumnos.findAll({
      where: criterios,
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
