const { Router } = require("express");
const { getAllProfesores } = require("../../Controllers/Profesores/getAllProfesores");
const { postProfesor } = require("../../Controllers/Profesores/postProfesor");
const { deleteProfesor } = require("../../Controllers/Profesores/deleteProfesor");
const { getProfesor } = require("../../Controllers/Profesores/getPofesor");

const {
  filterProfesor,
} = require("../../Controllers/Profesores/filterProfesor");


const profesores = Router();

profesores.get("/", async (req, res) => {
  const respuesta = await getAllProfesores();
  if (!respuesta.error) return res.status(200).json(respuesta);
  return res.status(503).json(respuesta);
});

profesores.get("/getprofesor", async (req, res) => {
  const username = req.query.username.toLocaleLowerCase();
  if (!username) return res.status(400).json({ message: "No se ingresó un username" });
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
  const { name, apellido, nacionalidad, datebirth, email, username, password } = req.body;
  const respuesta = await postProfesor(
    name,
    apellido,
    nacionalidad,
    datebirth,
    email,
    username,
    password
  );
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
