const { Materias } = require("../../db");

const deleteMateria = async (id) => {
  try {
    await Materias.destroy({
      where: { id },
    });
    return { message: `Materia eliminada con exito` };
  } catch (error) {
    return { error: "No se pudo eliminar la materia solicitada." };
  }
};

module.exports = { deleteMateria };
