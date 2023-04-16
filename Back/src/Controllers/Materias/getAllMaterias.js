const { Materias } = require("../../db");

const getAllMaterias = async (query) => {
  try {
    const PageN = Number.parseInt(query.page) || 0;

    let page = 0;
    if (!Number.isNaN(PageN) && PageN > 0) {
      page = PageN;
    }
    let size = 2;

    if (query.name && query.name !== undefined) {
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

const getMateriasByName = async (name) => {
  const materiaName = await Materias.findAll({
    where: { namemateria: { [Op.iLike]: `%${name}%` } },
  });
  if (!materiaName.length) {
    throw Error("No se encontraron materias con ese nombre");
  }
  return materiaName;
};

module.exports = {
  getAllMaterias,
  getMateriasByName,
};
