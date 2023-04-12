const { Router } = require("express");
const { getAllProfesores } = require("../../Controllers/Profesores/getAllProfesores");


const profesores = Router();

profesores.get("/", async(req, res) => {
    const respuesta = await getAllProfesores();
    if (!respuesta.error)
    return res.status(200).json(respuesta)
    return res.status(500).json(respuesta)
});

module.exports = profesores;