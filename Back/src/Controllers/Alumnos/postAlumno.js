const { Op } = require("sequelize");
const { Alumnos, Aulas, Meses } = require("../../db");

const postAlumno = async (
  name,
  apellido,
  nacionalidad,
  datebirth,
  email,
  username,
  password,
  division,
  anio
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
    if (
      apellido === null &&
      nacionalidad === null &&
      datebirth === null &&
      email === null &&
      username === null &&
      password === null
    ) {
      return { error: "Te faltaron datos a completar!" };
    }

    const newAlumno = {
      name: name.toLowerCase(),
      apellido: apellido.toLowerCase(),
      nacionalidad: nacionalidad.toLowerCase(),
      datebirth: datebirth,
      email: email.toLowerCase(),
      username: username.toLowerCase(),
      password: password.toLowerCase(),
    };

    await Alumnos.create(newAlumno);
    //const nuevoAlumnoId = await Alumnos.findOne({ where: { username: username.toLowerCase() } });
    await Meses.create({
      username: username.toLowerCase(),
      name: name.toLowerCase(),
      apellido: apellido.toLowerCase(),
      email: email.toLowerCase(),
    });

    /*    const foundAula = await Aulas.findOne({
       where: { [Op.and]: [{ anio: anio }, { division: division }] },
     });
     if (!foundAula) {
       return { error: "El anio o division indicado no se encuentran" };
     }
 
     alumnodb.setAula(foundAula); */

    return { message: "Alumno creado con exito" };
  } catch (error) {
    return { error: "No se pudo agregar el Alumno solicitado" };
  }
};

module.exports = { postAlumno };
