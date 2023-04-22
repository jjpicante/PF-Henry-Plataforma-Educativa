const { Meses } = require("../../db");

const updateMeses = async (username, changes) => {
  try {
    console.log(username);
    const criteriosMinuscula = {};
    for (let key in changes) {
      keyMinuscula = key.toLowerCase();
      valueMinuscula = changes[key];
      criteriosMinuscula[keyMinuscula] = valueMinuscula;
    }

    const update = await Meses.findOne({
      where: { username: username },
    });

    update.set(criteriosMinuscula);
    await update.save();
    return `Se actualizaron los meses de ${Object.keys(changes).join(", ")}`;
  } catch (error) {
    return { error: `Error al actualizar cuotas` };
  }
};

module.exports = { updateMeses };
