const { Router } = require("express");
const { getAllAlumnos } = require("../../Controllers/Alumnos/getAllAlumnos");

const alumnos = Router();

alumnos.get("/", async(req, res) => {
    const respuesta = await getAllAlumnos();
    if (!respuesta.error)
    return res.status(200).json(respuesta)
    return res.status(500).json(respuesta)

});

module.exports = alumnos;
