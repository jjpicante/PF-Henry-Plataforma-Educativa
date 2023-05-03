const { Router } = require("express");
const { postAdmin } = require("../../Controllers/Admin/postAdmin");

const admin = Router();

admin.post("/", async (req, res) => {
  const { name, pais, username, email, password } = req.body;
  const respuesta = await postAdmin(name, pais, username, email, password);

  if (!respuesta.error) return res.status(200).json(respuesta);
  return res.status(503).json(respuesta);
});

module.exports = admin;
