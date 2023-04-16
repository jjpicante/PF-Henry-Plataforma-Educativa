const { Materias } = require("../../db");

const updateMaterias = async (id, changes) => {
  try {
    const criteriosMinuscula = {};
    for (let key in changes) {
      keyMinuscula = key.toLowerCase();
      valueMinuscula = changes[key].toLowerCase();
      criteriosMinuscula[keyMinuscula] = valueMinuscula;
    }

    //Faltaria validar cuando se quiere editar un usuario que no existe, pero desde el front no habria posibilidad de hacer eso.
    console.log(criteriosMinuscula);
    if (
      await Materias.findOne({
        where: { namemateria: criteriosMinuscula.namemateria, anio: criteriosMinuscula.anio },
      })
    )
      return {
        error: `Error. La materia ${criteriosMinuscula.namemateria} de ${criteriosMinuscula.anio} anio ya existe.`,
      };

    const update = await Materias.findOne({
      where: { id },
    });

    update.set(criteriosMinuscula);
    await update.save();
    return update;
  } catch (error) {
    return { error: `Error al actualizar la Materia` };
  }
};

module.exports = { updateMaterias };
