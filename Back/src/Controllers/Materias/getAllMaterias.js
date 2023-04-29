const { Materias } = require("../../db");
const { Op } = require("sequelize");

const getAllMaterias = async (query) => {
  try {
    const PageN = Number.parseInt(query.page) || 0;

    let page = 0;
    if (!Number.isNaN(PageN) && PageN > 0) {
      page = PageN;
    }
    let size = query.size;

    if (query.name && query.name !== undefined) {
      var materias = await Materias.findAll({
        where: { namemateria: { [Op.iLike]: `%${query.name}%` } },
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
    console.log(error);
    return { error: "Error al importar Materias desde la Base de Datos" };
  }
};

module.exports = {
  getAllMaterias,
};
