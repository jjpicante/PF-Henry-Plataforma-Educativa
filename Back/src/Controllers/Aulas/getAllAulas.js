const { Aulas } = require("../../db");

const getAllAulas = async (query) => {
  try {
    const PageN = Number.parseInt(query.page);
    const SizeN = Number.parseInt(query.size);
    let page = 0;
    if (!Number.isNaN(PageN) && PageN > 0) {
      page = PageN;
    }
    let size = 3;
    if (!Number.isNaN(SizeN) && SizeN > 0 && SizeN < 3) {
      size = SizeN;
    }
    const aulas = await Aulas.findAndCountAll({
      limit: size,
      offset: page * size,
    });

    return aulas;
  } catch (error) {
    return { error: "Error al importar aulas desde la Base de Datos" };
  }
};

module.exports = {
  getAllAulas,
};
