const { Materias } = require("../../db");
const { Op } = require("sequelize");

const getAllMateriasAdmin = async (query) => {
  try {
    const PageN = Number.parseInt(query.page) || 0;

    let page = 0;
    if (!Number.isNaN(PageN) && PageN > 0) {
      page = PageN;
    }
    let size = 5;
    const total = await Materias.count();
    var materias = await Materias.findAll({
      offset: page * size,
      limit: size,
    });

    const pageCount = Math.ceil(total / size);
    return { materias, pageCount };
  } catch (error) {
    console.log(error);
    return { error: "Error al importar Materias desde la Base de Datos" };
  }
};

module.exports = {
  getAllMateriasAdmin,
};
