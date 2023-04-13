const { Alumnos } = require("../../db");

const postAlumno = async (
  name,
  apellido,
  nacionalidad,
  datebirth,
  email,
  username,
  password
) => {
  try {
    if (
      await Alumnos.findOne({
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
      datebirth: datebirth,
      email: email.toLowerCase(),
      username: username.toLowerCase(),
      password: password.toLowerCase(),
    };

    Alumnos.create(newProfesor);

    return { message: "Alumno creado con éxito" };
  } catch (error) {
    return { error: "No se pudo agregar el Alumno solicitado" };
  }
};

module.exports = { postAlumno };
