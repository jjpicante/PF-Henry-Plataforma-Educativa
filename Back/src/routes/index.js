const { Router } = require("express");
const alumnos = require("./Router/AlumnosRouter");
const profesores = require("./Router/ProfesoresRouter");
const admin = require("./Router/AdminRouter");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use("/Alumnos", alumnos);
router.use("/Profesores", profesores);
router.use("/Admin", admin);

module.exports = router;
