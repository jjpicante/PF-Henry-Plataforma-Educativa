const { Aulas } = require("../../db");
const { Op } = require("sequelize");

const postAula = async (anio) => {
  try {
    if (
      await Aulas.findOne({
        where: { [Op.and]: [{ anio: anio }] },
      })
    ) {
      return {
        error: `No se pudo completar la carga. Ya existe el Aula: ${anio}`,
      };
    }

    const newAula = {
      anio: anio,
    };

    Aulas.create(newAula);

    return { message: "Aula creado con exito" };
  } catch (error) {
    return { error: "No se pudo agregar el Aula solicitada" };
  }
};

module.exports = { postAula };
