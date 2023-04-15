const { Router } = require("express");
const { getAllAulas } = require("../../Controllers/Aulas/getAllAulas");
const { getAula } = require("../../Controllers/Aulas/getAula");
const { postAula } = require("../../Controllers/Aulas/postAula");
const { deleteAula } = require("../../Controllers/Aulas/deleteAula");
const { updateAula } = require("../../Controllers/Aulas/updateAula");

const aula = Router();

aula.get("/", async (req, res) => {
  const respuesta = await getAllAulas(req.query);
  if (!respuesta.error) return res.status(200).json(respuesta);
  return res.status(500).json(respuesta);
});

aula.get("/getAula", async (req, res) => {
  const { anio } = req.query;
  const { division } = req.query;
  if (!aula) return res.status(400).json({ message: "No se ingresó un aula" });
  const respuesta = await getAula(anio, division);
  if (!respuesta.error) return res.status(200).json(respuesta);
  return res.status(503).json(respuesta);
});

// alumnos.get("/filtro", async (req, res) => {
//   const criterios = req.query;
//   if (Object.keys(criterios).length === 0)
//     return res.status(400).json({ message: "No se ingresó correctamente el filtro" });
//   const respuesta = await filterAula(criterios);
//   if (!respuesta.error) return res.status(200).json(respuesta);
//   return res.status(503).json(respuesta);
// });

aula.post("/", async (req, res) => {
  const { anio, division } = req.body;
  const respuesta = await postAula(anio, division);
  if (!respuesta.error) return res.status(200).json(respuesta);
  return res.status(503).json(respuesta);
});

aula.delete("/:id", async (req, res) => {
  console.log(req.params);
  const { id } = req.params;
  const respuesta = await deleteAula(id);
  if (!respuesta.error) return res.status(200).json(respuesta);
  return res.status(503).json(respuesta);
});

aula.put("/:currentaula", async (req, res) => {
  const { currentaula } = req.params;
  const changes = req.body;
  if (!currentaula) {
    res.status(400).json({ message: "No se envio aula a modificar" });
  }
  if (Object.keys(changes).length === 0) {
    res.status(400).json({ message: "No se ingresaron modificaciones a realizar" });
  }
  const respuesta = await updateAula(currentaula, changes);
  if (!respuesta.erro) res.status(200).json(respuesta);
  res.status(503).json(respuesta);
});

module.exports = aula;
