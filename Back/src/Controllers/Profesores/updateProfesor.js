const { Op } = require("sequelize");
const { Profesores, Materias, Aulas, ProfesoresMateria, ProfesorAula } = require("../../db");

const updateProfesor = async (currentUsername, changes) => {
  try {
    const materiasMinusc = {};
    const noMateriasMinusc = {};
    for (let key in changes) {
      //Se separa entre los pares año-materia, y el resto de los cambios, porque unos datos
      //se tienen que actualizar, y los otros se tienen que crear.
      if (key.includes("anio") || key.includes("materia")) {
        keyMinuscula = key.toLowerCase();
        valueMinuscula = changes[key].toLowerCase();
        materiasMinusc[keyMinuscula] = valueMinuscula;
      } else {
        keyMinuscula = key.toLowerCase();
        valueMinuscula = changes[key].toLowerCase();
        noMateriasMinusc[keyMinuscula] = valueMinuscula;
      }
    }

    //Faltaria validar cuando se quiere editar un usuario que no existe, pero desde el front no habria posibilidad de hacer eso.

    if (
      noMateriasMinusc.username &&
      (await Profesores.findOne({ where: { username: noMateriasMinusc.username } }))
    )
      return { error: `El Username '${noMateriasMinusc.username}' ya existe. Intente con otro.` };

    //* ----------------> Búsqueda del profesor, elim. de años y materias <------------------

    const foundProfesor = await Profesores.findOne({
      where: { username: currentUsername },
    });

    const response = foundProfesor.toJSON();
    const id = response.id;

    if (Object.keys(materiasMinusc).length) {
      await ProfesoresMateria.destroy({
        where: { ProfesoreId: id },
      });

      await ProfesorAula.destroy({
        where: { ProfesoreId: id },
      });
    }

    //* ------------------> Actualización de datos (ni materias, ni años) <--------------------
    if (Object.keys(noMateriasMinusc).length) {
      foundProfesor.set(noMateriasMinusc);
      await foundProfesor.save();
    }

    //* -----------------------> Actualización de materias y años <-------------------------
    //Primero convierto las materias en un array de objetos con pares anio-materia
    if (Object.keys(materiasMinusc).length) {
      const arregloMaterias = [];
      for (let i = 1; i <= 3; i++) {
        if (materiasMinusc["anio" + i] !== "año" && materiasMinusc["materia" + i] !== "materia") {
          arregloMaterias.push({
            anio: materiasMinusc["anio" + i],
            materia: materiasMinusc["materia" + i],
          });
        }
      }

      for (let elem of arregloMaterias) {
        // Carga de Materia
        const foundMateria = await Materias.findOne({
          where: { [Op.and]: [{ namemateria: elem.materia }, { anio: elem.anio }] },
        });
        if (!foundMateria) {
          return { error: "La materia indicada no se encuentra" };
        }

        await foundProfesor.addMaterias(foundMateria);

        // Carga de Aula
        const foundAula = await Aulas.findOne({
          where: { anio: elem.anio },
        });

        if (!foundAula) {
          return { error: "El aula indicada no se encuentra" };
        }
        await foundProfesor.addAulas(foundAula);
      }
    }
    return {
      profesor: foundProfesor,
      mensaje: "Tus datos se modificaron con éxito",
    };
  } catch (error) {
    return { error: `Error al actualizar el Profesor ${currentUsername}` };
  }
};

module.exports = { updateProfesor };
