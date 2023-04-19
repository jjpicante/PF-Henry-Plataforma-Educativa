const { Alumnos, Meses } = require("../../db");

const deleteAlumno = async (username) => {
  try {
    await Alumnos.destroy({
      where: { username },
    });

    await Meses.destroy({
      where: { username },
    });

    return { message: `Alumnos eliminado con exito` };
  } catch (error) {
    return { error: "No se pudo eliminar el Alumno solicitado" };
  }
};

module.exports = { deleteAlumno };
