const { Router } = require("express");
const alumnos = require("./Router/AlumnosRouter");
const profesores = require("./Router/ProfesoresRouter");
const admin = require("./Router/AdminRouter");
const materias = require("./Router/MateriasRouter");
const aula = require("./Router/Aulas");
const loginrouter = require("./Router/loginrouter");
const logoutRouter = require("./Router/logoutRouter");
const { verifyUser } = require("../Controllers/Firebase/verifyUser");

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use("/Alumnos", alumnos);
router.use("/Profesores", verifyUser, profesores);
router.use("/Materias", verifyUser, materias);
router.use("/Admin", verifyUser, admin);
router.use("/Login", loginrouter);
router.use("/Logout", logoutRouter);
router.use("/Aulas", verifyUser, aula);

module.exports = router;
