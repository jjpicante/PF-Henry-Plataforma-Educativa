const { Op } = require("sequelize");
const { Profesores, Materias } = require("../../db");

const postProfesor = async (
  name,
  apellido,
  nacionalidad,
  datebirth,
  email,
  username,
  password,
  namemateria,
  anio,
  temas
) => {
  try {
    if (
      await Profesores.findOne({
        where: { username: username.toLowerCase() },
      })
    )
      return {
        error: `No se pudo completar la carga. Ya existe el username ${username}`,
      };

    const newProfesor = {
      name: name.toLowerCase(),
      apellido: apellido.toLowerCase(),
      nacionalidad: nacionalidad.toLowerCase(),
      datebirth,
      email: email.toLowerCase(),
      username: username.toLowerCase(),
      password: password.toLowerCase(),
    };

    const profesordb = await Profesores.create(newProfesor);
    const foundMateria = await Materias.findOne({
      where: { [Op.and]: [{ namemateria: namemateria }, { anio: anio }, { temas: temas }] },
    });
    if (!foundMateria) {
      return { error: "La materia indicada no se encuentra" };
    }

    profesordb.setMaterias(foundMateria);

    return { message: "Profesor creado con éxito" };
  } catch (error) {
    return { error: "No se pudo agregar el profesor solicitado" };
  }
};

module.exports = { postProfesor };
