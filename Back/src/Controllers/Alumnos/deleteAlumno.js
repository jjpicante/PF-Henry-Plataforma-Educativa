const { Alumnos } = require("../../db");

const deleteAlumno = async (username) => {
  //!Revisar con que variable se va a eliminar
  try {
    console.log(username);
    await Alumnos.destroy({
      where: { username },
    });
    return { message: `Alumnos eliminado con exito` };
  } catch (error) {
    return { error: "No se pudo eliminar el Alumno solicitado" };
  }
};

module.exports = { deleteAlumno };
