const { Alumnos } = require("../../db");

const deleteAlumno = async (username) => {
  //!Revisar con qué variable se va a eliminar
  try {
    console.log(username);
    await Alumnos.destroy({
      where: { username },
    });
    return { message: `Alumnos eliminado con éxito` };
  } catch (error) {
    return { error: "No se pudo eliminar el Alumno solicitado" };
  }
};

module.exports = { deleteAlumno };
