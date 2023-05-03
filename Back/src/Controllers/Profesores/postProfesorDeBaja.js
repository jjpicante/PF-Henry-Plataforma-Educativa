const { Op } = require("sequelize");
const { ProfesoresDeBaja, Materias, Aulas } = require("../../db");

const postProfesorDeBaja = async (
  name,
  apellido,
  email,
  datebirth,
  nacionalidad,
  username,
  password,
  // anio1,
  // materia1,
  // anio2,
  // materia2,
  // anio3,
  // materia3
) => {
  try {
    if (
      await ProfesoresDeBaja.findOne({
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

    //* --------------------------> Creación del profesor <---------------------------

    const newProfesor = {
      name: name.toLowerCase(),
      apellido: apellido.toLowerCase(),
      email: email.toLowerCase(),
      datebirth,
      nacionalidad: nacionalidad.toLowerCase(),
      username: username.toLowerCase(),
      password: password.toLowerCase(),
    };
console.log(newProfesor);

    const profesordb = await ProfesoresDeBaja.create(newProfesor);
console.log(profesordb);
    //* --------------------------> Carga de Materia 1 <---------------------------

    // const foundMateria1 = await Materias.findOne({
    //   where: { [Op.and]: [{ namemateria: materia1 }, { anio: anio1 }] },
    // });
    // if (!foundMateria1) {
    //   return { error: "La materia indicada no se encuentra" };
    // }
    // profesordb.addMaterias(foundMateria1);

    // // Carga de Aula 1

    // const foundAula1 = await Aulas.findOne({
    //   where: { anio: anio1 },
    // });
    // if (!foundAula1) {
    //   return { error: "El aula indicada no se encuentra" };
    // }
    // profesordb.addAulas(foundAula1);

    // //* ------------------------> Carga de Materia 2 (opcional) <-------------------------

    // if (anio2 && materia2 !== "materia") {
    //   const foundMateria2 = await Materias.findOne({
    //     where: { [Op.and]: [{ namemateria: materia2 }, { anio: anio2 }] },
    //   });
    //   if (!foundMateria2) {
    //     return { error: "La materia indicada no se encuentra" };
    //   }
    //   profesordb.addMaterias(foundMateria2);

    //   // Carga de Aula 2
    //   const foundAula2 = await Aulas.findOne({
    //     where: { anio: anio2 },
    //   });
    //   if (!foundAula2) {
    //     return { error: "El aula indicada no se encuentra" };
    //   }
    //   profesordb.addAulas(foundAula2);
    // }

    // //* ------------------------> Carga de Materia 3 (opcional) <-------------------------

    // if (anio3 && materia3 !== "materia") {
    //   const foundMateria3 = await Materias.findOne({
    //     where: { [Op.and]: [{ namemateria: materia3 }, { anio: anio3 }] },
    //   });
    //   if (!foundMateria3) {
    //     return { error: "La materia indicada no se encuentra" };
    //   }
    //   profesordb.addMaterias(foundMateria3);

    //   // Carga de Aula 3
    //   const foundAula3 = await Aulas.findOne({
    //     where: { anio: anio3 },
    //   });
    //   if (!foundAula3) {
    //     return { error: "El aula indicada no se encuentra" };
    //   }
    //   profesordb.addAulas(foundAula3);
    // }

    return { message: "Profesor creado con exito" };
  } catch (error) {
    return { error: "No se pudo agregar el profesor solicitado" };
  }
};

module.exports = { postProfesorDeBaja };