const { Materias } = require("../../db");
const { Op } = require("sequelize");

const updateMaterias = async (id, changes) => {
  try {
    // const criteriosM = {};
    // for (let key in changes) {
    //   keyMinuscula = key.toLowerCase();
    //   valueMinuscula = changes[key].toLowerCase();
    //   criteriosM[keyMinuscula] = valueMinuscula;
    // }

    let minusculas = JSON.stringify(changes).toLowerCase();
    let criteriosM = JSON.parse(minusculas);

    //Faltaria validar cuando se quiere editar un usuario que no existe, pero desde el front no habria posibilidad de hacer eso.
    console.log(criteriosM, "primerconsolelog");

    if (
      await Materias.findOne({
        where: {
          namemateria: criteriosM.name,
          anio: criteriosM.anio,
        },
      })
    )
      return {
        error: `Error. La materia ${criteriosM.name} de ${criteriosM.anio} anio ya existe.`,
      };

    const UpdateMateria = await Materias.update(
      {
        namemateria: criteriosM.name,
        anio: criteriosM.anio,
        temas: criteriosM.temas,
      },
      {
        where: { id },
      }
    );
    console.log(UpdateMateria);
    return UpdateMateria;

    // const update = await Materias.findOne({
    //   where: { id },
    // });
    // console.log(update, "updatematerias");

    // await update.set(criteriosM);
    // console.log(criteriosM, "criteriosmateriauptdate");
    // await update.save();
    // return update;
  } catch (error) {
    console.log(error, "error updatematerias");
    return { error: `Error al actualizar la Materia` };
  }
};

module.exports = { updateMaterias };
