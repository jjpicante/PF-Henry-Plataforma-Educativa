const { Alumnos } = require("../../db");

const getAllAlumnos = async (query) => {
  try {
    const PageN = Number.parseInt(query.page) || 0;

    let page = 0;
    if (!Number.isNaN(PageN) && PageN > 0) {
      page = PageN;
    }
    let size = 1;

    const alumnos = await Alumnos.findAll({
      limit: size,
      offset: page * size,
    });
    console.log(Alumnos.count());
    const totalCount = await Alumnos.count();
    const pageCount = Math.ceil(totalCount / size);
    console.log(pageCount);
    return { alumnos, pageCount };
  } catch (error) {
    return { error: "Error al importar alumnos desde la Base de Datos" };
  }
};

module.exports = {
  getAllAlumnos,
};
