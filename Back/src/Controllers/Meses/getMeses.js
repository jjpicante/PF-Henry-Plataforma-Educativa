const { Meses } = require("../../db");

const getMeses = async (username) => {
  try {
    const cuotas = await Meses.findOne({
      where: { username: username },
      attributes: { exclude: ["id", "username"] },
    });

    if (cuotas) return cuotas.toJSON();
    else return { message: "No se encontro las cuotas para el username solicitado" };
  } catch (error) {
    return { error: "Error al buscar el estado de cuenta" };
  }
};

module.exports = { getMeses };
