const Alumnos = require("../../db");

const updateAlumno = async (currentusername, changes) => {
  try {
    const minuscula = {};
    for (let key in changes) {
      keyMinuscula = key.toLowerCase();
      valueMinuscula = changes[key].toLowerCase;
      minuscula[keyMinuscula] = valueMinuscula;
    }
    if (
      minuscula.username &&
      (await Alumnos.findOne({ where: { username: minuscula.username } }))
    ) {
      return { error: `El username ${minuscula.username} ya existe. Intente con otro.` };
    }
    const update = await Alumnos.findOne({
      where: {
        username: currentusername,
      },
    });

    update.set(minuscula);
    await update.save();
    return uptdate;
  } catch (error) {
    return { error: `Error al actualizar al alumno: ${currentusername}` };
  }
};

module.exports = {
  updateAlumno,
};
