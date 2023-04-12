const { Router } = require("express");
const { loginrouter } = require("./Router/loginrouter.js");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use("/", loginrouter);

module.exports = router;
