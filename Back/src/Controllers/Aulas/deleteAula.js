const { Aulas } = require("../../db");

const deleteAula = async (id) => {
  //!Revisar con qué variable se va a eliminar
  try {
    console.log(id);
    await Aulas.destroy({
      where: { id: id },
    });
    return { message: `Aula eliminado con éxito` };
  } catch (error) {
    return { error: "No se pudo eliminar el Aula solicitado" };
  }
};

module.exports = { deleteAula };
