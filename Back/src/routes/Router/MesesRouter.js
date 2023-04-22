const { Router } = require("express");
const { getMeses } = require("../../Controllers/Meses/getMeses");
const { updateMeses } = require("../../Controllers/Meses/updateMeses");

const meses = Router();

meses.get("/", async (req, res) => {
  const respuesta = await getMeses(req.query.username);
  if (!respuesta.error) return res.status(200).json(respuesta);
  return res.status(500).json(respuesta);
});

meses.put("/:username", async (req, res) => {
  const { username } = req.params;
  const changes = req.body;

  if (!username) return res.status(400).json({ message: "No se envio Username a modificar" });

  if (Object.keys(changes).length === 0)
    return res.status(400).json({ message: "No se ingresaron modificaciones a realizar" });

  const respuesta = await updateMeses(username, changes);
  if (!respuesta.error) return res.status(200).json(respuesta);
  return res.status(503).json(respuesta);
});

module.exports = meses;
