const { Router } = require("express");
const alumnos = require("./Router/AlumnosRouter");
const profesores = require("./Router/ProfesoresRouter");
const admin = require("./Router/AdminRouter");
const materias = require("./Router/MateriasRouter");
const aula = require("./Router/Aulas");
const loginrouter = require("./Router/loginrouter");
const meses = require("./Router/MesesRouter");
const pasarela = require("./Router/Pasarelas");
const logoutRouter = require("./Router/logoutRouter");
const { verifyUser } = require("../Controllers/Firebase/verifyUser");
const resetRouter = require("./Router/resetRouter");

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use("/Alumnos", alumnos);
router.use("/Profesores", profesores);
router.use("/Materias", materias);
router.use("/Admin", admin);
router.use("/Login", loginrouter);
router.use("/Logout", logoutRouter);
router.use("/Aulas", aula);
router.use("/Meses", meses);
router.use("/", pasarela);
router.use("/reset", resetRouter)

module.exports = router;
