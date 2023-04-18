const { Alumnos, Meses } = require("../../db");

const updateAlumno = async (currentusername, changes) => {
  try {
    const minuscula = {};
    for (let key in changes) {
      keyMinuscula = key.toLowerCase();
      valueMinuscula = changes[key].toLowerCase();
      minuscula[keyMinuscula] = valueMinuscula;
    }

    if (
      minuscula.username &&
      (await Alumnos.findOne({ where: { username: minuscula.username } }))
    ) {
      return { error: `El username ${minuscula.username} ya existe. Intente con otro.` };
    }

    //Actualizo el alumno en la tabla de alumnos
    const updateAlumno = await Alumnos.findOne({
      where: {
        username: currentusername,
      },
    });
    updateAlumno.set(minuscula);
    await updateAlumno.save();

    //Si uno de los cambios es el username, lo actualizo en la tabla de meses
    if (minuscula.username) {
      const updateMeses = await Meses.findOne({
        where: {
          username: currentusername,
        },
      });
      updateMeses.set({ username: minuscula.username });
      await updateMeses.save();
    }

    return updateAlumno;
  } catch (error) {
    return { error: `Error al actualizar al alumno: ${currentusername}` };
  }
};

module.exports = {
  updateAlumno,
};
