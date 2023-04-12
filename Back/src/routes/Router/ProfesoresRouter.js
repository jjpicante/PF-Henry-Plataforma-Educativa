const { Router } = require("express");

const profesores = Router();

profesores.get("/", async (res, req) => {
  const respuesta = await getAllProfesores();
  if (!respuesta.error) res.status(200).json(respuesta);
  res.status(500).json(respuesta);
});

module.exports = profesores;
