const { Router } = require("express");
const { postLogin } = require("../../Controllers/loggin/postLogin");

const loginrouter = Router();


loginrouter.post("/", async (req, res) => {
  const { email, password } = req.body;

  const respuesta = await postLogin(email, password);
  if (!respuesta.error) return res.status(200).json(respuesta);
  return res.status(503).json(respuesta);
});

//ruta login con google recibe Idcliente

module.exports = loginrouter;
