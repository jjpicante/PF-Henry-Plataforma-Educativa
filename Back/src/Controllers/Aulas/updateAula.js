const { Aulas } = require("../../db");

const updateAula = async (currentdivision, changes) => {
  try {
    let minusculas = JSON.stringify(changes).toLowerCase();
    let criteriosM = JSON.parse(minusculas);

    // const minuscula = {};
    // for (let key in changes) {
    //   keyMinuscula = key.toLowerCase();
    //   valueMinuscula = changes[key].toLowerCase;
    //   minuscula[keyMinuscula] = valueMinuscula;
    // }
    if (criteriosM.division && (await Aulas.findOne({ where: { division: criteriosM } }))) {
      return { error: `El Aula ${changes} ya existe. Intente con otro.` };
    }
    const update = await Aulas.findOne({
      where: {
        division: currentdivision,
      },
    });

    update.set(criteriosM);
    await update.save();
    return update;
  } catch (error) {
    return { error: `Error al actualizar al alumno: ${currentdivision}` };
  }
};

module.exports = {
  updateAula,
};
