const { Aulas } = require("../../db");

const getAllAulas = async (query) => {
  try {
    const PageN = Number.parseInt(query.page) || 0;

    let page = 0;
    if (!Number.isNaN(PageN) && PageN > 0) {
      page = PageN;
    }
    let size = 10;

    const aulas = await Aulas.findAll({
      limit: size,
      offset: page * size,
    });
    const totalCount = await Aulas.count();
    const pageCount = Math.ceil(totalCount / size);
    return { aulas, pageCount };
  } catch (error) {
    return { error: "Error al importar Aulas desde la Base de Datos" };
  }
};

module.exports = {
  getAllAulas,
};
