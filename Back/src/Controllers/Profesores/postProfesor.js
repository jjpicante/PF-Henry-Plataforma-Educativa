const { Op } = require("sequelize");
const { Profesores, Materias } = require("../../db");

const postProfesor = async (
  name,
  apellido,
  email,
  datebirth,
  nacionalidad,
  username,
  password,
  anio1,
  materia1,
  anio2,
  materia2,
  anio3,
  materia3
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

    //* --------------------------> Creación del profesor <---------------------------

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

    //* --------------------------> Carga de Materia 1 <---------------------------

    const foundMateria1 = await Materias.findOne({
      where: { [Op.and]: [{ namemateria: materia1 }, { anio: anio1 }] },
    });
    if (!foundMateria1) {
      return { error: "La materia indicada no se encuentra" };
    }
    profesordb.addMaterias(foundMateria1);

    //* ------------------------> Carga de Materia 2 (opcional) <-------------------------

    if (anio2 && materia2 !== "materia") {
      const foundMateria2 = await Materias.findOne({
        where: { [Op.and]: [{ namemateria: materia2 }, { anio: anio2 }] },
      });
      if (!foundMateria2) {
        return { error: "La materia indicada no se encuentra" };
      }
      profesordb.addMaterias(foundMateria2);
    }

    //* ------------------------> Carga de Materia 3 (opcional) <-------------------------

    if (anio3 && materia3 !== "materia") {
      const foundMateria3 = await Materias.findOne({
        where: { [Op.and]: [{ namemateria: materia3 }, { anio: anio3 }] },
      });
      if (!foundMateria3) {
        return { error: "La materia indicada no se encuentra" };
      }
      profesordb.addMaterias(foundMateria3);
    }

    return { message: "Profesor creado con exito" };
  } catch (error) {
    return { error: "No se pudo agregar el profesor solicitado" };
  }
};

module.exports = { postProfesor };
