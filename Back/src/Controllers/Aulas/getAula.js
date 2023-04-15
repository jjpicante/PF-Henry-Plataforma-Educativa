const { Aulas } = require("../../db");
const { Op } = require("sequelize");

const getAula = async (año, division) => {
  try {
    const verifed = Number(año);
    if (!Number.isNaN(verifed) && año !== null) {
      return { message: "Introduzca un numero en la seccion año" };
    }

    const aula = await Aulas.findOne({
      where: { [Op.and]: [{ anio: año }, { division: division }] },
      include: {
        all: true,
      },
    });

    if (aula) return aula.toJSON();
    else
      return {
        message: "No se encontró el aula con el año y division solicitado",
      };
  } catch (error) {
    return { error: "Error al buscar un aula" };
  }
};

module.exports = { getAula };
