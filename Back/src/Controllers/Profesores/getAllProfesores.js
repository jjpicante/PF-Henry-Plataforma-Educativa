const { Profesores } = require("../../db");

const getAllProfesores = async (query) => {
  try {
    const PageN = Number.parseInt(query.page) || 0;

    let page = 0;
    if (!Number.isNaN(PageN) && PageN > 0) {
      page = PageN;
    }
    let size = 10;

    const profesores = await Profesores.findAll({
      limit: size,
      offset: page * size,
    });
    const totalCount = await Profesores.count();
    const pageCount = Math.ceil(totalCount / size);
    return { profesores, pageCount };
    /* try {      
        const profesores = await Profesores.findAll({
            include: {
                all: true
            }
        });

        if (profesores) { 
            const arreglo = profesores.map(profesor => {
                const respuesta = profesor.toJSON();
                return respuesta
            })
            return arreglo
        }
        return profesores */
  } catch (error) {
    return { error: "Error al importar profesores desde la Base de Datos" };
  }
};

module.exports = {
  getAllProfesores,
};
