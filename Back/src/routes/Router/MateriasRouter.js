const { Router } = require("express");
const { getAllMaterias } = require("../../Controllers/Materias/getAllMaterias");
const { getMateria } = require("../../Controllers/Materias/getMateria");
const { filterMateria } = require("../../Controllers/Materias/filterMateria");
const { postMateria } = require("../../Controllers/Materias/postMateria");
const { updateMaterias } = require("../../Controllers/Materias/updateMateria");
const { deleteMateria } = require("../../Controllers/Materias/deleteMateria");
const { getAllMateriasAdmin } = require("../../Controllers/Admin/AdmingetAllMateria");

const materias = Router();

materias.get("/", async (req, res) => {
  const respuesta = await getAllMaterias(req.query);
  if (!respuesta.error) return res.status(200).json(respuesta);
  return res.status(503).json(respuesta);
});
materias.get("/Admin", async (req, res) => {
  const respuesta = await getAllMateriasAdmin(req.query);
  if (!respuesta.error) return res.status(200).json(respuesta);
  return res.status(503).json(respuesta);
});

materias.get("/getmateria/:id", async (req, res) => {
  const { id } = req.params;
  if (!id) return res.status(400).json({ message: "No se ingreso una materia" });
  const respuesta = await getMateria(id);
  if (!respuesta.error) return res.status(200).json(respuesta);
  return res.status(503).json(respuesta);
});

materias.get("/filtermateria", async (req, res) => {
  const criterios = req.query;
  console.log(criterios);
  if (Object.keys(criterios).length === 0)
    return res.status(400).json({ message: "Faltan ingresar datos" });
  const respuesta = await filterMateria(criterios);
  console.log(respuesta);
  if (!respuesta.error) return res.status(200).json(respuesta);
  return res.status(503).json(respuesta);
});

materias.post("/", async (req, res) => {
  const { namemateria, anio, temas } = req.body;
  if (!namemateria || !anio || !temas)
    return res.status(400).json({ message: "Faltan ingresar datos" });
  const respuesta = await postMateria(namemateria, anio, temas);
  if (!respuesta.error) return res.status(200).json(respuesta);
  console.log(respuesta);
  return res.status(503).json(respuesta);
});

materias.put("/:id", async (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  if (!id) return res.status(400).json({ message: "No se envio Id de Materia a modificar" });

  if (Object.keys(changes).length === 0)
    return res.status(400).json({ message: "No se ingresaron modificaciones a realizar" });

  const respuesta = await updateMaterias(id, changes);
  console.log(respuesta);
  if (!respuesta.error) return res.status(200).json(respuesta);
  return res.status(503).json(respuesta);
});

materias.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const respuesta = await deleteMateria(id);
  if (!respuesta.error) return res.status(200).json(respuesta);
  return res.status(503).json(respuesta);
});

module.exports = materias;
