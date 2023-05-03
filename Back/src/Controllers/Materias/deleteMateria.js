const { Materias } = require("../../db");

const deleteMateria = async (id) => {
  try {
    console.log(id);

    const result = await Materias.destroy({
      where: { id: id },
    });
    console.log(result);
    return { message: `Materia eliminada con exito` };
  } catch (error) {
    console.log(error);
    return { error: "No se pudo eliminar la materia solicitada." };
  }
};

module.exports = { deleteMateria };
