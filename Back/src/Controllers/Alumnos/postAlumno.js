const { Op } = require("sequelize");
const { Alumnos, Aulas } = require("../../db");
const admin = require("firebase-admin");

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
        where: { email: email },
      })
    )
      return {
        error: `No se pudo completar la carga. Ya existe el email ${email}`,
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

    const userResponse = await admin.auth().createUser({
        name:name,
        apellido:apellido,
        nacionalidad:nacionalidad,
        datebirth:datebirth,
        email:email,
        password:password
      });
    const alumnodb = await Alumnos.create(newAlumno);
  /*    const foundAula = await Aulas.findOne({
       where: { [Op.and]: [{ anio: anio }, { division: division }] },
     });
     if (!foundAula) {
       return { error: "El anio o division indicado no se encuentran" };
     }
 
     alumnodb.setAula(foundAula); */
     console.log(userResponse)
    return { message: "Alumno creado con exito" };
  } catch (error) {
    console.log(error)
    return { error: "No se pudo agregar el Alumno solicitado" };
  }
};

module.exports = { postAlumno };
