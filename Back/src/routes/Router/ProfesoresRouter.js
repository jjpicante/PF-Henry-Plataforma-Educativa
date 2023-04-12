const { Router } = require("express");
const { getAllProfesores } = require("../../Controllers/Profesores/getAllProfesores");
const {postProfesor} = require('../../Controllers/Profesores/postProfesor')


const profesores = Router();

profesores.get("/", async(req, res) => {
    const respuesta = await getAllProfesores();
    if (!respuesta.error)
    return res.status(200).json(respuesta)
    return res.status(503).json(respuesta)
});


profesores.post('/', async(req, res) => {
    const {name, apellido, nacionalidad, datebirth, email, username, password} = req.body;
    const respuesta = await postProfesor(name, apellido, nacionalidad, datebirth, email, username, password)
    if (!respuesta.error)
        return res.status(200).json(respuesta)
    return res.status(503).json(respuesta)
})

module.exports = profesores;