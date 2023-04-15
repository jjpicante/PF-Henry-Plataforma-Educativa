const { Materias } = require("../../db");

const getAllMaterias = async (query) => {
  try {
    const PageN = Number.parseInt(query.page) || 0;

    let page = 0;
    if (!Number.isNaN(PageN) && PageN > 0) {
      page = PageN;
    }
    let size = 10;

    if (Object.keys(query).length) {
      var materias = await Materias.findAll({
        where: { namemateria: query.name },
        include: {
          all: true,
        },
      });
    } else {
      var materias = await Materias.findAll({
        limit: size,
        offset: page * size,
      });
    }

    const totalCount = await Materias.count();
    const pageCount = Math.ceil(totalCount / size);
    return { materias, pageCount };
  } catch (error) {
    return { error: "Error al importar Materias desde la Base de Datos" };
  }
};

module.exports = {
  getAllMaterias,
};
