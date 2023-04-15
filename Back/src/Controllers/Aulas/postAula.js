const { Aulas } = require("../../db");
const { Op } = require("sequelize");

const postAula = async (año, division) => {
  try {
    if (
      await Aulas.findOne({
        where: { [Op.and]: [{ anio: año }, { division: division }] },
      })
    ) {
      return {
        error: `No se pudo completar la carga. Ya existe el Aula: ${(año, division)}`,
      };
    }
    const verifed = Number(año);
    if (Number.isNaN(verifed)) {
      return { error: "Introdusca un numero valido" };
    }
    const newAula = {
      anio: año,
      division: division,
    };

    Aulas.create(newAula);

    return { message: "Aula creado con éxito" };
  } catch (error) {
    return { error: "No se pudo agregar el Aula solicitada" };
  }
};

module.exports = { postAula };
