const { Router } = require("express");
const { getAllAlumnos } = require("../../Controllers/Alumnos/getAllAlumnos");
const { postAlumno } = require("../../Controllers/Alumnos/postAlumno");
const { deleteAlumno } = require("../../Controllers/Alumnos/deleteAlumno");
const { getAlumnos } = require("../../Controllers/Alumnos/getAlumno");

const alumnos = Router();

alumnos.get("/", async (req, res) => {
  console.log("hola");
  const respuesta = await getAllAlumnos();
  if (!respuesta.error) return res.status(200).json(respuesta);
  return res.status(500).json(respuesta);
});

alumnos.get("/getalumno", async (req, res) => {
  const username = req.query.username.toLocaleLowerCase();
  if (!username)
    return res.status(400).json({ message: "No se ingresó un username" });
  const respuesta = await getAlumnos(username);
  if (!respuesta.error) return res.status(200).json(respuesta);
  return res.status(503).json(respuesta);
});

alumnos.post("/", async (req, res) => {
  const { name, apellido, nacionalidad, datebirth, email, username, password } =
    req.body;
  const respuesta = await postAlumno(
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
alumnos.delete("/:username", async (req, res) => {
  const { username } = req.params;
  const respuesta = await deleteAlumno(username.toLowerCase());
  if (!respuesta.error) return res.status(200).json(respuesta);
  return res.status(503).json(respuesta);
});

module.exports = alumnos;
