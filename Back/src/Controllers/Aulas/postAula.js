const { Aulas } = require("../../db");
const { Op } = require("sequelize");

const postAula = async (anio, division) => {
  try {
    if (
      await Aulas.findOne({
        where: { [Op.and]: [{ anio: anio }, { division: division }] },
      })
    ) {
      return {
        error: `No se pudo completar la carga. Ya existe el Aula: ${(anio, division)}`,
      };
    }
    const verifed = Number(anio);
    if (Number.isNaN(verifed)) {
      return { error: "Introdusca un numero valido" };
    }
    const newAula = {
      anio: anio,
      division: division,
    };

    Aulas.create(newAula);

    return { message: "Aula creado con exito" };
  } catch (error) {
    return { error: "No se pudo agregar el Aula solicitada" };
  }
};

module.exports = { postAula };
