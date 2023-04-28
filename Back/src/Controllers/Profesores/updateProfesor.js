const { Profesores } = require("../../db");

const updateProfesor = async (currentUsername, changes) => {
  try {
    const criteriosMinuscula = {};
    for (let key in changes) {
      keyMinuscula = key.toLowerCase();
      valueMinuscula = changes[key].toLowerCase();
      criteriosMinuscula[keyMinuscula] = valueMinuscula;
    }

    //Faltaria validar cuando se quiere editar un usuario que no existe, pero desde el front no habria posibilidad de hacer eso.

    if (
      criteriosMinuscula.username &&
      (await Profesores.findOne({ where: { username: criteriosMinuscula.username } }))
    )
      return { error: `El Username '${criteriosMinuscula.username}' ya existe. Intente con otro.` };

    const update = await Profesores.findOne({
      where: { username: currentUsername },
    });

    update.set(criteriosMinuscula);
    await update.save();
    return {
      alumno: update,
      mensaje: "Tus datos se modificaron con éxito"
    }
  } catch (error) {
    return { error: `Error al actualizar el Profesor ${currentUsername}` };
  }
};

module.exports = { updateProfesor };
