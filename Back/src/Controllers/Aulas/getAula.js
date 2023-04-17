const { Aulas } = require("../../db");
const { Op } = require("sequelize");

const getAula = async (anio, division) => {
  try {
    const verifed = Number(anio);
    if (!Number.isNaN(verifed) && anio !== null) {
      return { message: "Introduzca un numero en la seccion anio" };
    }

    const aula = await Aulas.findOne({
      where: { [Op.and]: [{ anio: anio }, { division: division }] },
      include: {
        all: true,
      },
    });

    if (aula) return aula.toJSON();
    else
      return {
        message: "No se encontro el aula con el anio y division solicitado",
      };
  } catch (error) {
    return { error: "Error al buscar un aula" };
  }
};

module.exports = { getAula };
