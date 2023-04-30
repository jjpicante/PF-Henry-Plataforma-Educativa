const { Router } = require("express");
const { getAllProfesores } = require("../../Controllers/Profesores/getAllProfesores");
const { postProfesor } = require("../../Controllers/Profesores/postProfesor");
const { deleteProfesor } = require("../../Controllers/Profesores/deleteProfesor");
const { getProfesor } = require("../../Controllers/Profesores/getPofesor");
const { filterProfesor } = require("../../Controllers/Profesores/filterProfesor");
const { updateProfesor } = require("../../Controllers/Profesores/updateProfesor");
const { postProfesorDeBaja } = require("../../Controllers/Profesores/postProfesorDeBaja"); 

const profesores = Router();

profesores.get("/", async (req, res) => {
  const respuesta = await getAllProfesores(req.query);
  if (!respuesta.error) return res.status(200).json(respuesta);
  return res.status(503).json(respuesta);
});

profesores.get("/getprofesor", async (req, res) => {
  const username = req.query.username.toLowerCase();
  if (!username) return res.status(400).json({ message: "No se ingreso un username" });
  const respuesta = await getProfesor(username);
  if (!respuesta.error) return res.status(200).json(respuesta);
  return res.status(503).json(respuesta);
});

profesores.get("/filterprofesor", async (req, res) => {
  const criterios = req.query;
  if (Object.keys(criterios).length === 0)
    return res.status(400).json({ message: "Faltan ingresar datos" });
  const respuesta = await filterProfesor(criterios);
  if (!respuesta.error) return res.status(200).json(respuesta);
  return res.status(503).json(respuesta);
});

profesores.post("/", async (req, res) => {
  const {
    name,
    apellido,
    email,
    datebirth,
    nacionalidad,
    username,
    password,
    anio1,
    materia1,
    anio2,
    materia2,
    anio3,
    materia3,
  } = req.body;
  const respuesta = await postProfesor(
    name,
    apellido,
    email,
    datebirth,
    nacionalidad,
    username,
    password,
    anio1,
    materia1,
    anio2,
    materia2,
    anio3,
    materia3
  );
  if (!respuesta.error) return res.status(200).json(respuesta);
  return res.status(503).json(respuesta);
});

profesores.post("/ProfesorDeBaja", async (req, res) => {
  const {
    name,
    apellido,
    email,
    datebirth,
    nacionalidad,
    username,
    password,
    // anio1,
    // materia1,
    // anio2,
    // materia2,
    // anio3,
    // materia3,
  } = req.body;
  const respuesta = await postProfesorDeBaja(
    name,
    apellido,
    email,
    datebirth,
    nacionalidad,
    username,
    password,
    // anio1,
    // materia1,
    // anio2,
    // materia2,
    // anio3,
    // materia3
  );
  if (!respuesta.error) return res.status(200).json(respuesta);
  return res.status(503).json(respuesta);
});


profesores.put("/:currentUsername", async (req, res) => {
  const { currentUsername } = req.params;
  const changes = req.body;

  if (!currentUsername)
    return res.status(400).json({ message: "No se envio Username a modificar" });

  if (Object.keys(changes).length === 0)
    return res.status(400).json({ message: "No se ingresaron modificaciones a realizar" });

  const respuesta = await updateProfesor(currentUsername, changes);
  if (!respuesta.error) return res.status(200).json(respuesta);
  return res.status(503).json(respuesta);
});

profesores.delete("/:username", async (req, res) => {
  const { username } = req.params;
  const respuesta = await deleteProfesor(username.toLowerCase());
  if (!respuesta.error) return res.status(200).json(respuesta);
  return res.status(503).json(respuesta);
});

module.exports = profesores;
