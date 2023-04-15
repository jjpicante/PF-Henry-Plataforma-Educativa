const { Profesores } = require("../../db");

const getAllProfesores = async (query) => {
  try {
    const PageN = Number.parseInt(query.page) || 0;

    let page = 0;
    if (!Number.isNaN(PageN) && PageN > 0) {
      page = PageN;
    }
    let size = 10;

    const profesor = await Profesores.findAll({
      limit: size,
      offset: page * size,
    });
    const totalCount = await Profesores.count();
    const pageCount = Math.ceil(totalCount / size);
    return { profesor, pageCount };
  } catch (error) {
    return { error: "Error al importar Profesores desde la Base de Datos" };
  }
};

module.exports = {
  getAllProfesores,
};
